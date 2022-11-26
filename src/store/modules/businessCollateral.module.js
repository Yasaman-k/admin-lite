import httpClient from "../../api/httpClient";

const state = {
  statements: [],
  equipment: [],
  collateralFields: [],
};

const getters = {
  getStatements: (state) => state.statements,
  getEquipment: (state) => state.equipment,
  getCollateralFields: (state) => state.collateralFields,
};

const actions = {
  async fetchStatements({ commit }) {
    try {
      const requiredData = {
        types: [
          "has_collateral",
          "has_accounts_receivable",
          "has_accounts_receivable_from_gov",
          "has_titled_equipment",
          "has_commercial_real_estate",
          "has_401ks_as_collateral",
          "has_securities_accounts",
          "has_contributing_to_securities_accounts",
          "has_other_collateral",
        ],
      };
      const response = await httpClient.post(
        `/api/fundability/statements`,
        requiredData,
        {
          headers: { Authorization: this.state.auth.AuthString },
        }
      );
      commit("SET_BUSINESS_COLLATERAL_STATEMENTS", response.data.result);
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
  async sendStatement({ commit }, data) {
    try {
      const response = await httpClient.put(
        `/api/fundability/statement/${data.type}`,
        data.requiredData,
        {
          headers: { Authorization: this.state.auth.AuthString },
        }
      );
      commit("UPDATE_BUSINESS_COLLATERAL_STATEMENTS", response.data.result);
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
  async fetchBusinessCollateralFields({ commit }) {
    try {
      const requiredData = {
        types: [
          "accounts_receivable_value",
          "commercial_real_estate_count",
          "commercial_real_estate_value",
          "401ks_value",
          "securities_accounts_value",
          "other_collateral_types",
          "other_collateral_value",
        ],
      };
      const response = await httpClient.post(
        "/api/fundability/fields",
        requiredData,
        {
          headers: { Authorization: this.state.auth.AuthString },
        }
      );
      commit("SET_BUSINESS_COLLATERAL_FIELDS", response.data.result);
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
  async sendBusinessCollateralFields({ commit }, newData) {
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
      commit("UPDATE_BUSINESS_COLLATERAL_FIELDS", response.data.result);
    } catch (error) {
      commit("SET_ERROR_MESSAGE", `${error.message}`, { root: true });
    }
  },
  async fetchEquipment({ commit }) {
    try {
      const response = await httpClient.get("/api/fundability/equipment", {
        headers: { Authorization: this.state.auth.AuthString },
      });
      commit("SET_COLLATERAL_EQUIPMENT", response.data.result);
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
  async addEquipment({ commit }, data) {
    try {
      const response = await httpClient.put(
        "/api/fundability/equipment",
        data,
        {
          headers: { Authorization: this.state.auth.AuthString },
        }
      );
      commit("ADD_COLLATERAL_EQUIPMENT", response.data.result);
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
  async updateEquipment({ commit }, data) {
    try {
      const response = await httpClient.post(
        `/api/fundability/equipment/${data.id}`,
        data.equipment,
        {
          headers: { Authorization: this.state.auth.AuthString },
        }
      );
      commit("UPDATE_COLLATERAL_EQUIPMENT", response.data.result);
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
  async deleteEquipment({ commit }, id) {
    try {
      const response = await httpClient.delete(
        `/api/fundability/equipment/${id}`,
        {
          headers: { Authorization: this.state.auth.AuthString },
        }
      );
      commit("DELETE_COLLATERAL_EQUIPMENT", response.data.result);
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
  SET_BUSINESS_COLLATERAL_STATEMENTS(state, statements) {
    state.statements = statements;
  },
  UPDATE_BUSINESS_COLLATERAL_STATEMENTS(state, newStatement) {
    const newStatements = [...state.statements];
    const newStatementObject = {};
    const newStatementExist = newStatements.filter(
      (statement) => Object.keys(statement)[0] === newStatement.type
    );
    if (newStatements.length && newStatementExist.length) {
      newStatements.map((statement, i) => {
        if (Object.keys(statement)[0] === newStatement.type) {
          newStatementObject[newStatement.type] = newStatement;
          return (newStatements[i] = newStatementObject);
        }
      });
      return (state.statements = newStatements);
    } else if (newStatements.length && !newStatementExist.length) {
      newStatements.push(newStatement);
      return (state.statements = newStatements);
    }
    return (state.statements = newStatements);
  },
  SET_BUSINESS_COLLATERAL_FIELDS(state, collateralFields) {
    state.collateralFields = collateralFields;
  },
  UPDATE_BUSINESS_COLLATERAL_FIELDS(state, collateralFields) {
    const businessCollateralFields = state.collateralFields;
    const newConfirmationsExist = collateralFields.filter((field) => {
      for (let i = 0; i < businessCollateralFields.length; i += 1) {
        if (
          Object.keys(businessCollateralFields[i])[0] === Object.keys(field)[0]
        ) {
          return field;
        }
      }
    });
    if (businessCollateralFields.length && newConfirmationsExist.length) {
      collateralFields.map((field) => {
        for (let i = 0; i < businessCollateralFields.length; i += 1) {
          if (
            Object.keys(businessCollateralFields[i])[0] ===
            Object.keys(field)[0]
          ) {
            businessCollateralFields[i] = field;
            break;
          }
        }
      });
      return (state.collateralFields = businessCollateralFields);
    } else if (
      businessCollateralFields.length &&
      !newConfirmationsExist.length
    ) {
      collateralFields.map((field) => {
        businessCollateralFields.push(field);
      });
      return (state.collateralFields = businessCollateralFields);
    }
    return (state.collateralFields = collateralFields);
  },
  SET_COLLATERAL_EQUIPMENT(state, equipment) {
    state.equipment = equipment;
  },
  ADD_COLLATERAL_EQUIPMENT(state, newEquipment) {
    state.equipment = [...state.equipment, newEquipment];
  },
  UPDATE_COLLATERAL_EQUIPMENT(state, updatedEquipment) {
    state.equipment = state.equipment.map((ownership) => {
      if (ownership.id === updatedEquipment.id) {
        return updatedEquipment;
      }
      return ownership;
    });
  },
  DELETE_COLLATERAL_EQUIPMENT(state, deletedEquipment) {
    state.equipment = state.equipment.filter(
      (ownership) => ownership.id != deletedEquipment.id
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
