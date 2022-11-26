import httpClient from "../../api/httpClient";

const state = {
  financialConfirmation: [],
  statementsTerms: [],
  financialProvidedTime: "",
  fileData: [],
};

const getters = {
  getFinancialStatementConfirmation: (state) => state.financialConfirmation,
  getStatementsTerms: (state) => state.statementsTerms,
  getFinancialStatementProvidedTime: (state) => state.financialProvidedTime,
  getFileData: (state) => state.fileData,
};

const actions = {
  async fetchFinancialStatementConfirmation({ commit }) {
    try {
      const requiredData = {
        types: ["has_financial_statements"],
      };
      const response = await httpClient.post(
        "/api/fundability/statements",
        requiredData,
        {
          headers: { Authorization: this.state.auth.AuthString },
        }
      );
      commit("SET_FINANCIAL_CONFIRMATION", response.data.result);
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
  async fetchFinancialStatementsTerms({ commit }) {
    try {
      const requiredData = {
        types: ["financial_statements_terms"],
      };
      const response = await httpClient.post(
        "/api/fundability/fields",
        requiredData,
        {
          headers: { Authorization: this.state.auth.AuthString },
        }
      );
      commit("SET_FINANCIAL_TERMS", response.data.result);
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
  async sendFinancialStatementProvidedTime({ commit }, data) {
    try {
      const requiredData = {
        fields: data,
      };

      await httpClient.put("/api/fundability/fields", requiredData, {
        headers: { Authorization: this.state.auth.AuthString },
      });
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
  async sendFinancialStatementConfirmation({ commit }, newData) {
    try {
      const response = await httpClient.put(
        "/api/fundability/statement/has_financial_statements",
        newData,
        {
          headers: { Authorization: this.state.auth.AuthString },
        }
      );
      commit("UPDATE_FINANCIAL_CONFIRMATION", response.data.result);
    } catch (error) {
      commit("SET_ERROR_MESSAGE", `${error.message}`, { root: true });
    }
  },
  async fetchFinancialStatementFile({ commit }) {
    try {
      const response = await httpClient.get(
        "/api/fundability/files/financial_statement/latest",
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
  async sendFinancialStatementFile({ commit }, formData) {
    try {
      const response = await httpClient.post(
        "/api/fundability/file/financial_statement",
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
};

const mutations = {
  SET_FINANCIAL_CONFIRMATION(state, confirmation) {
    state.financialConfirmation = confirmation;
  },
  SET_FINANCIAL_TERMS(state, terms) {
    state.statementsTerms = terms;
  },
  UPDATE_FINANCIAL_CONFIRMATION(state, confirmation) {
    state.financialConfirmation = [{ has_financial_statements: confirmation }];
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
