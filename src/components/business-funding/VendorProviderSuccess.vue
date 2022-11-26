<template>
  <section class="flex">
    <BaseIframeApp :data="iframeData" />
    <div
      class="relative h-screen bg-[#FAFDFF] drop-shadow-lg px-8 pt-2 w-2/6 overflow-hidden flex justify-center items-center"
    >
      <p class="text-[#196499] text-[25px] font-semibold">
        Your account is now reporting
      </p>
    </div>
  </section>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import BaseIframeApp from "./BaseIframeApp.vue";

const store = useStore();
const route = useRoute();

// Refs
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
</script>
