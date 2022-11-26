import httpClient from "../../api/httpClient";

const state = {
  resourceTypes: [],
  resourceCategories: [],
  pagination: null,
};

const getters = {
  getResourceTypes: (state) => state.resourceTypes,
  getResourceCategories: (state) => state.resourceCategories,
  getPagination: (state) => state.pagination,
};

const actions = {
  async fetchResourceTypes({ commit }) {
    try {
      const response = await httpClient.get(
        "/api/fundability/resource_categories",
        { headers: { Authorization: this.state.auth.AuthString } }
      );
      commit("SET_RESOURCE_TYPES", response.data.result);
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
  async fetchResourceCategories({ commit }) {
    try {
      const response = await httpClient.get(
        "/api/fundability/resources?page=1",
        {
          headers: { Authorization: this.state.auth.AuthString },
        }
      );
      commit("SET_RESOURCES", response.data.result);
      commit("SET_PAGINATION", response.data.pagination);
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
  async loadFilterResources({ commit }, { page, resourceTypes }) {
    try {
      let categoryIds = null;
      resourceTypes.map((cat, i) =>
        i > 0 ? (categoryIds += `,${cat.id}`) : (categoryIds = cat.id)
      );
      const response = await httpClient.get(
        `/api/fundability/resources?page=${page}${
          categoryIds ? "&category_ids=" + categoryIds : ""
        }`,
        {
          headers: { Authorization: this.state.auth.AuthString },
        }
      );
      page != 1
        ? commit("SET_MORE_RESOURCES", response.data.result)
        : commit("SET_RESOURCES", response.data.result);
      commit("SET_PAGINATION", response.data.pagination);
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
  async increaseClicks({ commit }, id) {
    await httpClient.post(
      `/api/resource/${id}/visit`,
      {},
      {
        headers: { Authorization: this.state.auth.AuthString },
      }
    );
  },
};

const mutations = {
  SET_RESOURCE_TYPES(state, types) {
    state.resourceTypes = types;
  },
  SET_RESOURCES(state, categories) {
    state.resourceCategories = categories;
  },
  SET_MORE_RESOURCES(state, newCategories) {
    state.resourceCategories = [...state.resourceCategories, ...newCategories];
  },
  SET_PAGINATION(state, pagination) {
    state.pagination = pagination;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
