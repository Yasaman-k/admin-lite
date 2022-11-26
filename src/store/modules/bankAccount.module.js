import httpClient from "../../api/httpClient";

const state = {
  bankAccountFields: [],
  confirmations: [],
  bankAccountConfirmation: "",
  businessBankAccount: "",
};

const getters = {
  getBankAccountFields: (state) => state.bankAccountFields,
  getConfirmations: (state) => state.confirmations,
  getBusinessBankAccount: (state) => state.businessBankAccount,
};

const actions = {
  async fetchBankAccountFields({ commit }) {
    try {
      const requiredData = {
        types: [
          "business_bank_account",
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
      commit("SET_BANK_ACCOUNT_FIELDS", response.data.result);
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
  setBankAccountConfirmation({ commit }, confirmation) {
    commit("SET_BANK_ACCOUNT_CONFIRMATION", confirmation);
  },
  setBusinessBankAccount({ commit }, account) {
    commit("SET_BUSINESS_BANK_ACCOUNT", account);
  },
  async sendBankAccountFields({ commit }, newData) {
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
      commit("UPDATE_BANK_ACCOUNT_FIELDS", response.data.result);
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
          "has_bank_account",
          "has_confirmed_address_matches_bank_account",
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
  SET_BANK_ACCOUNT_FIELDS(state, fields) {
    state.bankAccountFields = fields;
  },
  SET_BANK_ACCOUNT_CONFIRMATION(state, confirmation) {
    state.bankAccountConfirmation = confirmation;
  },
  SET_BUSINESS_BANK_ACCOUNT(state, account) {
    state.businessBankAccount = account;
  },
  UPDATE_BANK_ACCOUNT_FIELDS(state, fields) {
    const bankAccountFields = state.bankAccountFields;
    if (bankAccountFields.length) {
      fields.map((field) => {
        for (let i = 0; i < bankAccountFields.length; i += 1) {
          if (Object.keys(bankAccountFields[i])[0] === Object.keys(field)[0]) {
            bankAccountFields[i] = field;
            break;
          }
        }
      });
      return (state.bankAccountFields = bankAccountFields);
    }
    return (state.bankAccountFields = fields);
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
