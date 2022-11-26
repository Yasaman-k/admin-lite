import httpClient from "../../api/httpClient";

const state = {
  lexisNexisConfirmation: [],
  fileData: [],
};

const getters = {
  getLexisNexisConfirmation: (state) => state.lexisNexisConfirmation,
  getFileData: (state) => state.fileData,
};

const actions = {
  async fetchLexisNexisConfirmation({ commit }) {
    try {
      const response = await httpClient.post(
        "/api/fundability/statements",
        {
          types: ["has_lexisnexis_report"],
        },
        {
          headers: {
            authorization: this.state.auth.AuthString,
          },
        }
      );
      commit("SET_LEXISNEXIS_CONFIRMATION", response.data.result);
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
  async sendLexisNexisConfirmation({ commit }, data) {
    try {
      const response = await httpClient.put(
        "/api/fundability/statement/has_lexisnexis_report",
        data,
        {
          headers: {
            authorization: this.state.auth.AuthString,
          },
        }
      );
      commit("UPDATE_LEXISNEXIS_CONFIRMATION", response.data.result);
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
  async sendLexisNexisFile({ commit }, formData) {
    try {
      const response = await httpClient.post(
        "/api/fundability/file/lexisnexis_report",
        formData,
        {
          headers: {
            Authorization: this.state.auth.AuthString,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      commit("SET_FILE_DATA", response.data.result);
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
  async fetchLexisNexisFile({ commit }) {
    try {
      const response = await httpClient.get(
        "/api/fundability/files/lexisnexis_report/latest",
        {
          headers: {
            authorization: this.state.auth.AuthString,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      commit("SET_FILE_DATA", response.data.result);
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
  SET_LEXISNEXIS_CONFIRMATION(state, confirmation) {
    state.lexisNexisConfirmation = confirmation;
  },
  UPDATE_LEXISNEXIS_CONFIRMATION(state, confirmation) {
    state.lexisNexisConfirmation = [{ has_lexisnexis_report: confirmation }];
  },
  SET_FILE_DATA(state, fileData) {
    state.fileData = fileData;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
