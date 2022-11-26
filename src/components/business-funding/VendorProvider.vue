<template>
  <section class="flex">
    <BaseModalOver
      v-if="addAccountStep && modal"
      header="To ensure your accounts report and business credit is established, follow all instructions below:"
      content="
      <div class='mb-4 flex'>
        <span class='px-[10px] h-[21px] border-2 border-white rounded-sm mt-[2px] mr-3'></span>
        <p>
          Apply for Net or Revolving accounts.
        </p>
      </div>
      <div class='mb-4 flex'>
        <span class='px-[10px] h-[21px] border-2 border-white rounded-sm mt-[2px] mr-3'></span>
        <p>
           Copy and paste your full business name and address into each application using these copy icons <IconCopy /> in the right sidebar:
           <br />
           <span class='font-semibold'>NOTE:</span> Business info must be an exact match across all applications.
        </p>
      </div>"
      :actions="modalActionsBtns"
    />
    <BaseIframeApp :data="iframeData" />
    <AddAccountSidebar
      v-if="addAccountStep"
      :applyingSteps="applyingSteps"
      @addAccount="(id) => addAccount(id)"
    />
    <DecisionSidebar v-if="decisionStep" @handleDecision="handleDecision" />
    <ApprovalSidebar
      v-if="approvalStep"
      @handleApproval="handleDecision"
      @goBack="backToDecisionStep"
      @goNext="goToTypeStep"
    />
    <TypeSidebar
      v-if="typeStep"
      @goBack="backToApprovalStep"
      @goNext="goToAmountStep"
    />
    <AmountApprovedSidebar v-if="amountApprovedStep" @goBack="backToTypeStep" />
  </section>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import BaseModalOver from "./BaseModalOver.vue";
import BaseIframeApp from "./BaseIframeApp.vue";
import AddAccountSidebar from "./AddAccountSidebar.vue";
import DecisionSidebar from "./DecisionSidebar.vue";
import ApprovalSidebar from "./ApprovalSidebar.vue";
import TypeSidebar from "./TypeSidebar.vue";
import AmountApprovedSidebar from "./AmountApprovedSidebar.vue";

const store = useStore();
const route = useRoute();
// Refs
const iframeData = ref({
  src: "",
  title: "",
  iframeEnable: false,
});
const modal = ref(true);
const modalActionsBtns = ref([
  {
    name: "Ok Got It, Load The Application",
    disabled: false,
    style: "primary",
    handleAction: () => (modal.value = false),
  },
]);
const addAccountStep = ref(false);
const decisionStep = ref(false);
const approvalStep = ref(false);
const typeStep = ref(false);
const amountApprovedStep = ref(false);
const applyingSteps = ref([
  "Create an account",
  "Place an order",
  "Select Net 30 terms",
]);

