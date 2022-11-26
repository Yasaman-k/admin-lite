import httpClient from "../../api/httpClient";

const state = {
  websiteEmailFields: [],
  websiteEmailConfirmation: null,
};

const getters = {
  getWebsiteEmailFields: (state) => state.websiteEmailFields,
  getWebsiteEmailConfirmation: (state) => state.websiteEmailConfirmation,
};

const actions = {
  async fetchWebsiteEmailFields({ commit }) {
    try {
      const requiredData = {
        types: ["business_website", "business_email"],
      };
      const response = await httpClient.post(
        `/api/fundability/fields`,
        requiredData,
        {
          headers: { Authorization: this.state.auth.AuthString },
        }
      );
      commit("SET_WEBSITE_EMAIL_FIELDS", response.data.result);
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
  async sendWebsiteEmailFields({ commit }, newData) {
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
      commit("UPDATE_WEBSITE_EMAIL_FIELDS", response.data.result);
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
  async fetchWebsiteEmailConfirmation({ commit }) {
    try {
      const requiredData = {
        types: ["has_website_and_email"],
      };
      const response = await httpClient.post(
        `/api/fundability/statements`,
        requiredData,
        {
          headers: { Authorization: this.state.auth.AuthString },
        }
      );
      commit("SET_WEBSITE_EMAIL_CONFIRMATION", response.data.result);
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
  async sendWebsiteEmailConfirmation({ commit }, data) {
    try {
      const response = await httpClient.put(
        "/api/fundability/statement/has_website_and_email",
        data,
        {
          headers: { Authorization: this.state.auth.AuthString },
        }
      );
      commit("SET_WEBSITE_EMAIL_CONFIRMATION", response.data.result);
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
  SET_WEBSITE_EMAIL_FIELDS(state, fields) {
    state.websiteEmailFields = fields;
  },
  UPDATE_WEBSITE_EMAIL_FIELDS(state, fields) {
    const websiteEmailFields = state.websiteEmailFields;
    if (websiteEmailFields.length) {
      fields.map((field) => {
        for (let i = 0; i < websiteEmailFields.length; i += 1) {
          if (Object.keys(websiteEmailFields[i])[0] === Object.keys(field)[0]) {
            websiteEmailFields[i] = field;
            break;
          }
        }
      });
      return (state.websiteEmailFields = websiteEmailFields);
    }
    return (state.websiteEmailFields = fields);
  },
  SET_WEBSITE_EMAIL_CONFIRMATION(state, confirmation) {
    state.websiteEmailConfirmation = confirmation;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
