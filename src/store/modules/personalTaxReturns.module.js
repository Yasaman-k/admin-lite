import httpClient from "../../api/httpClient";

const state = {
  personalTaxReturnsFields: [],
  confirmations: [],
};

const getters = {
  getPersonalTaxReturnsFields: (state) => state.personalTaxReturnsFields,
  getPersonalTaxReturnsConfirmations: (state) => state.confirmations,
};

const actions = {
  async fetchPersonalTaxReturnsFields({ commit }) {
    try {
      const requiredData = {
        types: ["personal_tax_return_year_last_filed_at"],
      };
      const response = await httpClient.post(
        "/api/fundability/fields",
        requiredData,
        {
          headers: { Authorization: this.state.auth.AuthString },
        }
      );
      commit("SET_PERSONAL_TAX_RETURNS_FIELDS", response.data.result);
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
  async sendPersonalTaxReturnsFields({ commit }, newData) {
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
      commit("SET_PERSONAL_TAX_RETURNS_FIELDS", response.data.result);
    } catch (error) {
      commit("SET_ERROR_MESSAGE", `${error.message}`, { root: true });
    }
  },
  async fetchPersonalConfirmations({ commit }) {
    try {
      const requiredData = {
        types: [
          "has_personal_tax_returns_updated",
          "has_personal_tax_returns_filed_for_extension",
          "has_no_personal_back_taxes",
        ],
      };
      const response = await httpClient.post(
        `/api/fundability/statements`,
        requiredData,
        {
          headers: { Authorization: this.state.auth.AuthString },
        }
      );
      commit("SET_CONFIRMATIONS", response.data.result);
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
  async sendPersonalConfirmations({ commit }, newData) {
    try {
      const response = await httpClient.put(
        `/api/fundability/statement/${newData.type}`,
        newData.requiredData,
        {
          headers: { Authorization: this.state.auth.AuthString },
        }
      );
      commit("UPDATE_CONFIRMATIONS", response.data.result);
    } catch (error) {
      commit("SET_ERROR_MESSAGE", `${error.message}`, { root: true });
    }
  },
};

const mutations = {
  SET_PERSONAL_TAX_RETURNS_FIELDS(state, fields) {
    state.personalTaxReturnsFields = fields;
  },
  SET_INDUSTRY_OPTIONS(state, industries) {
    state.industries = industries;
  },
  SET_CONFIRMATIONS(state, confirmations) {
    state.confirmations = confirmations;
  },
  UPDATE_CONFIRMATIONS(state, newConfirmation) {
    const newConfirmations = [...state.confirmations];
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
      return (state.confirmations = newConfirmations);
    } else if (newConfirmations.length && !newConfirmationExist.length) {
      newConfirmations.push(newConfirmation);
      return (state.confirmations = newConfirmations);
    }
    return (state.confirmations = newConfirmations);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
