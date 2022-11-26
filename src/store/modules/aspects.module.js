import httpClient from "../../api/httpClient";

const state = {
  foundationStatuses: [],
  financialsStatuses: [],
  businessCreditReportStatuses: [],
  personalStatuses: [],
  applicationProcessStatuses: [],
};

const getters = {
  getFoundationStatuses: (state) => state.foundationStatuses,
  getFinancialsStatuses: (state) => state.financialsStatuses,
  getBusinessCreditReportStatuses: (state) =>
    state.businessCreditReportStatuses,
  getPersonalStatuses: (state) => state.personalStatuses,
  getApplicationProcessStatuses: (state) => state.applicationProcessStatuses,
};

const actions = {
  async fetchNodesStatuses({ commit }) {
    try {
      const foundationNodes = [
        "business_address",
        "business_entity",
        "foreign_filing",
        "ownership",
        "ein",
        "business_phone",
        "website_and_email",
        "merchant_account",
        "business_industry",
      ];
      const financialsNodes = [
        "bank_account",
        "business_tax_returns",
        "business_account_statements",
        "business_account_balance",
        "financial_statement",
        "business_collateral",
        "personal_tax_returns",
        "business_gross_revenue",
        "employees",
      ];
      const businessReportNodes = [
        "business_information",
        "business_data_agencies",
        "identification_number",
        "business_credit_history",
        "business_credit_bureaus",
      ];
      const personalNodes = [
        "credit_score",
        "credit_report",
        "lexisnexis_report",
        "chex_report",
        "derogatory_remarks"
      ];
      const applicationProcessNodes = ["application_submission"];
      const requiredData = {
        aspects: [
          ...foundationNodes,
          ...financialsNodes,
          ...businessReportNodes,
          ...personalNodes,
          ...applicationProcessNodes,
        ],
      };
      const response = await httpClient.post(
        "/api/fundability/aspects",
        requiredData,
        {
          headers: { Authorization: this.state.auth.AuthString },
        }
      );
      const nodesStatuses = response.data.result;
      const foundationStatuses = nodesStatuses.filter((status) => {
        if (foundationNodes.includes(Object.keys(status)[0])) return status;
      });
      const financialsStatuses = nodesStatuses.filter((status) => {
        if (financialsNodes.includes(Object.keys(status)[0])) return status;
      });
      const businessReportStatuses = nodesStatuses.filter((status) => {
        if (businessReportNodes.includes(Object.keys(status)[0])) return status;
      });
      const personalStatuses = nodesStatuses.filter((status) => {
        if (personalNodes.includes(Object.keys(status)[0])) return status;
      });
      const applicationProcessStatuses = nodesStatuses.filter((status) => {
        if (applicationProcessNodes.includes(Object.keys(status)[0]))
          return status;
      });
      commit("SET_FOUNDATION_STATUSES", foundationStatuses);
      commit("SET_FINANCIALS_STATUSES", financialsStatuses);
      commit("SET_BUSINESS_REPORT_STATUSES", businessReportStatuses);
      commit("SET_PERSONAL_STATUSES", personalStatuses);
      commit("SET_APPLICATION_PROCESS_STATUSES", applicationProcessStatuses);
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
  async fetchFoundationStatuses({ commit, state }, aspects) {
    try {
      const requiredData = {
        aspects,
      };
      const response = await httpClient.post(
        "/api/fundability/aspects",
        requiredData,
        {
          headers: { Authorization: this.state.auth.AuthString },
        }
      );
      const nodesStatuses = response.data.result;
      const newStatuses = state.foundationStatuses;
      nodesStatuses.filter((status) => {
        for (let i = 0; i < newStatuses.length; i++) {
          if (Object.keys(newStatuses[i])[0] === Object.keys(status)[0]) {
            newStatuses[i] = status;
            break;
          }
        }
      });
      commit("SET_FOUNDATION_STATUSES", newStatuses);
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
  async fetchPersonalStatuses({ commit, state }, aspects) {
    try {
      const requiredData = {
        aspects,
      };
      const response = await httpClient.post(
        "/api/fundability/aspects",
        requiredData,
        {
          headers: { Authorization: this.state.auth.AuthString },
        }
      );
      const nodesStatuses = response.data.result;
      const newStatuses = state.personalStatuses;
      nodesStatuses.filter((status) => {
        for (let i = 0; i < newStatuses.length; i++) {
          if (Object.keys(newStatuses[i])[0] === Object.keys(status)[0]) {
            newStatuses[i] = status;
            break;
          }
        }
      });
      commit("SET_PERSONAL_STATUSES", newStatuses);
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
  async fetchFinancialsStatuses({ commit, state }, aspects) {
    try {
      const requiredData = {
        aspects,
      };
      const response = await httpClient.post(
        "/api/fundability/aspects",
        requiredData,
        {
          headers: { Authorization: this.state.auth.AuthString },
        }
      );
      const nodesStatuses = response.data.result;
      const newStatuses = state.financialsStatuses;
      nodesStatuses.filter((status) => {
        for (let i = 0; i < newStatuses.length; i++) {
          if (Object.keys(newStatuses[i])[0] === Object.keys(status)[0]) {
            newStatuses[i] = status;
            break;
          }
        }
      });
      commit("SET_FINANCIALS_STATUSES", newStatuses);
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
  SET_FOUNDATION_STATUSES(state, foundationStatuses) {
    state.foundationStatuses = foundationStatuses;
  },
  SET_FINANCIALS_STATUSES(state, financialsStatuses) {
    state.financialsStatuses = financialsStatuses;
  },
  SET_BUSINESS_REPORT_STATUSES(state, businessCreditReportStatuses) {
    state.businessCreditReportStatuses = businessCreditReportStatuses;
  },
  SET_PERSONAL_STATUSES(state, personalStatuses) {
    state.personalStatuses = personalStatuses;
  },
  SET_APPLICATION_PROCESS_STATUSES(state, applicationProcessStatuses) {
    state.applicationProcessStatuses = applicationProcessStatuses;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
