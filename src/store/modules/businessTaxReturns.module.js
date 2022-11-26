import httpClient from "../../api/httpClient";

const state = {
  businessTaxReturnsFields: [],
  businessTaxReturnsConfirmations: [],
  industries: [],
};

const getters = {
  getBusinessTaxReturnsFields: (state) => state.businessTaxReturnsFields,
  getBusinessTaxReturnsConfirmations: (state) =>
    state.businessTaxReturnsConfirmations,
  getIndustries: (state) => state.industries,
};

const actions = {
  async fetchBusinessTaxReturnsFields({ commit }) {
    try {
      const requiredData = {
        types: [
          "business_tax_return_year_last_filed_at",
          "business_tax_return_filing_status",
          "business_industry",
        ],
      };
      const response = await httpClient.post(
        "/api/fundability/fields",
        requiredData,
        {
          headers: { Authorization: this.state.auth.AuthString },
        }
      );
      commit("SET_BUSINESS_TAX_RETURNS_FIELDS", response.data.result);
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
  async fetchIndustryOptions({ commit }) {
    try {
      const response = await httpClient.get("/api/fundability/options", {
        params: {
          types: ["business_industry"],
        },
        headers: { Authorization: this.state.auth.AuthString },
      });
      commit("SET_INDUSTRY_OPTIONS", response.data.result);
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
  async sendBusinessTaxReturnsFields({ commit }, newData) {
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
      commit("UPDATE_BUSINESS_TAX_RETURNS_FIELDS", response.data.result);
    } catch (error) {
      commit("SET_ERROR_MESSAGE", `${error.message}`, { root: true });
    }
  },
  async fetchBusinessTaxReturnsConfirmations({ commit }) {
    try {
      const requiredData = {
        types: [
          "has_filed_business_tax_returns_last_year",
          "has_filed_business_tax_returns_for_each_year_in_business",
        ],
      };
      const response = await httpClient.post(
        `/api/fundability/statements`,
        requiredData,
        {
          headers: { Authorization: this.state.auth.AuthString },
        }
      );
      commit("SET_BUSINESS_TAX_RETURNS_CONFIRMATIONS", response.data.result);
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
  async sendBusinessTaxReturnsConfirmations({ commit }, newData) {
    try {
      const response = await httpClient.put(
        `/api/fundability/statement/${newData.type}`,
        newData.requiredData,
        {
          headers: { Authorization: this.state.auth.AuthString },
        }
      );
      commit("UPDATE_BUSINESS_TAX_RETURNS_CONFIRMATIONS", response.data.result);
    } catch (error) {
      commit("SET_ERROR_MESSAGE", `${error.message}`, { root: true });
    }
  },
};

const mutations = {
  SET_BUSINESS_TAX_RETURNS_FIELDS(state, fields) {
    state.businessTaxReturnsFields = fields;
  },
  SET_BUSINESS_TAX_RETURNS_CONFIRMATIONS(state, confirmations) {
    state.businessTaxReturnsConfirmations = confirmations;
  },
  SET_INDUSTRY_OPTIONS(state, industries) {
    state.industries = industries;
  },
  UPDATE_BUSINESS_TAX_RETURNS_FIELDS(state, fields) {
    return (state.businessTaxReturnsFields = fields);
  },
  UPDATE_BUSINESS_TAX_RETURNS_CONFIRMATIONS(state, newConfirmation) {
    const newConfirmations = [...state.businessTaxReturnsConfirmations];
    const newConfirmationObject = {};
    const newConfirmationExist = newConfirmations.filter(
      (confirmation) => Object.keys(confirmation)[0] === newConfirmation.type
    );
    if (newConfirmations.length && newConfirmationExist.length) {
      newConfirmations.map((confirmation, i) => {
        if (Object.keys(confirmation)[0] === newConfirmation.type) {
          newConfirmationObject[newConfirmation.type] = newConfirmation;
          return (newConfirmations[i] = newConfirmationObject);
        }
      });
      return (state.businessTaxReturnsConfirmations = newConfirmations);
    } else if (newConfirmations.length && !newConfirmationExist.length) {
      newConfirmations.push(newConfirmation);
      return (state.businessTaxReturnsConfirmations = newConfirmations);
    }
    return (state.businessTaxReturnsConfirmations = newConfirmations);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
