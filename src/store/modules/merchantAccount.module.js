import httpClient from "../../api/httpClient";

const state = {
  merchantAccountFields: [],
  confirmations: [],
  merchantAccountConfirmation: "",
  merchantAccount: "",
};

const getters = {
  getMerchantAccountFields: (state) => state.merchantAccountFields,
  getConfirmations: (state) => state.confirmations,
  getMerchantAccountConfirmation: (state) => state.merchantAccountConfirmation,
  getMerchantAccount: (state) => state.merchantAccount,
};

const actions = {
  async fetchMerchantAccountFields({ commit }) {
    try {
      const requiredData = {
        types: [
          "merchant_account",
          "company",
          "business_address_street",
          "business_address_line2",
          "business_address_city",
          "business_address_state",
          "business_address_zip",
        ],
      };
      const response = await httpClient.post(
        `/api/fundability/fields`,
        requiredData,
        {
          headers: { Authorization: this.state.auth.AuthString },
        }
      );
      commit("SET_MERCHANT_ACCOUNT_FIELDS", response.data.result);
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
  setMerchantAccountConfirmation({ commit }, confirmation) {
    commit("SET_MERCHANT_ACCOUNT_CONFIRMATION", confirmation);
  },
  setMerchantAccount({ commit }, account) {
    commit("SET_MERCHANT_ACCOUNT", account);
  },
  async sendMerchantAccountFields({ commit }, newData) {
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
      commit("UPDATE_MERCHANT_ACCOUNT_FIELDS", response.data.result);
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
  async fetchConfirmations({ commit }) {
    try {
      const requiredData = {
        types: [
          "has_merchant_account",
          "has_confirmed_address_matches_merchant_account",
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
  async sendConfirmation({ commit }, data) {
    try {
      const response = await httpClient.put(
        `/api/fundability/statement/${data.type}`,
        data.requiredData,
        {
          headers: { Authorization: this.state.auth.AuthString },
        }
      );
      commit("UPDATE_CONFIRMATIONS", response.data.result);
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
  SET_MERCHANT_ACCOUNT_FIELDS(state, fields) {
    state.merchantAccountFields = fields;
  },
  SET_MERCHANT_ACCOUNT_CONFIRMATION(state, confirmation) {
    state.merchantAccountConfirmation = confirmation;
  },
  SET_MERCHANT_ACCOUNT(state, account) {
    state.merchantAccount = account;
  },
  UPDATE_MERCHANT_ACCOUNT_FIELDS(state, fields) {
    const merchantAccountFields = state.merchantAccountFields;
    const newFieldsExist = fields.filter((field) => {
      for (let i = 0; i < merchantAccountFields.length; i += 1) {
        if (
          Object.keys(merchantAccountFields[i])[0] === Object.keys(field)[0]
        ) {
          return field;
        }
      }
    });
    if (merchantAccountFields.length && newFieldsExist.length) {
      fields.map((field) => {
        for (let i = 0; i < merchantAccountFields.length; i += 1) {
          if (
            Object.keys(merchantAccountFields[i])[0] === Object.keys(field)[0]
          ) {
            merchantAccountFields[i] = field;
            break;
          }
        }
      });
      return (state.merchantAccountFields = merchantAccountFields);
    } else if (merchantAccountFields.length && !newFieldsExist.length) {
      fields.map((field) => {
        merchantAccountFields.push(field);
      });
      return (state.merchantAccountFields = merchantAccountFields);
    }
    return (state.merchantAccountFields = fields);
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
