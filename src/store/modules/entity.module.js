import httpClient from "../../api/httpClient";

const state = {
  entityFields: [],
  matchFields: [],
  matchConfirmation: null,
  entityType: "",
  industryOptions: [],
};

const getters = {
  getEntityFields: (state) => state.entityFields,
  getMatchFields: (state) => state.matchFields,
  getMatchConfirmation: (state) => state.matchConfirmation,
  getEntityType: (state) => state.entityType,
  getIndustryOptions: (state) => state.industryOptions,
};

const actions = {
  async fetchEntityFields({ commit }) {
    try {
      const entityFields = [
        "entity_type",
        "business_industry",
        "business_created_at",
        "business_state_incorporated",
      ];
      const matchFields = [
        "company",
        "business_address_street",
        "business_address_line2",
        "business_address_city",
        "business_address_state",
        "business_address_zip",
      ];
      const requiredData = {
        types: [...entityFields, ...matchFields],
      };
      const response = await httpClient.post(
        `/api/fundability/fields`,
        requiredData,
        {
          headers: { Authorization: this.state.auth.AuthString },
        }
      );
      const result = response.data.result;
      const matchFieldsFiltered = result.filter((field) => {
        if (matchFields.includes(Object.keys(field)[0])) return field;
      });
      const entityFieldsFiltered = result.filter((field) => {
        if (entityFields.includes(Object.keys(field)[0])) return field;
      });
      commit("SET_MATCH_FIELDS", matchFieldsFiltered);
      commit("SET_ENTITY_FIELDS", entityFieldsFiltered);
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
  async setEntityType({ commit }, type) {
    commit("SET_ENTITY_TYPE", type);
  },
  async fetchMatchConfirmation({ commit }) {
    try {
      const requiredData = {
        types: ["has_confirmed_address_matches_secretary_of_states"],
      };
      const response = await httpClient.post(
        `/api/fundability/statements`,
        requiredData,
        {
          headers: { Authorization: this.state.auth.AuthString },
        }
      );
      commit("SET_MATCH_CONFIRMATION", response.data.result);
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
  async sendMatchConfirmation({ commit }, data) {
    try {
      const response = await httpClient.put(
        `/api/fundability/statement/${data.type}`,
        data.requiredData,
        {
          headers: { Authorization: this.state.auth.AuthString },
        }
      );
      commit("SET_MATCH_CONFIRMATION", response.data.result);
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
  async sendEntityFields({ commit }, newData) {
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
      commit("UPDATE_ENTITY_FIELDS", response.data.result);
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
  async fetchIndustryOptions({ commit }) {
    try {
      const response = await httpClient.get("/api/fundability/options", {
        params: {
          types: ["business_industry"],
        },
        headers: { Authorization: this.state.auth.AuthString },
      });
      commit("SET_INDUSTRY_OPTIONS", response.data.result);
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
  SET_ENTITY_FIELDS(state, fields) {
    state.entityFields = fields;
  },
  SET_MATCH_FIELDS(state, fields) {
    state.matchFields = fields;
  },
  SET_ENTITY_TYPE(state, type) {
    state.entityType = type;
  },
  SET_INDUSTRY_OPTIONS(state, options) {
    state.industryOptions = options;
  },
  SET_MATCH_CONFIRMATION(state, confirmation) {
    state.matchConfirmation = confirmation;
  },
  UPDATE_ENTITY_FIELDS(state, fields) {
    const entityFields = state.entityFields;
    const newFieldsExist = fields.filter((field) => {
      for (let i = 0; i < entityFields.length; i += 1) {
        if (Object.keys(entityFields[i])[0] === Object.keys(field)[0]) {
          return field;
        }
      }
    });
    if (entityFields.length && newFieldsExist.length === fields.length) {
      fields.map((field) => {
        for (let i = 0; i < entityFields.length; i += 1) {
          if (Object.keys(entityFields[i])[0] === Object.keys(field)[0]) {
            entityFields[i] = field;
            break;
          }
        }
      });
      return (state.entityFields = entityFields);
    } else if (entityFields.length && newFieldsExist.length != fields.length) {
      fields.map((field) => {
        let exist = false;
        for (let i = 0; i < entityFields.length; i += 1) {
          if (Object.keys(entityFields[i])[0] === Object.keys(field)[0]) {
            exist = true;
            entityFields[i] = field;
            break;
          }
        }
        if (exist) return;
        return entityFields.push(field);
      });
      return (state.entityFields = entityFields);
    } else if (entityFields.length && !newFieldsExist.length) {
      fields.map((field) => {
        entityFields.push(field);
      });
      return (state.entityFields = entityFields);
    }
    return (state.entityFields = fields);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
