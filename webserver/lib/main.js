'use strict';

const express = require( 'express' );
const path = require('path');
const fs = require('fs');
const helmet = require('helmet');
const minio = require('minio');
const rcompare = require('semver/functions/rcompare');

let dist = path.join(__dirname, '..', '..', 'vue', 'dist');

function run() {
    let minioClient = new minio.Client( {
        endPoint: process.env.S3_ENDPOINT,
        port: Number.parseInt(process.env.S3_PORT),
        useSSL: process.env.S3_USESSL === 'true',
        accessKey: process.env.S3_ACCESSKEY,
        secretKey: process.env.S3_SECRETKEY
    } );

    const app = express();

    app.use(helmet());

    const indexCache = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

    const cache = {
        nextUpdate: -1,
        cache: []
    };

    app.get( '/api/artifacts', ( req, res ) => {
        let now = new Date().getTime();
        if (cache.nextUpdate <= now) {
            cache.nextUpdate = now + 1000 * 60 * 5;
            parseArtifacts(minioClient).then(artifacts => {
                cache = artifacts;
            }).then(() => {
                res.status(200).json(cache.cache);
            });
        } else {
            res.status(200).json(cache.cache);
        }
    } );

    app.use(express.static(dist, {
        fallthrough: true
    }));

    app.use((req, res) => {
        res.status(200).contentType('text/html').send(indexCache);
    })

    app.listen( 8080 );
}

function listObjectsV2( client, bucketName, prefix, startAfter ) {
    return new Promise( ( resolve, reject ) => {
        let stream = client.listObjectsV2( bucketName, prefix, true, startAfter );
        let output = [];
        stream.on( 'data', data => output.push( data ) );
        stream.on( 'error', reject );
        stream.on( 'end', () => resolve( output ) );
    } );
}

function streamToString(stream) {
    return new Promise((resolve, reject) => {
        let chunks = [];
        stream.on('data', chunk => chunks.push(chunk));
        stream.on('error', reject);
        stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    });
}

function parseArtifacts(client) {
    return listObjectsV2( client, 'artifacts', '', 'meta/' ).then( data => {
        let artifacts = [];
        return Promise.all(data.filter(el => (el.name.split('/').length - 1) === 1).map(artifact => {
            return client.getObject('artifacts', artifact.name).then(streamToString).then(content => {
                let artifact = JSON.parse(content);
                artifacts.push(artifact);
                return artifact;
            }).then(artifact => {
                artifact.versions = [];
                return Promise.all(data.filter(el => el.name.startsWith(`meta/${artifact.id}/`)).map(version => {
                    return client.getObject('artifacts', version.name).then(streamToString).then(content => {
                        artifact.versions.push(JSON.parse(content));
                    });
                })).then(() => {
                    artifact.versions.sort(rcompare);
                });
            });
        })).then(() => {
            return artifacts;
        });
    } );
}

module.exports.run = run;