<template>
  <b-col
    cols="12"
    sm="12"
    md="6"
    lg="6"
    xl="4"
    class="artifact-card"
    @click="click"
  >
    <b-card header-tag="header" footer-tag="footer">
      <template v-slot:header>
        <h5 class="mb-0">{{ artifactInfo.name }}</h5>
      </template>

      <b-card-text>
        Latest version:
        <b-link :to="latestVersionLink" @click.stop>{{ latestVersion }}</b-link>
      </b-card-text>
    </b-card>
  </b-col>
</template>

<script>
export default {
  name: "artifact-info",
  props: {
    artifactId: String
  },
  computed: {
    artifactInfo() {
      return this.$store.getters.getArtifact(this.artifactId);
    },
    latestVersion() {
      return this.artifactInfo.versions[0].version;
    },
    latestVersionLink() {
      return `/${this.artifactId}/${this.latestVersion}`;
    }
  },
  methods: {
    click() {
      this.$router.push(`/${this.artifactId}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.artifact-card {
  margin-bottom: 20px;
  cursor: pointer;
}
</style>
