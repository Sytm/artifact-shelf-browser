import Vue from "vue";
import VueRouter from "vue-router";

import Overview from "@/views/Overview.vue";
import Artifact from "@/views/Artifact.vue";
import ArtifactVersion from "@/views/ArtifactVersion.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "overview",
    component: Overview
  },
  {
    path: "/:artifactId",
    name: "artifact",
    component: Artifact,
    children: [
      {
        path: ":version",
        name: "version",
        component: ArtifactVersion
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
