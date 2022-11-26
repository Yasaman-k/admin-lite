import httpClient from "../../api/httpClient";

const state = {
  foreignFilingFields: [],
  foreignFilingConfirmation: null,
};

const getters = {
  getForeignFilingFields: (state) => state.foreignFilingFields,
  getForeignFilingConfirmation: (state) => state.foreignFilingConfirmation,
};

const actions = {
  async fetchForeignFilingFields({ commit }) {
    try {
      const requiredData = {
        types: [
          "business_address_state",
          "business_state_incorporated",
          "business_created_at",
        ],
      };
      const response = await httpClient.post(
        `/api/fundability/fields`,
        requiredData,
        {
          headers: { Authorization: this.state.auth.AuthString },
        }
      );
      commit("SET_FOREIGN_FILING_FIELDS", response.data.result);
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
  async sendForeignFilingFields({ commit }, newData) {
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
      commit("UPDATE_FOREIGN_FILING_FIELDS", response.data.result);
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
  async fetchConfirmation({ commit }) {
    try {
      const requiredData = {
        types: ["has_foreign_filed"],
      };
      const response = await httpClient.post(
        `/api/fundability/statements`,
        requiredData,
        {
          headers: { Authorization: this.state.auth.AuthString },
        }
      );
      commit("SET_FOREIGN_FILING_CONFIRMATION", response.data.result);
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
      commit("SET_FOREIGN_FILING_CONFIRMATION", response.data.result);
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
  SET_FOREIGN_FILING_FIELDS(state, fields) {
    state.foreignFilingFields = fields;
  },
  SET_FOREIGN_FILING_CONFIRMATION(state, confirmation) {
    state.foreignFilingConfirmation = confirmation;
  },
  UPDATE_FOREIGN_FILING_FIELDS(state, fields) {
    const foreignFilingFields = state.foreignFilingFields;
    const newFieldsExist = fields.filter((field) => {
      for (let i = 0; i < foreignFilingFields.length; i += 1) {
        if (Object.keys(foreignFilingFields[i])[0] === Object.keys(field)[0]) {
          return field;
        }
      }
    });
    if (foreignFilingFields.length && newFieldsExist.length) {
      fields.map((field) => {
        for (let i = 0; i < foreignFilingFields.length; i += 1) {
          if (
            Object.keys(foreignFilingFields[i])[0] === Object.keys(field)[0]
          ) {
            foreignFilingFields[i] = field;
            break;
          }
        }
      });
      return (state.foreignFilingFields = foreignFilingFields);
    } else if (foreignFilingFields.length && !newFieldsExist.length) {
      fields.map((field) => {
        foreignFilingFields.push(field);
      });
      return (state.foreignFilingFields = foreignFilingFields);
    }
    return (state.foreignFilingFields = fields);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
