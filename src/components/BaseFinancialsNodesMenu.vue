<template>
  <div
    class="mt-10 pr-3 !fixed right-0 top-10 md:w-[250px] lg:w-[240px] 3xl:w-[360px] tab-connection before:h-[500px] hidden lg:block z-10"
    id="right-navbar"
    ref="sidebar"
  >
    <div
      class="absolute left-[-85px] top-[-40px] bg-[#fafdff] md:w-[250px] lg:w-[308px] xl:w-[325px] 3xl:w-[378px] -z-10 h-full pb-20 box-content"
      ref="bg"
    ></div>
    <div class="px-2 overflow-y-hidden h-[565px]">
      <!-- Begin title icons -->
      <div
        class="w-[53px] h-[53px] absolute left-[-75px] top-[-18px] rounded-full shadow-lg bg-white flex items-center justify-center title-icons"
      >
        <IconFinancials class="w-[30px] h-[30px]" />
      </div>
      <!-- End title icons -->
      <!-- Begin title -->
      <h3 class="mb-5 text-2xl font-semibold 3xl:text-4xl text-[#196499]">
        Financials
      </h3>
      <!-- End title -->
      <!-- Begin Financials Tab -->
      <!-- Begin Financials Loader -->
      <div
        class="flex flex-col gap-2 pb-2 tab-connector"
        v-if="!financialsStatuses.length"
      >
        <BaseBtnLoading />
        <BaseBtnLoading />
        <BaseBtnLoading />
        <BaseBtnLoading />
        <BaseBtnLoading />
        <BaseBtnLoading />
        <BaseBtnLoading />
      </div>
      <!-- End Financials Loader -->
      <div
        class="flex flex-col gap-2 pb-2 tab-connector"
        v-if="financialsStatuses.length"
      >
        <StepButton
          :type="getState('bank_account')"
          text="Business Account"
          :to="
            activeNode === 'bank_account'
              ? nodeLink
              : '/fundability/financials/business-account'
          "
          :btnActive="activeNode === 'bank_account' ? true : false"
        />
        <StepButton
          :type="getState('business_account_statements')"
          text="Business Account Statements"
          :to="
            activeNode === 'business_account_statements'
              ? nodeLink
              : '/fundability/financials/business-account-statements'
          "
          :btnActive="
            activeNode === 'business_account_statements' ? true : false
          "
        />
        <StepButton
          :type="getState('business_account_balance')"
          text="Business Account Balance"
          :to="
            activeNode === 'business_account_balance'
              ? nodeLink
              : '/fundability/financials/business-account-balance'
          "
          :btnActive="activeNode === 'business_account_balance' ? true : false"
        />
        <StepButton
          :type="getState('business_tax_returns')"
          text="Business Tax Returns"
          :to="
            activeNode === 'business_tax_returns'
              ? nodeLink
              : '/fundability/financials/business-tax'
          "
          :btnActive="activeNode === 'business_tax_returns' ? true : false"
        />
        <StepButton
          :type="getState('financial_statement')"
          text="Financial Statements"
          :to="
            activeNode === 'financial_statement'
              ? nodeLink
              : '/fundability/financials/financial-statements'
          "
          :btnActive="activeNode === 'financial_statement' ? true : false"
        />
        <StepButton
          :type="getState('business_collateral')"
          text="Business Collateral"
          :to="
            activeNode === 'business_collateral'
              ? nodeLink
              : '/fundability/financials/business-collateral'
          "
          :btnActive="activeNode === 'business_collateral' ? true : false"
        />
        <StepButton
          :type="getState('personal_tax_returns')"
          text="Personal Tax Returns"
          :to="
            activeNode === 'personal_tax_returns'
              ? nodeLink
              : '/fundability/financials/personal-tax'
          "
          :btnActive="activeNode === 'personal_tax_returns' ? true : false"
        />
        <StepButton
          :type="getState('business_gross_revenue')"
          text="Business Revenue"
          :to="
            activeNode === 'business_gross_revenue'
              ? nodeLink
              : '/fundability/financials/business-revenue'
          "
          :btnActive="activeNode === 'business_gross_revenue' ? true : false"
        />
        <StepButton
          :type="getState('employees')"
          text="Employees"
          :to="
            activeNode === 'employees'
              ? nodeLink
              : '/fundability/financials/employees'
          "
          :btnActive="activeNode === 'employees' ? true : false"
        />
      </div>
      <!-- End Financials Tab -->
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUpdated, ref } from "vue";
import { useStore } from "vuex";
import BaseBtnLoading from "./BaseBtnLoading.vue";
import StepButton from "./StepButton.vue";

const store = useStore();

// Props
const props = defineProps({
  activeNode: {
    type: String,
    default: "",
  },
  nodeLink: {
    type: String,
    default: "",
  },
  pageHeaderId: {
    type: String,
    default: "",
  },
  pageContentId: {
    type: String,
    default: "",
  },
});

// Refs
const sidebar = ref(null);
const bg = ref(null);

// Statuses
const financialsStatuses = ref(store.getters["aspects/getFinancialsStatuses"]);

// Hooks
onMounted(() => {
  const leftNavbar = document.getElementById("left-navbar");
  const header = document.getElementById(props.pageHeaderId);
  const content = document.getElementById(props.pageContentId);
  header &&
    (header.style.left =
      leftNavbar && window.innerWidth > 1023
        ? `${leftNavbar.clientWidth}px`
        : 0);
  sidebar.value && (sidebar.value.style.top = `${header.clientHeight - 12}px`);
  content && (content.style.marginTop = `${header.clientHeight - 12}px`);
  content && (content.style.width = "100%");
  content &&
    (content.style.width = `${
      content.clientWidth - sidebar.value.clientWidth - 80
    }px`);
  bg.value && (bg.value.style.height = `${content.clientHeight}px`);
});

onUpdated(() => {
  financialsStatuses.value = store.getters["aspects/getFinancialsStatuses"];
});

// Methods
const getState = (name) => {
  const statuses = financialsStatuses.value;
  const status = statuses.find((item) =>
    Object.prototype.hasOwnProperty.call(item, name)
  );

  const state = status ? status[name] : "";
  if (state === "POSITIVE") {
    return "Done";
  } else if (state === "NEGATIVE") {
    return "FixNow";
  } else if (state === "EMPTY") {
    return "Empty";
  } else if (state === "CAUTION") {
    return "Caution";
  }
  return "";
};

window.addEventListener("resize", (e) => {
  const leftNavbar = document.getElementById("left-navbar") || null;
  const header = document.getElementById(props.pageHeaderId) || null;
  const content = document.getElementById(props.pageContentId) || null;
  header &&
    (header.style.left =
      leftNavbar && e.target.innerWidth > 1023
        ? `${leftNavbar.clientWidth}px`
        : 0);
  sidebar.value && (sidebar.value.style.top = `${header.clientHeight - 12}px`);
  content && (content.style.marginTop = `${header.clientHeight - 12}px`);
  content && (content.style.width = "100%");
  content &&
    sidebar.value &&
    (content.style.width = `${
      content.clientWidth - sidebar.value.clientWidth - 80
    }px`);
  bg.value && (bg.value.style.height = `${content.clientHeight}px`);
});
</script>
