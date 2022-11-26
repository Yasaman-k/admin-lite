import httpClient from "../../api/httpClient";

const state = {
  businessIndustries: [],
  businessIndustry: null,
};

const getters = {
  getBusinessIndustries: (state) => state.businessIndustries,
  getBusinessIndustry: (state) => state.businessIndustry,
};

const actions = {
  async fetchBusinessIndustries({ commit }) {
    try {
      const response = await httpClient.get("/api/fundability/industries", {
        headers: {
          authorization: this.state.auth.AuthString,
        },
      });
      commit("SET_BUSINESS_INDUSTRIES", response.data.result);
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
  async fetchBusinessIndustry({ commit }) {
    try {
      const response = await httpClient.get(
        "/api/fundability/business_industry",
        {
          headers: {
            authorization: this.state.auth.AuthString,
          },
        }
      );
      commit("SET_BUSINESS_INDUSTRY", response.data.result);
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
  async sendBusinessIndustry({ commit }, id) {
    try {
      const response = await httpClient.put(
        `/api/fundability/business_industry/${id}`,
        {},
        {
          headers: {
            authorization: this.state.auth.AuthString,
          },
        }
      );
      commit("SET_BUSINESS_INDUSTRY", response.data.result);
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
  SET_BUSINESS_INDUSTRIES(state, fields) {
    state.businessIndustries = fields;
  },
  SET_BUSINESS_INDUSTRY(state, industry) {
    state.businessIndustry = industry;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
