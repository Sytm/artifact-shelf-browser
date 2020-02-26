import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

let store = new Vuex.Store({
  state: {
    loading: false,
    artifacts: []
  },
  getters: {
    artifactExists: state => id => {
      return state.artifacts.findIndex(artifact => artifact.id === id) > 0;
    },
    getArtifact: state => id => {
      return state.artifacts.find(artifact => artifact.id === id);
    },
    getVersion: (state, getters) => (id, version) => {
      let artifact = getters.getArtifact(id);
      if (artifact === undefined) {
        return {};
      } else {
        return artifact.versions.find(ver => ver.version == version);
      }
    }
  },
  mutations: {
    updateArtifacts(state, payload) {
      state.artifacts = payload;
    },
    updateLoading(state, loading) {
      state.loading = loading;
    }
  },
  actions: {
    loadData(context) {
      let url =
        process.env.NODE_ENV === "production"
          ? "/api/artifacts"
          : "http://localhost:8080/api/artifacts";
      axios.get(url).then(res => {
        context.commit("updateArtifacts", res.data);
      });
    }
  }
});

export default store;
