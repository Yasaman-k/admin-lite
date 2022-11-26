import httpClient from "../../api/httpClient";

const state = {
  fundingCategories: [],
  vendors: [],
  totalVendorsCount: 0,
  fundingAccounts: [],
};

const getters = {
  getFundingCategories: (state) => state.fundingCategories,
  getVendors: (state) => state.vendors,
  getTotalVendorsCount: (state) => state.totalVendorsCount,
  getFundingAccounts: (state) => state.fundingAccounts,
};

const actions = {
  async fetchFundingCategories({ commit }) {
    try {
      const response = await httpClient.get(
        "/api/fundability/funding_categories",
        {
          headers: { Authorization: this.state.auth.AuthString },
        }
      );
      commit("SET_FUNDING_CATEGORIES", response.data.result);
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
  async fetchFundingProviders({ commit }, categorySlug) {
    try {
      const response = await httpClient.get(
        `/api/fundability/funding_providers/${categorySlug}`,
        {
          headers: { Authorization: this.state.auth.AuthString },
        }
      );
      commit("SET_FUNDING_VENDORS", response.data.result);
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
  async fetchTotalVendorsCount({ commit }, categorySlug) {
    try {
      const response = await httpClient.get(
        `/api/fundability/funding_providers/${categorySlug}/count`,
        {
          headers: { Authorization: this.state.auth.AuthString },
        }
      );
      commit("SET_FUNDING_VENDORS_COUNT", response.data.result.count);
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
  async addNewFundingAccount({ commit, state }, id) {
    try {
      const response = await httpClient.put(
        "/api/fundability/funding_account",
        {
          funding_provider: id,
        },
        {
          headers: { Authorization: this.state.auth.AuthString },
        }
      );
      const newAccount = response.data.result;
      const oldAccountsArray = state.fundingAccounts;
      let newAccountsArray = [];
      // Check if account is exist
      const accountIsExist = oldAccountsArray.filter(
        (account) => account.id === newAccount.id
      );
      if (accountIsExist.length) {
        oldAccountsArray.map((account) => {
          if (account.id === newAccount.id) {
            return newAccountsArray.push(newAccount);
          }
          return newAccountsArray.push(account);
        });
      } else {
        newAccountsArray = [...oldAccountsArray, newAccount];
      }
      commit("SET_FUNDING_ACCOUNTS", newAccountsArray);
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
  async fetchFundingAccounts({ commit }) {
    try {
      const response = await httpClient.get(
        "/api/fundability/funding_accounts",
        { headers: { Authorization: this.state.auth.AuthString } }
      );
      commit("SET_FUNDING_ACCOUNTS", response.data.result);
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
  async sendAccountBasicData({ commit, state }, data) {
    try {
      const response = await httpClient.post(
        `/api/fundability/funding_account/${data.accountID}`,
        data.data,
        { headers: { Authorization: this.state.auth.AuthString } }
      );

      const newAccount = response.data.result;
      const oldAccountsArray = state.fundingAccounts;
      let newAccountsArray = [];
      // Check if account is exist
      const accountIsExist = oldAccountsArray.filter(
        (account) => account.id === newAccount.id
      );
      if (accountIsExist.length) {
        oldAccountsArray.map((account) => {
          if (account.id === newAccount.id) {
            return newAccountsArray.push(newAccount);
          }
          return newAccountsArray.push(account);
        });
      } else {
        newAccountsArray = [...oldAccountsArray, newAccount];
      }
      commit("SET_FUNDING_ACCOUNTS", newAccountsArray);
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
  async sendAccountType({ commit, state }, data) {
    try {
      const response = await httpClient.post(
        `/api/fundability/funding_account/${data.accountID}/funding_term/${data.term}`,
        {},
        { headers: { Authorization: this.state.auth.AuthString } }
      );
      const newAccount = response.data.result;
      const oldAccountsArray = state.fundingAccounts;
      let newAccountsArray = [];
      // Check if account is exist
      const accountIsExist = oldAccountsArray.filter(
        (account) => account.id === newAccount.id
      );
      if (accountIsExist.length) {
        oldAccountsArray.map((account) => {
          if (account.id === newAccount.id) {
            return newAccountsArray.push(newAccount);
          }
          return newAccountsArray.push(account);
        });
      } else {
        newAccountsArray = [...oldAccountsArray, newAccount];
      }
      commit("SET_FUNDING_ACCOUNTS", newAccountsArray);
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
  SET_FUNDING_CATEGORIES(state, categories) {
    state.fundingCategories = categories;
  },
  SET_FUNDING_VENDORS(state, vendors) {
    state.vendors = vendors;
  },
  SET_FUNDING_VENDORS_COUNT(state, count) {
    state.totalVendorsCount = count;
  },
  SET_FUNDING_ACCOUNTS(state, accounts) {
    state.fundingAccounts = accounts;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
