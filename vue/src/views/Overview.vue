<template>
  <div>
    <b-container>
      <div v-if="empty" class="py-5 text-center">
        <h1 class="text-mute">There are no artifacts available yet</h1>
      </div>
      <div v-else>
        <h1 class="text-center">Available Artifacts</h1>
        <b-row>
          <ArtifactInfo
            v-for="artifact in artifacts"
            :key="artifact.id"
            :artifactId="artifact.id"
          ></ArtifactInfo>
        </b-row>
      </div>
    </b-container>
  </div>
</template>

<script>
import ArtifactInfo from "@/components/ArtifactInfo.vue";

export default {
  name: "overview",
  computed: {
    empty() {
      return this.$store.state.artifacts.length === 0;
    },
    artifacts() {
      return this.$store.state.artifacts;
    }
  },
  components: {
    ArtifactInfo
  }
};
</script>

<style lang="scss" scoped>
h1 {
  margin-top: 20px;
}
</style>
