import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
// Modules
import auth from "./modules/auth.module";
import aspects from "./modules/aspects.module";
import aspectScreen from "./modules/aspectScreen.module";
// Foundation Modules
import businessAddress from "./modules/businessAddress.module";
import entity from "./modules/entity.module";
import foreignFiling from "./modules/foreignFiling.module";
import ownership from "./modules/ownership.module";
import ein from "./modules/ein.module";
import businessPhone from "./modules/businessPhone.module";
import websiteEmail from "./modules/websiteEmail.module";
import merchantAccount from "./modules/merchantAccount.module";
import businessIndustry from "./modules/businessIndustry.module";
// Personal Modules
import creditScore from "./modules/creditScore.module";
import creditReport from "./modules/creditReport.module";
import lexisNexis from "./modules/lexisNexis.module";
import chexSystems from "./modules/chexSystems.module";
import bankruptcy from "./modules/bankruptcy.module";
// Financials Modules
import bankAccount from "./modules/bankAccount.module";
import businessTaxReturns from "./modules/businessTaxReturns.module";
import businessAccountStatements from "./modules/businessAccountStatements.module";
import businessAccountBalance from "./modules/businessAccountBalance.module";
import financialStatement from "./modules/financialStatement.module";
import businessCollateral from "./modules/businessCollateral.module";
import personalTaxReturns from "./modules/personalTaxReturns.module";
import businessGrossRevenue from "./modules/businessGrossRevenue.module";
import employees from "./modules/employees.module";
// Funding Modules
import funding from "./modules/funding.module";
// Resource Market Place
import resourceMarketModule from "./modules/resourceMarket.module";

// Create a new store instance.
const store = createStore({
  modules: {
    auth: auth,
    aspects: aspects,
    aspectScreen: aspectScreen,
    businessAddress: businessAddress,
    entity: entity,
    foreignFiling: foreignFiling,
    ownership: ownership,
    ein: ein,
    businessPhone: businessPhone,
    websiteEmail: websiteEmail,
    bankAccount: bankAccount,
    merchantAccount: merchantAccount,
    businessIndustry: businessIndustry,
    creditScore: creditScore,
    creditReport: creditReport,
    lexisNexis: lexisNexis,
    chexSystems: chexSystems,
    bankruptcy: bankruptcy,
    businessTaxReturns: businessTaxReturns,
    financialStatement: financialStatement,
    businessCollateral: businessCollateral,
    businessAccountStatements: businessAccountStatements,
    businessAccountBalance: businessAccountBalance,
    personalTaxReturns: personalTaxReturns,
    businessGrossRevenue: businessGrossRevenue,
    funding: funding,
    employees: employees,
    resourceMarket: resourceMarketModule,
  },
  state() {
    return {
      errorMessage: "",
    };
  },
  getters: {
    getError: (state) => state.errorMessage,
  },
  actions: {},
  mutations: {
    // Start Errors
    SET_ERROR_MESSAGE(state, msg) {
      state.errorMessage = msg;
    },
  },
  plugins: [
    createPersistedState({
      reducer: (persistedState) => {
        const stateFilter = Object.assign({}, persistedState);
        const blackList = [["errorMessage"]];
        blackList.forEach((item) => {
          if (item[1]) {
            return delete stateFilter[item[0]][item[1]];
          }
          return delete stateFilter[item[0]];
        });
        return stateFilter;
      },
    }),
  ],
});

export default store;
