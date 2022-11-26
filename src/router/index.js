import { createRouter, createWebHistory } from "vue-router";
import store from "../store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/signin",
      name: "signin",
      component: () => import("../views/Authentication/SignIn.vue"),
    },
    {
      path: "/forgot-password",
      name: "forgot-password",
      component: () => import("../views/Authentication/ForgotPassword.vue"),
    },
    {
      path: "/change-password",
      name: "change-password",
      component: () => import("../views/Authentication/ChangePassword.vue"),
    },
    {
      path: "/reset-link",
      name: "reset-link",
      component: () => import("../views/Authentication/ResetLink.vue"),
    },
    {
      path: "/address-screen",
      name: "address",
      component: () => import("../views/AddressScreen.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/fundability/foundation/business-address",
      name: "business-address",
      component: () => import("../views/BusinessAddress.vue"),
      children: [
        {
          path: "",
          component: () =>
            import("../components/business-address/BusinessAddressMain.vue"),
        },
        {
          path: "commercial",
          component: () =>
            import(
              "../components/business-address/BusinessAddressCommercial.vue"
            ),
        },
        {
          path: "commercial/verify",
          component: () =>
            import(
              "../components/business-address/BusinessAddressCommercialConfirmation.vue"
            ),
        },
        {
          path: "virtual/vendor",
          component: () =>
            import(
              "../components/business-address/BusinessAddressVirtualVendor.vue"
            ),
        },
        {
          path: "virtual/caution",
          component: () =>
            import("../components/business-address/BusinessAddressCaution.vue"),
        },
        {
          path: "virtual/bad",
          component: () =>
            import("../components/business-address/BadVirtualAddress.vue"),
        },
        {
          path: "virtual/other-virtual-options",
          component: () =>
            import(
              "../components/business-address/BusinessAddressVirtualOtherOptions.vue"
            ),
        },
        {
          path: "virtual/address",
          component: () =>
            import("../components/business-address/BusinessAddressVirtual.vue"),
        },
        {
          path: "virtual/resources",
          component: () =>
            import(
              "../components/business-address/BusinessAddressVirtualResources.vue"
            ),
        },
        {
          path: "virtual/verify",
          component: () =>
            import(
              "../components/business-address/BusinessAddressVirtualConfirmation.vue"
            ),
        },
        {
          path: "home",
          component: () =>
            import("../components/business-address/BusinessAddressHome.vue"),
        },
        {
          path: "home/verify",
          component: () =>
            import(
              "../components/business-address/BusinessAddressHomeConfirmation.vue"
            ),
        },
        {
          path: "po-box",
          component: () =>
            import(
              "../components/business-address/BusinessAddressPoBoxOptions.vue"
            ),
        },
        {
          path: "po-box/use-po-box",
          component: () =>
            import("../components/business-address/BusinessAddressPoBox.vue"),
        },
      ],
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/fundability/foundation/ownership",
      name: "ownership",
      component: () => import("../views/OwnershipNode.vue"),
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "",
          component: () => import("../components/ownership/OwnershipMain.vue"),
        },
        {
          path: "single-ownership",
          component: () =>
            import("../components/ownership/SingleOwnership.vue"),
        },
        {
          path: "multiple-ownership",
          component: () =>
            import("../components/ownership/MultipleOwnership.vue"),
        },
        {
          path: "verification",
          component: () =>
            import("../components/ownership/OwnershipVerification.vue"),
        },
        {
          path: "resources",
          component: () =>
            import("../components/ownership/OwnershipResources.vue"),
        },
        {
          path: "complete",
          component: () =>
            import("../components/ownership/OwnershipComplete.vue"),
        },
      ],
    },
    {
      path: "/fundability/foundation/ein",
      name: "ein",
      component: () => import("../views/EIN.vue"),
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "",
          component: () => import("../components/ein/EINMain.vue"),
        },
        {
          path: "resources",
          component: () => import("../components/ein/EINResources.vue"),
        },
        {
          path: "ein-form",
          component: () => import("../components/ein/EINForm.vue"),
        },
        {
          path: "ein-match",
          component: () => import("../components/ein/EINMatch.vue"),
        },
        {
          path: "ein-discrepancy-solutions",
          component: () =>
            import("../components/ein/EINDiscrepancySolutions.vue"),
        },
        {
          path: "ein-update",
          component: () => import("../components/ein/EINUpdateIRS.vue"),
        },
        {
          path: "ein-check",
          component: () => import("../components/ein/EINCheckIRS.vue"),
        },
        {
          path: "ein-form-confirm",
          component: () => import("../components/ein/EINFormConfirmation.vue"),
        },
      ],
    },
    {
      path: "/fundability/foundation/business-phone",
      name: "business-phone",
      component: () => import("../views/BusinessPhone.vue"),
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "",
          component: () =>
            import("../components/business-phone/BusinessPhoneMain.vue"),
        },
        {
          path: "business-phone-form",
          component: () =>
            import("../components/business-phone/BusinessPhoneForm.vue"),
        },
        {
          path: "resources",
          component: () =>
            import("../components/business-phone/BusinessPhoneResources.vue"),
        },
        {
          path: "business-phone-form-confirm",
          component: () =>
            import(
              "../components/business-phone/BusinessPhoneFormConfirmation.vue"
            ),
        },
      ],
    },
    {
      path: "/fundability/foundation/website-email",
      name: "website-email",
      component: () => import("../views/WebsiteEmail.vue"),
      children: [
        {
          path: "",
          component: () =>
            import("../components/website-email/WebsiteEmailMain.vue"),
        },
        {
          path: "website-form",
          component: () =>
            import("../components/website-email/WebsiteEmailForm.vue"),
        },
        {
          path: "resources",
          component: () =>
            import("../components/website-email/WebsiteEmailResources.vue"),
        },
        {
          path: "website-form-confirm",
          component: () =>
            import(
              "../components/website-email/WebsiteEmailFormConfirmation.vue"
            ),
        },
      ],
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/fundability/financials/business-account",
      name: "business-account",
      component: () => import("../views/BankAccount.vue"),
      children: [
        {
          path: "",
          component: () =>
            import("../components/bank-account/BankAccountMain.vue"),
        },
        {
          path: "resources",
          component: () =>
            import("../components/bank-account/BankAccountResources.vue"),
        },
        {
          path: "bank-account-form",
          component: () =>
            import("../components/bank-account/BankAccountForm.vue"),
        },
        {
          path: "bank-account-match",
          component: () =>
            import("../components/bank-account/BankAccountMatch.vue"),
        },
        {
          path: "bank-account-form-confirm",
          component: () =>
            import("../components/bank-account/BankAccountConfirmation.vue"),
        },
        {
          path: "bank-account-update",
          component: () =>
            import("../components/bank-account/BankAccountUpdate.vue"),
        },
      ],
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/fundability/foundation/merchant-account",
      name: "merchant-account",
      component: () => import("../views/MerchantAccount.vue"),
      children: [
        {
          path: "",
          component: () =>
            import("../components/merchant-account/MerchantAccountMain.vue"),
        },
        {
          path: "not-needed",
          component: () =>
            import(
              "../components/merchant-account/MerchantAccountNotNeeded.vue"
            ),
        },
        {
          path: "resources",
          component: () =>
            import(
              "../components/merchant-account/MerchantAccountResources.vue"
            ),
        },
        {
          path: "merchant-account-form",
          component: () =>
            import("../components/merchant-account/MerchantAccountForm.vue"),
        },
        {
          path: "merchant-account-match",
          component: () =>
            import("../components/merchant-account/MerchantAccountMatch.vue"),
        },
        {
          path: "merchant-account-form-confirm",
          component: () =>
            import(
              "../components/merchant-account/MerchantAccountComplete.vue"
            ),
        },
        {
          path: "merchant-account-update",
          component: () =>
            import("../components/merchant-account/MerchantAccountUpdate.vue"),
        },
      ],
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/fundability/foundation/business-industry",
      name: "business-industry",
      component: () => import("../views/BusinessIndustry.vue"),
      children: [
        {
          path: "",
          component: () =>
            import("../components/business-industry/BusinessIndustryMain.vue"),
        },
        {
          path: "naics-code",
          component: () =>
            import(
              "../components/business-industry/BusinessIndustryNAICSCode.vue"
            ),
        },
        {
          path: "find-naics-code",
          component: () =>
            import(
              "../components/business-industry/BusinessIndustryFindNAICSCode.vue"
            ),
        },
        {
          path: "high-risk",
          component: () =>
            import(
              "../components/business-industry/BusinessIndustryHighRisk.vue"
            ),
        },
        {
          path: "select-new-industry",
          component: () =>
            import(
              "../components/business-industry/BusinessIndustrySelectNewIndustry.vue"
            ),
        },
        {
          path: "risky",
          component: () =>
            import("../components/business-industry/BusinessIndustryRisky.vue"),
        },
        {
          path: "confirmation",
          component: () =>
            import(
              "../components/business-industry/BusinessIndustryConfirmation.vue"
            ),
        },
      ],
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/fundability/foundation/business-entity",
      name: "business-entity",
      component: () => import("../views/BusinessEntity.vue"),
      children: [
        {
          path: "",
          component: () =>
            import("../components/business-entity/BusinessEntityMain.vue"),
        },
        {
          path: "llc",
          component: () =>
            import("../components/business-entity/BusinessEntityLLC.vue"),
        },
        {
          path: "llc/resources",
          component: () =>
            import(
              "../components/business-entity/BusinessEntityLLCResources.vue"
            ),
        },
        {
          path: "s-or-c",
          component: () =>
            import("../components/business-entity/BusinessEntitySnC.vue"),
        },
        {
          path: "s-or-c/resources",
          component: () =>
            import(
              "../components/business-entity/BusinessEntitySnCResources.vue"
            ),
        },
        {
          path: "partnership",
          component: () =>
            import(
              "../components/business-entity/BusinessEntityPartnership.vue"
            ),
        },
        {
          path: "partnership/resources",
          component: () =>
            import(
              "../components/business-entity/BusinessEntityPartnershipResources.vue"
            ),
        },
        {
          path: "sole-proprietor",
          component: () =>
            import(
              "../components/business-entity/BusinessEntitySoleOptions.vue"
            ),
        },
        {
          path: "match",
          component: () =>
            import("../components/business-entity/BusinessEntityMatch.vue"),
        },
        {
          path: "update-match",
          component: () =>
            import(
              "../components/business-entity/BusinessEntityUpdateMatch.vue"
            ),
        },
        {
          path: "entity-form-confirm",
          name: "business-entity-form-confirm",
          component: () =>
            import("../components/business-entity/BusinessEntityComplete.vue"),
        },
        {
          path: "entity-discrepancy-solutions",
          component: () =>
            import(
              "../components/business-entity/EntityDiscrepancySolutions.vue"
            ),
        },
        {
          path: "discrepancy-screener",
          component: () =>
            import(
              "../components/business-entity/EntityDiscrepancyScreener.vue"
            ),
        },
        {
          path: "entity-update-resource",
          component: () =>
            import("../components/business-entity/EntityUpdateResource.vue"),
        },
        {
          path: "registration",
          component: () =>
            import("../components/business-entity/BusinessEntityRegistration.vue"),
        },
      ],
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/fundability/foundation/foreign-filing",
      name: "foreign-filing",
      component: () => import("../views/ForeignFiling.vue"),
      children: [
        {
          path: "",
          component: () =>
            import("../components/foreign-filing/ForeignFilingMain.vue"),
        },
        {
          path: "resources",
          component: () =>
            import("../components/foreign-filing/ForeignFilingResources.vue"),
        },
        {
          path: "filing-done",
          component: () =>
            import("../components/foreign-filing/ForeignFilingDone.vue"),
        },
        {
          path: "not-needed",
          component: () =>
            import("../components/foreign-filing/ForeignFilingNotNeeded.vue"),
        },
      ],
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/fundability/:selected",
      name: "blueprint-foundation",
      alias: "/",
      component: () => import("../views/BlueprintFoundation.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/fundability/personal/personal-credit-score",
      name: "personal credit score",
      component: () => import("../views/PersonalCreditScore.vue"),
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "",
          component: () =>
            import("../components/personal-score/PersonalCreditScoreMain.vue"),
        },
        {
          path: "complete",
          component: () =>
            import(
              "../components/personal-score/PersonalCreditScoreComplete.vue"
            ),
        },
        {
          path: "resources",
          component: () =>
            import(
              "../components/personal-score/PersonalCreditScoreResources.vue"
            ),
        },
      ],
    },
    {
      path: "/fundability/personal/credit-report",
      name: "credit report",
      component: () => import("../views/CreditReport.vue"),
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "",
          component: () =>
            import("../components/credit-report/CreditReportMain.vue"),
        },
        {
          path: "complete",
          component: () =>
            import("../components/credit-report/CreditReportComplete.vue"),
        },
        {
          path: "resources",
          component: () =>
            import("../components/credit-report/CreditReportResources.vue"),
        },
        {
          path: "upload-my-score-iq",
          component: () =>
            import("../components/credit-report/CreditReportUpload.vue"),
        },
      ],
    },
    {
      path: "/fundability/personal/lexis-nexis",
      name: "lexisnexis",
      component: () => import("../views/LexisNexis.vue"),
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "",
          component: () =>
            import("../components/lexis-nexis/LexisNexisMain.vue"),
        },
        {
          path: "complete",
          component: () =>
            import("../components/lexis-nexis/LexisNexisComplete.vue"),
        },
        {
          path: "resources",
          component: () =>
            import("../components/lexis-nexis/LexisNexisResources.vue"),
        },
        {
          path: "upload-lexisnexis",
          component: () =>
            import("../components/lexis-nexis/LexisNexisUpload.vue"),
        },
      ],
    },
    {
      path: "/fundability/personal/chex-systems",
      name: "chex systems",
      component: () => import("../views/ChexSystems.vue"),
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "",
          component: () =>
            import("../components/chex-systems/ChexSystemsMain.vue"),
        },
        {
          path: "complete",
          component: () =>
            import("../components/chex-systems/ChexSystemsComplete.vue"),
        },
        {
          path: "resources",
          component: () =>
            import("../components/chex-systems/ChexSystemsResources.vue"),
        },
        {
          path: "upload-chex-report",
          component: () =>
            import("../components/chex-systems/ChexSystemsUpload.vue"),
        },
      ],
    },
    {
      path: "/fundability/personal/bankruptcy",
      name: "Bankruptcies, Liens and Judgements",
      component: () => import("../views/Bankruptcy.vue"),
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "",
          component: () =>
            import("../components/bankruptcy/bankruptcyMain.vue"),
        },
        {
          path: "owners-credit-report",
          component: () =>
            import("../components/bankruptcy/bankruptcyReport.vue"),
        },
        {
          path: "registered",
          component: () =>
            import("../components/bankruptcy/bankruptcyRegistered.vue"),
        },
        {
          path: "complete",
          component: () =>
            import("../components/bankruptcy/bankruptcyComplete.vue"),
        },
      ],
    },
    {
      path: "/fundability/financials/business-tax",
      name: "business tax returns",
      component: () => import("../views/BusinessTaxReturns.vue"),
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "",
          component: () =>
            import(
              "../components/business-tax-returns/BusinessTaxReturnsMain.vue"
            ),
        },
        {
          path: "incomplete",
          component: () =>
            import(
              "../components/business-tax-returns/BusinessTaxReturnsIncomplete.vue"
            ),
        },
        {
          path: "not-up-to-date",
          component: () =>
            import(
              "../components/business-tax-returns/BusinessTaxReturnsNotUpToDate.vue"
            ),
        },
        {
          path: "up-to-date",
          component: () =>
            import(
              "../components/business-tax-returns/BusinessTaxReturnsUpToDate.vue"
            ),
        },
        {
          path: "form",
          component: () =>
            import(
              "../components/business-tax-returns/BusinessTaxReturnsForm.vue"
            ),
        },
        {
          path: "confirmation",
          component: () =>
            import(
              "../components/business-tax-returns/BusinessTaxReturnsConfirmation.vue"
            ),
        },
      ],
    },
    {
      path: "/fundability/financials/business-account-statements",
      name: "business account statements",
      component: () => import("../views/BusinessAccountStatements.vue"),
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "add-bank-account",
          component: () =>
            import(
              "../components/business-account-statements/AddBankAccount.vue"
            ),
        },
        {
          path: "",
          component: () =>
            import(
              "../components/business-account-statements/BusinessAccountStatementsMain.vue"
            ),
        },
        {
          path: "confirmation",
          component: () =>
            import(
              "../components/business-account-statements/BusinessAccountStatementsConfirmation.vue"
            ),
        },
      ],
    },
    {
      path: "/fundability/financials/business-account-balance",
      name: "business account balance",
      component: () => import("../views/BusinessAccountBalance.vue"),
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "",
          component: () =>
            import(
              "../components/business-account-balance/BusinessAccountBalanceMain.vue"
            ),
        },
        {
          path: "add-bank-account",
          component: () =>
            import(
              "../components/business-account-balance/AddBankAccount.vue"
            ),
        },
        {
          path: "confirmation",
          component: () =>
            import(
              "../components/business-account-balance/BusinessAccountBalanceConfirmation.vue"
            ),
        },
      ],
    },
    {
      path: "/fundability/financials/financial-statements",
      name: "financial statements",
      component: () => import("../views/FinancialStatements.vue"),
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "",
          component: () =>
            import(
              "../components/financial-statements/FinancialStatementsMain.vue"
            ),
        },
        {
          path: "resources",
          component: () =>
            import(
              "../components/financial-statements/FinancialStatementsResources.vue"
            ),
        },
        {
          path: "statements-terms",
          component: () =>
            import(
              "../components/financial-statements/FinancialStatementsTerms.vue"
            ),
        },
        {
          path: "upload-statement",
          component: () =>
            import(
              "../components/financial-statements/FinancialStatementsUpload.vue"
            ),
        },
        {
          path: "complete",
          component: () =>
            import(
              "../components/financial-statements/FinancialStatementsComplete.vue"
            ),
        },
      ],
    },
    {
      path: "/fundability/financials/business-collateral",
      name: "financial collateral",
      component: () => import("../views/BusinessCollateral.vue"),
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "",
          component: () =>
            import(
              "../components/business-collateral/BusinessCollateralMain.vue"
            ),
        },
        {
          path: "no-collateral",
          component: () =>
            import(
              "../components/business-collateral/BusinessNoCollateral.vue"
            ),
        },
        {
          path: "account-recurring",
          component: () =>
            import(
              "../components/business-collateral/BusinessCollateralAccountRecurring.vue"
            ),
        },
        {
          path: "titled-equipment",
          component: () =>
            import(
              "../components/business-collateral/BusinessCollateralTitledEquipment.vue"
            ),
        },
        {
          path: "real-estate",
          component: () =>
            import(
              "../components/business-collateral/BusinessCollateralRealEstate.vue"
            ),
        },
        {
          path: "401k",
          component: () =>
            import(
              "../components/business-collateral/BusinessCollateral401k.vue"
            ),
        },
        {
          path: "securities-accounts",
          component: () =>
            import(
              "../components/business-collateral/BusinessSecuritiesAccounts.vue"
            ),
        },
        {
          path: "other",
          component: () =>
            import(
              "../components/business-collateral/BusinessCollateralOther.vue"
            ),
        },
        {
          path: "complete",
          component: () =>
            import(
              "../components/business-collateral/BusinessCollateralComplete.vue"
            ),
        },
      ],
    },
    {
      path: "/fundability/financials/personal-tax",
      name: "personal tax returns",
      component: () => import("../views/PersonalTaxReturns.vue"),
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "",
          name: "",
          component: () =>
            import(
              "../components/personal-tax-returns/PersonalTaxReturnsMain.vue"
            ),
        },
        {
          path: "resources",
          component: () =>
            import(
              "../components/personal-tax-returns/PersonalTaxReturnsResources.vue"
            ),
        },
        {
          path: "extension",
          name: "extension",
          component: () =>
            import(
              "../components/personal-tax-returns/PersonalTaxReturnsExtension.vue"
            ),
        },
        {
          path: "back-taxes",
          name: "back-taxes",
          component: () =>
            import(
              "../components/personal-tax-returns/PersonalTaxReturnsBackTax.vue"
            ),
        },
        {
          path: "form",
          component: () =>
            import(
              "../components/personal-tax-returns/PersonalTaxReturnsForm.vue"
            ),
        },
        {
          path: "complete",
          component: () =>
            import(
              "../components/personal-tax-returns/PersonalTaxReturnsComplete.vue"
            ),
        },
      ],
    },
    {
      path: "/fundability/financials/business-revenue",
      name: "business gross revenue",
      component: () => import("../views/BusinessGrossRevenue.vue"),
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "",
          name: "",
          component: () =>
            import(
              "../components/business-gross-revenue/BusinessGrossRevenueMain.vue"
            ),
        },
        {
          path: "resources",
          component: () =>
            import(
              "../components/business-gross-revenue/BusinessGrossRevenueResources.vue"
            ),
        },
        {
          path: "form",
          component: () =>
            import(
              "../components/business-gross-revenue/BusinessGrossRevenueForm.vue"
            ),
        },
        {
          path: "complete",
          component: () =>
            import(
              "../components/business-gross-revenue/BusinessGrossRevenueComplete.vue"
            ),
        },
      ],
    },
    {
      path: "/fundability/financials/employees",
      name: "employees",
      component: () => import("../views/Employees.vue"),
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "",
          component: () =>
            import(
              "../components/employees/EmployeesMain.vue"
            ),
        },
        {
          path: "confirmation",
          component: () =>
            import(
              "../components/employees/EmployeesConfirmation.vue"
            ),
        },
      ],
    },
    {
      path: "/loading-demo",
      name: "loading-demo",
      component: () => import("../views/LoadingDemo.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/components",
      name: "components",
      component: () => import("../views/FormComponents.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/funding/funding-explorer/:category?/:subcategory?/:list?",
      name: "funding-explorer",
      alias: "/funding/funding-explorer",
      component: () => import("../views/BusinessFunding.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/funding/provider/:provider",
      name: "funding-provider",
      component: () =>
        import("../components/business-funding/VendorProvider.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/funding/provider/:provider/purchase-invoicing",
      name: "funding-provider-purchase-invoicing",
      component: () =>
        import(
          "../components/business-funding/VendorProviderPurchaseInvoicing.vue"
        ),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/funding/provider/:provider/verify-address",
      name: "funding-provider-verify",
      component: () =>
        import("../components/business-funding/VerifyAddress.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/funding/provider/:provider/completed",
      name: "funding-provider-success",
      component: () =>
        import("../components/business-funding/VendorProviderSuccess.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/funding-manager",
      name: "funding manager",
      component: () => import("../views/FundingManager.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/funding-manager/accounts-not-approved",
      name: "accounts not approved",
      component: () =>
        import("../components/funding-manager/AccountsNotApproved.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/marketplace",
      name: "resource market",
      component: () => import("../views/ResourceMarket.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/:pathMatch(.*)*",
      component: () => import("./../views/NotFound.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters["auth/isLoggedIn"]) {
      next({ name: "signin" });
    } else {
      next(); // go to wherever I'm going
    }
  } else {
    if (
      store.getters["auth/isLoggedIn"] &&
      (to.path === "/signin" ||
        to.path === "/forgot-password" ||
        to.path === "/change-password" ||
        to.path === "/reset-link")
    ) {
      next({ path: "/" });
    } else {
      next(); // does not require auth, make sure to always call next()!
    }
  }
});

export default router;
