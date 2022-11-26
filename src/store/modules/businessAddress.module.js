import httpClient from "../../api/httpClient";

const state = {
  businessAddressFields: [],
  vendorList: [],
  vendorName: "",
  businessAddressState: {},
};

const getters = {
  getBusinessAddressFields: (state) => state.businessAddressFields,
  getFoundationStatuses: (state) => state.foundationStatuses,
  getVendorList: (state) => state.vendorList,
};

const actions = {
  async fetchBusinessAddressFields({ commit }) {
    try {
      const requiredData = {
        types: [
          "company",
          "business_address_type",
          "virtual_address_vendor",
          "business_address_street",
          "business_address_line2",
          "business_address_city",
          "business_address_zip",
          "business_address_state",
        ],
      };
      const response = await httpClient.post(
        "/api/fundability/fields",
        requiredData,
        {
          headers: { Authorization: this.state.auth.AuthString },
        }
      );
      commit("SET_BUSINESS_ADDRESS_FIELDS", response.data.result);
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
  async fetchBusinessAddressState({ commit }) {
    try {
      const requiredData = {
        types: ["business_address_state"],
      };
      const response = await httpClient.post(
        "/api/fundability/fields",
        requiredData,
        {
          headers: { Authorization: this.state.auth.AuthString },
        }
      );
      commit("SET_BUSINESS_ADDRESS_STATE", response.data.result);
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
  async sendBusinessAddressFields({ commit }, newData) {
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
      commit("UPDATE_BUSINESS_ADDRESS_FIELDS", response.data.result);
    } catch (error) {
      commit("SET_ERROR_MESSAGE", `${error.message}`, { root: true });
    }
  },
  async fetchVendorList({ commit }) {
    try {
      const response = await httpClient.get("/api/fundability/options", {
        params: {
          types: ["virtual_address_vendor"],
        },
        headers: { Authorization: this.state.auth.AuthString },
      });
      commit("SET_VENDOR_LIST", response.data.result);
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
  setVendorName({ commit }, name) {
    commit("SET_VENDOR_NAME", name);
  },
};

const mutations = {
  SET_BUSINESS_ADDRESS_FIELDS(state, fields) {
    state.businessAddressFields = fields;
  },
  SET_BUSINESS_ADDRESS_STATE(state, addressState) {
    state.businessAddressState = addressState;
  },
  UPDATE_BUSINESS_ADDRESS_FIELDS(state, fields) {
    const businessFields = state.businessAddressFields;
    const newFieldsExist = fields.filter((field) => {
      for (let i = 0; i < businessFields.length; i += 1) {
        if (Object.keys(businessFields[i])[0] === Object.keys(field)[0]) {
          return field;
        }
      }
    });
    if (businessFields.length && newFieldsExist.length === fields.length) {
      fields.map((field) => {
        for (let i = 0; i < businessFields.length; i += 1) {
          if (Object.keys(businessFields[i])[0] === Object.keys(field)[0]) {
            businessFields[i] = field;
            break;
          }
        }
      });
      return (state.businessAddressFields = businessFields);
    } else if (
      businessFields.length &&
      newFieldsExist.length != fields.length
    ) {
      fields.map((field) => {
        let exist = false;
        for (let i = 0; i < businessFields.length; i += 1) {
          if (Object.keys(businessFields[i])[0] === Object.keys(field)[0]) {
            exist = true;
            businessFields[i] = field;
            break;
          }
        }
        if (exist) return;
        return businessFields.push(field);
      });
      return (state.businessAddressFields = businessFields);
    } else if (businessFields.length && !newFieldsExist.length) {
      fields.map((field) => {
        businessFields.push(field);
      });
      return (state.businessAddressFields = businessFields);
    }
    return (state.businessAddressFields = fields);
  },
  SET_VENDOR_LIST(state, list) {
    state.vendorList = list;
  },
  SET_VENDOR_NAME(state, name) {
    state.vendorName = name;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
