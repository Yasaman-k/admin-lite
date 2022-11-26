import httpClient from "../../api/httpClient";

const state = {
  ownershipOwners: [],
  ownershipSosConfirmation: {},
};

const getters = {
  getOwnershipOwners: (state) => state.ownershipOwners,
  getOwnershipSosConfirmation: (state) => state.ownershipSosConfirmation,
};

const actions = {
  async fetchOwnershipSosConfirmation({ commit }) {
    try {
      const requiredData = {
        types: ["has_confirmed_ownership_matches_secretary_of_states"],
      };
      const response = await httpClient.post(
        `/api/fundability/statements`,
        requiredData,
        {
          headers: { Authorization: this.state.auth.AuthString },
        }
      );
      commit("SET_OWNERSHIP_SOS_CONFIRMATION", response.data.result);
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
  async sendOwnershipSosConfirmation({ commit }, data) {
    try {
      const response = await httpClient.put(
        "/api/fundability/statement/has_confirmed_ownership_matches_secretary_of_states",
        data,
        {
          headers: { Authorization: this.state.auth.AuthString },
        }
      );
      commit("SET_OWNERSHIP_SOS_CONFIRMATION", response.data.result);
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
  async getOwnershipsOwners({ commit }) {
    try {
      const response = await httpClient.get(`/api/fundability/ownership`, {
        headers: { Authorization: this.state.auth.AuthString },
      });
      commit("SET_OWNERSHIP_OWNERS", response.data.result);
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
  async sendOwnerships({ commit }, ownership) {
    try {
      const response = await httpClient.put(
        `/api/fundability/ownership`,
        ownership,
        {
          headers: { Authorization: this.state.auth.AuthString },
        }
      );
      commit("ADD_OWNERSHIPS", response.data.result);
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
  async updateOwnership({ commit }, data) {
    try {
      const response = await httpClient.post(
        `/api/fundability/ownership/${data.id}`,
        data.owner,
        {
          headers: { Authorization: this.state.auth.AuthString },
        }
      );
      commit("UPDATE_OWNERSHIPS", response.data.result);
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
  async deleteOwnership({ commit }, id) {
    try {
      const response = await httpClient.delete(
        `/api/fundability/ownership/${id}`,
        {
          headers: { Authorization: this.state.auth.AuthString },
        }
      );
      commit("DELETE_OWNERSHIPS", response.data.result);
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
  SET_OWNERSHIP_SOS_CONFIRMATION(state, newOwnershipSosConfirmation) {
    state.ownershipSosConfirmation = newOwnershipSosConfirmation;
  },
  SET_OWNERSHIP_OWNERS(state, owners) {
    state.ownershipOwners = owners;
  },
  ADD_OWNERSHIPS(state, newOwnership) {
    state.ownershipOwners = [...state.ownershipOwners, newOwnership];
  },
  UPDATE_OWNERSHIPS(state, updatedOwnership) {
    state.ownershipOwners = state.ownershipOwners.map((ownership) => {
      if (ownership.id === updatedOwnership.id) {
        return updatedOwnership;
      }
      return ownership;
    });
  },
  DELETE_OWNERSHIPS(state, deletedOwnership) {
    state.ownershipOwners = state.ownershipOwners.filter(
      (ownership) => ownership.id != deletedOwnership.id
    );
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