// Hooks
onBeforeMount(async () => {
  await store.dispatch("funding/fetchFundingAccounts");
  const accounts = store.getters["funding/getFundingAccounts"];
  const vendorProviders = store.getters["funding/getVendors"];
  let currentAccount = null;
  let currentVendorSlug = route.params.provider;

  let currentAccountExist = accounts.find(
    (account) => account.funding_provider.slug === currentVendorSlug
  );

  currentAccount = currentAccountExist;

  // Set iframe data
  let vendorProvider = null;
  if (vendorProviders.length) {
    vendorProvider = vendorProviders.find(
      (vendor) => vendor.slug === currentVendorSlug
    );
  } else {
    vendorProvider = accounts.find(
      (account) => account.funding_provider.slug === currentVendorSlug
    );
    vendorProvider && (vendorProvider = vendorProvider.funding_provider);
  }

  if (vendorProvider) {
    // Set src
    const urlValid =
      /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/.test(
        vendorProvider.url
      );
    iframeData.value.src = vendorProvider.url;
    // Set src
    iframeData.value.title = vendorProvider.title;
    // Get iframe allowed from the backend
    iframeData.value.iframeEnable = vendorProvider.iframe_allowed && urlValid;
  }
  // Determine Checkpoint
  if (
    currentAccount &&
    (currentAccount.decision_received === "Undefined" ||
      currentAccount.decision_received === "False" ||
      !currentAccount.decision_received)
  ) {
    addAccountStep.value = false;
    decisionStep.value = true;
    return (approvalStep.value = false);
  } else if (
    currentAccount &&
    currentAccount.decision_received === "True" &&
    (currentAccount.approved === "False" ||
      currentAccount.approved === "Undefined")
  ) {
    addAccountStep.value = false;
    decisionStep.value = false;
    approvalStep.value = true;
    amountApprovedStep.value = false;
    return (typeStep.value = false);
  } else if (
    currentAccount &&
    currentAccount.decision_received === "True" &&
    currentAccount.approved === "True" &&
    currentAccount.funding_term === null
  ) {
    addAccountStep.value = false;
    decisionStep.value = false;
    approvalStep.value = false;
    amountApprovedStep.value = false;
    return (typeStep.value = true);
  } else if (
    currentAccount &&
    currentAccount.decision_received === "True" &&
    currentAccount.approved === "True" &&
    currentAccount.funding_term !== null &&
    currentAccount.funding_term.title !== "Prepay"
  ) {
    addAccountStep.value = false;
    decisionStep.value = false;
    approvalStep.value = false;
    typeStep.value = false;
    return (amountApprovedStep.value = true);
  } else if (
    currentAccount &&
    currentAccount.funding_term &&
    currentAccount.funding_term.title === "Prepay"
  ) {
    addAccountStep.value = false;
    decisionStep.value = false;
    approvalStep.value = false;
    typeStep.value = true;
    return (amountApprovedStep.value = false);
  }
  addAccountStep.value = true;
  decisionStep.value = false;
  typeStep.value = false;
  return (approvalStep.value = false);
});

// Methods
const addAccount = async (id) => {
  await store.dispatch("funding/addNewFundingAccount", id);
  addAccountStep.value = false;
  return (decisionStep.value = true);
};

const handleDecision = () => {
  addAccountStep.value = false;
  decisionStep.value = false;
  return (approvalStep.value = true);
};

const backToDecisionStep = () => {
  addAccountStep.value = false;
  decisionStep.value = true;
  approvalStep.value = false;
  amountApprovedStep.value = false;
};

const backToTypeStep = () => {
  addAccountStep.value = false;
  decisionStep.value = false;
  approvalStep.value = false;
  typeStep.value = true;
  amountApprovedStep.value = false;
};

const goToTypeStep = () => {
  typeStep.value = true;
  addAccountStep.value = false;
  decisionStep.value = false;
  approvalStep.value = false;
  amountApprovedStep.value = false;
};

const goToAmountStep = () => {
  addAccountStep.value = false;
  decisionStep.value = false;
  approvalStep.value = false;
  typeStep.value = false;
  amountApprovedStep.value = true;
};

const backToApprovalStep = () => {
  typeStep.value = false;
  addAccountStep.value = false;
  decisionStep.value = false;
  approvalStep.value = true;
  amountApprovedStep.value = false;
};
</script>

<!-- <BaseSidebarQuestion
  question="Did you receive a decision for your application?"
/>

<BaseSidebarMessage
  message="Update Account Details:"
  text="How this helps the user? Why should they complete this step?"
/>

<BaseSidebarMessage
  message="We recommend you wait at least 6 months before applying to this  account again. <br/>
  <p class='block my-5'>Maren.. to rewrite: </p>
  Please contact an Advisor if you would like to discuss"
/>

<BaseSidebarMessage
  message="Update Account Details:"
  text="How this helps the user? Why should they complete this step?"
/>

<BaseSidebarMessage
  text="You will be notified of the lending decision within minutes of submitting your application or, you can expect to receive a response via email in 3-4 business days. 
Please check your spam folders for the response email."
/>

<BaseSidebarInput
  label="Confirm the Month/Year you were approved:"
  value="June 2022"
/>
<BaseSidebarInput
  label="How much were you approved for?"
  value="$ 12,300"
  note="This account has a monthly minimum purchase amount of $50.00 to report."
/>

<BaseSidebarOptions
  title="What kind of account were you approved for:"
  :options="['net', 'revolving', 'prepay']"
/> -->
