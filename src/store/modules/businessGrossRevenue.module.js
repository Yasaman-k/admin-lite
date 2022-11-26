import httpClient from "../../api/httpClient";

const state = {
  BusinessGrossRevenueFields: [],
  grossRevenueConfirmations: [],
};

const getters = {
  getBusinessGrossRevenueFields: (state) => state.BusinessGrossRevenueFields,
  getGrossRevenueConfirmations: (state) => state.grossRevenueConfirmations,
};

const actions = {
  async fetchBusinessGrossRevenueFields({ commit }) {
    try {
      const requiredData = {
        types: ["monthly_gross_revenue"],
      };
      const response = await httpClient.post(
        "/api/fundability/fields",
        requiredData,
        {
          headers: { Authorization: this.state.auth.AuthString },
        }
      );
      commit("SET_BUSINESS_GROSS_REVENUE_FIELDS", response.data.result);
    } catch (error) {
      if (
        error.response.data.message === "Token has expired" ||
        error.response.status === 401
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
  async sendBusinessGrossRevenueFields({ commit }, newData) {
    try {
      const requiredData = {
        fields: newData,
      };
      const response = await httpClient.put(
        "/api/fundability/fields",
        requiredData,
        {
          headers: { Authorization: this.state.auth.AuthString },
        }
      );
      commit("SET_BUSINESS_GROSS_REVENUE_FIELDS", response.data.result);
    } catch (error) {
      commit("SET_ERROR_MESSAGE", `${error.message}`, { root: true });
    }
  },
  async fetchConfirmations({ commit }) {
    try {
      const requiredData = {
        types: ["has_business_revenue"],
      };
      const response = await httpClient.post(
        "/api/fundability/statements",
        requiredData,
        {
          headers: { Authorization: this.state.auth.AuthString },
        }
      );
      commit("SET_CONFIRMATION", response.data.result);
    } catch (error) {
      if (
        error.response.data.message === "Token has expired" ||
        error.response.status === 401
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
  async sendConfirmation({ commit }, newData) {
    try {
      const response = await httpClient.put(
        "/api/fundability/statement/has_business_revenue",
        newData,
        {
          headers: { Authorization: this.state.auth.AuthString },
        }
      );
      commit("UPDATE_CONFIRMATION", response.data.result);
    } catch (error) {
      commit("SET_ERROR_MESSAGE", `${error.message}`, { root: true });
    }
  },
};

const mutations = {
  SET_CONFIRMATION(state, confirmation) {
    state.grossRevenueConfirmations = confirmation;
  },
  UPDATE_CONFIRMATION(state, confirmation) {
    state.grossRevenueConfirmations = [{ has_business_revenue: confirmation }];
  },
  SET_BUSINESS_GROSS_REVENUE_FIELDS(state, fields) {
    state.BusinessGrossRevenueFields = fields;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
