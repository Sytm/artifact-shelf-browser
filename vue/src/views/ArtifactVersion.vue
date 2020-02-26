<template>
  <div>
    <div class="artifact-version">
      <p>
        <b-link :href="commitUrl">Commit: {{ versionData.commit }}</b-link
        ><br />
      </p>
      <h6>Downloads:</h6>
      <b-list-group>
        <b-list-group-item
          v-for="file in versionData.files"
          :key="file.hash"
          :href="file.download"
          :title="file.originalPath"
          download
          class="d-flex justify-content-between align-items-center"
        >
          {{ file.name }}
          <b-badge variant="success" pill>Size: {{ file.size }}</b-badge>
        </b-list-group-item>
      </b-list-group>
    </div>
  </div>
</template>

<script>
export default {
  name: "artifact-version",
  computed: {
    artifactId() {
      return this.$route.params.artifactId;
    },
    version() {
      return this.$route.params.version;
    },
    artifactData() {
      return this.$store.getters.getArtifact(this.artifactId);
    },
    versionData() {
      return this.$store.getters.getVersion(this.artifactId, this.version);
    },
    commitUrl() {
      if (this.artifactData.git === undefined) {
        return "#";
      } else {
        return `${this.artifactData.git.base}/commit/${this.versionData.commit}`;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.artifact-version {
  margin-top: 20px;
}
</style>
