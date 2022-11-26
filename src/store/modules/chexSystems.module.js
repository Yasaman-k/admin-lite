import httpClient from "../../api/httpClient";

const state = {
  chexConfirmation: [],
  fileData: [],
};

const getters = {
  getChexConfirmation: (state) => state.chexConfirmation,
  getFileData: (state) => state.fileData,
};

const actions = {
  async fetchChexConfirmation({ commit }) {
    try {
      const response = await httpClient.post(
        "/api/fundability/statements",
        {
          types: ["has_chex_report"],
        },
        {
          headers: {
            authorization: this.state.auth.AuthString,
          },
        }
      );
      commit("SET_CHEX_CONFIRMATION", response.data.result);
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
  async sendChexConfirmation({ commit }, data) {
    try {
      const response = await httpClient.put(
        "/api/fundability/statement/has_chex_report",
        data,
        {
          headers: {
            authorization: this.state.auth.AuthString,
          },
        }
      );
      commit("UPDATE_CHEX_CONFIRMATION", response.data.result);
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
  async sendChexFile({ commit }, formData) {
    try {
      const response = await httpClient.post(
        "/api/fundability/file/chex_report",
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
  async fetchChexFile({ commit }) {
    try {
      const response = await httpClient.get(
        "/api/fundability/files/chex_report/latest",
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
  SET_CHEX_CONFIRMATION(state, confirmation) {
    state.chexConfirmation = confirmation;
  },
  UPDATE_CHEX_CONFIRMATION(state, confirmation) {
    state.chexConfirmation = [{ has_chex_report: confirmation }];
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
