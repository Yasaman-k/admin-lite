import httpClient from "../../api/httpClient";

const state = {
  derogatoryRemarks: [],
  derogatoryConfirmation: null,
};

const getters = {
  getDerogatoryRemarks: (state) => state.derogatoryRemarks,
  getDerogatoryConfirmation: (state) => state.derogatoryConfirmation,
};

const actions = {
  async fetchDerogatoryRemarks({ commit }) {
    try {
      const requiredData = {
        types: ["derogatory_remarks", "derogatory_happened_at"], //,"bankruptcyDate"
      };

      const response = await httpClient.post(
        `/api/fundability/fields`,
        requiredData,
        {
          headers: { Authorization: this.state.auth.AuthString },
        }
      );
      commit("SET_DEROGATORY_REMARKS", response.data.result);
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
  async sendDerogatoryRemarks({ commit }, newData) {
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
      commit("UPDATE_DEROGATORY_REMARKS", response.data.result);
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
  async fetchDerogatoryConfirmation({ commit }) {
    try {
      const requiredData = {
        types: ["has_derogatory_remarks"],
      };
      const response = await httpClient.post(
        `/api/fundability/statements`,
        requiredData,
        {
          headers: { Authorization: this.state.auth.AuthString },
        }
      );
      commit("SET_DEROGATORY_CONFIRMATION", response.data.result);
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
  async sendDerogatoryConfirmation({ commit }, data) {
    try {
      const response = await httpClient.put(
        "/api/fundability/statement/has_derogatory_remarks",
        data,
        {
          headers: { Authorization: this.state.auth.AuthString },
        }
      );
      commit("SET_DEROGATORY_CONFIRMATION", response.data.result);
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
  SET_DEROGATORY_REMARKS(state, fields) {
    state.derogatoryRemarks = fields;
  },
  UPDATE_DEROGATORY_REMARKS(state, fields) {
    const remarkFields = state.derogatoryRemarks;
    if (remarkFields.length) {
      fields.map((field) => {
        for (let i = 0; i < remarkFields.length; i += 1) {
          if (Object.keys(remarkFields[i])[0] === Object.keys(field)[0]) {
            remarkFields[i] = field;
            break;
          }
        }
      });
      return (state.derogatoryRemarks = remarkFields);
    }
    return (state.derogatoryRemarks = fields);
  },
  SET_DEROGATORY_CONFIRMATION(state, confirmation) {
    state.derogatoryConfirmation = confirmation;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
