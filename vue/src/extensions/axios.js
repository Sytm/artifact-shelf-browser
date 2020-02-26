import Vue from "vue";

import axios from "axios";
import VueAxios from "vue-axios";

axios.defaults.validateStatus = status => {
  return status >= 200 && status < 500;
};

Vue.use(VueAxios, axios);
