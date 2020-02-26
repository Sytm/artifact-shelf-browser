<template>
  <div>
    <b-container v-if="artifactExists">
      <h1 class="text-center artifact-name">{{ artifactData.name }}</h1>
      <div class="artifact-about">
        <a
          v-if="artifactData.git !== undefined"
          :href="gitRepoUrl"
          class="artifact-git"
        >
          <img
            src="https://git-scm.com/images/logos/downloads/Git-Logo-2Color.png"
            alt="Git logo"
          />
        </a>
        <p v-if="artifactData.description !== undefined">
          {{ artifactData.description }}
        </p>
      </div>
      <h5>Versions:</h5>
      <overlay-scrollbars :options="scrollbarOptions">
        <b-nav tabs class="version-tabs">
          <b-nav-item
            v-for="version in artifactData.versions"
            :key="version.version"
            :active="version.version === selectedVersion"
            :to="versionLink(version)"
            >{{ version.version }}</b-nav-item
          >
        </b-nav>
      </overlay-scrollbars>
      <router-view />
    </b-container>
    <b-container v-else>
      <div class="py-5 text-center">
        <h1 class="text-center">404 - This page could not be found!</h1>
      </div>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "artifact",
  data() {
    return {
      scrollbarOptions: {
        scrollbars: {
          autoHide: "leave"
        },
        overflowBehavior: {
          y: "hidden",
          x: "scroll"
        }
      }
    };
  },
  computed: {
    artifactId() {
      return this.$route.params.artifactId;
    },
    artifactExists() {
      return this.$store.getters.artifactExists(this.artifactId);
    },
    artifactData() {
      return this.$store.getters.getArtifact(this.artifactId) || {};
    },
    selectedVersion() {
      return this.$route.params.version;
    },
    gitRepoUrl() {
      return this.artifactData.git === undefined
        ? "#"
        : this.artifactData.git.base;
    }
  },
  methods: {
    versionLink(version) {
      return `/${this.artifactId}/${version.version}`;
    }
  }
};
</script>

<style lang="scss" scoped>
.version-tabs {
  flex-wrap: nowrap;
  min-width: 100%;
  width: max-content;
  overflow: visible;
}
.artifact-name {
  margin-top: 20px;
  margin-bottom: 15px;
}
.artifact-about {
  .artifact-git {
    img {
      max-height: 40px;
    }
  }
}
</style>
