<template>
  <div
    class="relative h-screen bg-[#FAFDFF] drop-shadow-lg px-8 pt-2 w-2/6 overflow-hidden"
  >
    <span
      class="absolute top-6 left-8 text-[#495A67] text-xl flex items-center gap-2 font-medium cursor-pointer"
      @click="back"
    >
      <IconLeftArrow />
      Back
    </span>
    <BaseSidebarMessage
      class="mt-20"
      message="Login then, update your purchase and payment info in Funding Manager"
      :text="`Locate the dates of your last purchase and last payment in your ${account.funding_provider.title} account.`"
    />
    <button class="btn-primary !px-10 !absolute right-4 bottom-4" @click="next">
      Logged In
    </button>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import IconLeftArrow from "../Icon/IconLeftArrow.vue";
import BaseSidebarMessage from "./BaseSidebarMessage.vue";

const store = useStore();
const route = useRoute();
const router = useRouter();

const emits = defineEmits(["goNext"]);
// Data
const account = ref("");

// Hooks
onBeforeMount(() => {
  const accounts = store.getters["funding/getFundingAccounts"];
  const vendorProviderSlug = route.params.provider;
  let vendorProviderAccount = accounts.find(
    (account) => account.funding_provider.slug === vendorProviderSlug
  );

  account.value = vendorProviderAccount;
});

// Methods
const back = () => router.push("/funding-manager");

const next = () => emits("goNext");
</script>
