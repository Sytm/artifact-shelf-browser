<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  created() {
    this.$store.dispatch("loadData");
  },
  components: {
    Navbar
  }
};
</script>

<style lang="scss"></style>
