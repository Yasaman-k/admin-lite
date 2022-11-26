import httpClient from "../../api/httpClient";

const state = {
  EINFields: [],
  confirmations: [],
  EINConfirmation: "",
  EIN: "",
};

const getters = {
  getEINFields: (state) => state.EINFields,
  getConfirmations: (state) => state.confirmations,
};

const actions = {
  async fetchEINFields({ commit }) {
    try {
      const requiredData = {
        types: [
          "business_ein",
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
      commit("SET_EIN_FIELDS", response.data.result);
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
  setEINConfirmation({ commit }, confirmation) {
    commit("SET_EIN_CONFIRMATION", confirmation);
  },
  setEIN({ commit }, account) {
    commit("SET_EIN", account);
  },
  async sendEINFields({ commit }, newData) {
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
      commit("UPDATE_EIN_FIELDS", response.data.result);
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
        types: ["has_ein", "has_confirmed_address_matches_irs"],
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
  SET_EIN_FIELDS(state, fields) {
    state.EINFields = fields;
  },
  SET_EIN_CONFIRMATION(state, confirmation) {
    state.EINConfirmation = confirmation;
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
  SET_EIN(state, account) {
    state.EIN = account;
  },
  UPDATE_EIN_FIELDS(state, fields) {
    const EINFields = state.EINFields;
    const newFieldsExist = fields.filter((field) => {
      for (let i = 0; i < EINFields.length; i += 1) {
        if (Object.keys(EINFields[i])[0] === Object.keys(field)[0]) {
          return field;
        }
      }
    });
    if (EINFields.length && newFieldsExist.length) {
      fields.map((field) => {
        for (let i = 0; i < EINFields.length; i += 1) {
          if (Object.keys(EINFields[i])[0] === Object.keys(field)[0]) {
            EINFields[i] = field;
            break;
          }
        }
      });
      return (state.EINFields = EINFields);
    } else if (EINFields.length && !newFieldsExist.length) {
      fields.map((field) => {
        EINFields.push(field);
      });
      return (state.EINFields = EINFields);
    }
    return (state.EINFields = fields);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
