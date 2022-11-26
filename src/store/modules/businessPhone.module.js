import httpClient from "../../api/httpClient";

const state = {
  businessPhoneFields: [],
  businessPhoneConfirmation: null,
};

const getters = {
  getBusinessPhoneFields: (state) => state.businessPhoneFields,
  getBusinessPhoneConfirmation: (state) => state.businessPhoneConfirmation,
};

const actions = {
  async fetchBusinessPhoneFields({ commit }) {
    try {
      const response = await httpClient.post(
        "/api/fundability/fields",
        {
          types: ["business_phone", "business_phone_provider"],
        },
        {
          headers: {
            authorization: this.state.auth.AuthString,
          },
        }
      );
      commit("SET_BUSINESS_PHONE_FIELDS", response.data.result);
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
  async sendBusinessPhoneFields({ commit }, data) {
    try {
      const requiredData = {
        fields: data,
      };

      const response = await httpClient.put(
        "/api/fundability/fields",
        requiredData,
        {
          headers: {
            authorization: this.state.auth.AuthString,
          },
        }
      );
      commit("UPDATE_BUSINESS_PHONE_FIELDS", response.data.result);
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
  async fetchBusinessPhoneConfirmation({ commit }) {
    try {
      const requiredData = {
        types: ["has_business_phone"],
      };
      const response = await httpClient.post(
        `/api/fundability/statements`,
        requiredData,
        {
          headers: { Authorization: this.state.auth.AuthString },
        }
      );
      commit("SET_BUSINESS_PHONE_CONFIRMATION", response.data.result);
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
  async sendBusinessPhoneConfirmation({ commit }, data) {
    try {
      const response = await httpClient.put(
        "/api/fundability/statement/has_business_phone",
        data,
        {
          headers: { Authorization: this.state.auth.AuthString },
        }
      );
      commit("SET_BUSINESS_PHONE_CONFIRMATION", response.data.result);
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
  SET_BUSINESS_PHONE_FIELDS(state, fields) {
    state.businessPhoneFields = fields;
  },
  UPDATE_BUSINESS_PHONE_FIELDS(state, fields) {
    const businessPhoneFields = state.businessPhoneFields;
    if (businessPhoneFields.length) {
      fields.map((field) => {
        for (let i = 0; i < businessPhoneFields.length; i += 1) {
          if (
            Object.keys(businessPhoneFields[i])[0] === Object.keys(field)[0]
          ) {
            businessPhoneFields[i] = field;
            break;
          }
        }
      });
      return (state.businessPhoneFields = businessPhoneFields);
    }
    return (state.businessPhoneFields = fields);
  },
  SET_BUSINESS_PHONE_CONFIRMATION(state, confirmation) {
    state.businessPhoneConfirmation = confirmation;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
