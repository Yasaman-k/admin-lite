import httpClient from "../../api/httpClient";

const state = {
  creditReportConfirmation: [],
  fileData: [],
};

const getters = {
  getCreditReportConfirmation: (state) => state.creditReportConfirmation,
  getFileData: (state) => state.fileData,
};

const actions = {
  async fetchCreditReportConfirmation({ commit }) {
    try {
      const response = await httpClient.post(
        "/api/fundability/statements",
        {
          types: ["has_personal_credit_report"],
        },
        {
          headers: {
            authorization: this.state.auth.AuthString,
          },
        }
      );
      commit("SET_CREDIT_CONFIRMATION", response.data.result);
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
  async sendCreditReportConfirmation({ commit }, data) {
    try {
      const response = await httpClient.put(
        "/api/fundability/statement/has_personal_credit_report",
        data,
        {
          headers: {
            authorization: this.state.auth.AuthString,
          },
        }
      );
      commit("UPDATE_CREDIT_CONFIRMATION", response.data.result);
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
  async sendCreditReportFile({ commit }, formData) {
    try {
      const response = await httpClient.post(
        "/api/fundability/file/credit_report",
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
  async fetchCreditReportFile({ commit }) {
    try {
      const response = await httpClient.get(
        "/api/fundability/files/credit_report/latest",
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
  SET_CREDIT_CONFIRMATION(state, confirmation) {
    state.creditReportConfirmation = confirmation;
  },
  UPDATE_CREDIT_CONFIRMATION(state, confirmation) {
    state.creditReportConfirmation = [
      { has_personal_credit_report: confirmation },
    ];
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
