<template>
  <section class="flex">
    <BaseIframeApp :data="iframeData" />
    <LogInAndVerifySidebar v-if="logInStep" @goNext="goToVerifyStep" />
    <VerifyBusinessInfoSidebar v-if="verifyStep" @goNext="goToUpdateStep" />
    <UpdateDetailsSidebar v-if="updateDetailsStep" />
  </section>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import BaseIframeApp from "./BaseIframeApp.vue";
import LogInAndVerifySidebar from "./LogInAndVerifySidebar.vue";
import VerifyBusinessInfoSidebar from "./VerifyBusinessInfoSidebar.vue";
import UpdateDetailsSidebar from "./UpdateDetailsSidebar.vue";

const store = useStore();
const route = useRoute();

// Refs
const logInStep = ref(true);
const verifyStep = ref(false);
const updateDetailsStep = ref(false);
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
  let vendorProviderAccount = accounts.find(
    (account) => account.funding_provider.slug === vendorProviderSlug
  );
  vendorProviderAccount
    ? (vendorProviderAccount = vendorProviderAccount.funding_provider)
    : (vendorProviderAccount = null);

  // Set src
  iframeData.value.src = vendorProviderAccount && vendorProviderAccount.url;
  // Set src
  iframeData.value.title = vendorProviderAccount && vendorProviderAccount.title;
  // Get iframe allowed from the backend
  iframeData.value.iframeEnable =
    vendorProviderAccount && vendorProviderAccount.iframe_allowed;
});

// Methods
const goToVerifyStep = () => {
  logInStep.value = false;
  verifyStep.value = true;
  updateDetailsStep.value = false;
};

const goToUpdateStep = () => {
  logInStep.value = false;
  verifyStep.value = false;
  updateDetailsStep.value = true;
};
</script>
