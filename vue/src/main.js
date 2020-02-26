import Vue from "vue";
import App from "./App.vue";

import router from "@/extensions/router";
import store from "@/extensions/store";
import "@/extensions/bootstrap";
import "@/extensions/overlayscrollbar";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
