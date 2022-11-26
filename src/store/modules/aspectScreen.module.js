import httpClient from "../../api/httpClient";

const state = {
  pageContent: [],
};

const getters = {
  getPageContent: (state) => state.pageContent,
};

const actions = {
  async fetchAspectScreen({ commit }, newData, pageType) {
    try {

      let requiredData, keyword

      if (pageType === "page") {
        requiredData = { page: newData }
        keyword = "page"
      } else {
        requiredData = { pages: newData }
        keyword = "pages"
      }

      const response = await httpClient.post(
        `/api/fundability/${keyword}`,
        requiredData,
        {
          headers: { Authorization: this.state.auth.AuthString },
        }
      );
      commit("SET_ASPECT_SCREEN", response.data.result);
    } catch (error) {
      if (
        error.response &&
        (error.response.data.message === "Token has expired" ||
          error.response.status === 401)
      ) {
        commit(
          "auth/SET_AUTH_TOKEN",
          {
            loggedIn: false,
            AuthString: "",
            tokenExpired: true,
          },
          { root: true }
        );
      } else {
        commit("SET_ERROR_MESSAGE", `${error.message}`, { root: true });
      }
    }
  },

};

const mutations = {
  SET_ASPECT_SCREEN(state, fields) {
    state.pageContent = fields;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
