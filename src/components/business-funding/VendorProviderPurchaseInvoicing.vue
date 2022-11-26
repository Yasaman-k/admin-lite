<template>
  <section class="flex">
    <BaseIframeApp :data="iframeData" />
    <LoggedInSidebar v-if="loggedInStep" @goNext="goToLastPaymentStep" />
    <LastPaymentSidebar v-if="lastPaymentStep" @goBack="backToLoggedInStep" />
  </section>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import BaseIframeApp from "./BaseIframeApp.vue";
import LoggedInSidebar from "./LoggedInSidebar.vue";
import LastPaymentSidebar from "./LastPaymentSidebar.vue";

const store = useStore();
const route = useRoute();

// Refs
const loggedInStep = ref(true);
const lastPaymentStep = ref(false);
const iframeData = ref({
  src: "",
  title: "",
  iframeEnable: false,
});

// Hooks
onBeforeMount(async () => {
  let accounts = store.getters["funding/getFundingAccounts"];
  if (!accounts.length) {
    await store.dispatch("funding/fetchFundingAccounts");
  }
  const vendorProviderSlug = route.params.provider;
  let vendorProviderAccount = null;
  const account = accounts.find(
    (account) => account.funding_provider.slug === vendorProviderSlug
  );

  vendorProviderAccount
    ? (vendorProviderAccount = account.funding_provider)
    : (vendorProviderAccount = null);

  // Set src
  iframeData.value.src = vendorProviderAccount && vendorProviderAccount.url;
  // Set src
  iframeData.value.title = vendorProviderAccount && vendorProviderAccount.title;
  // Get iframe allowed from the backend
  iframeData.value.iframeEnable =
    vendorProviderAccount && vendorProviderAccount.iframe_allowed;

  if (account.paid_at && account.invoiced === "False") {
    loggedInStep.value = false;
    lastPaymentStep.value = true;
  }
});

// Methods
const goToLastPaymentStep = () => {
  loggedInStep.value = false;
  lastPaymentStep.value = true;
};

const backToLoggedInStep = () => {
  loggedInStep.value = true;
  lastPaymentStep.value = false;
};
</script>
