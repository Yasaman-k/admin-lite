<template>
  <div
    class="relative h-screen bg-[#FAFDFF] drop-shadow-lg px-8 pt-2 w-2/6 overflow-hidden"
  >
    <div class="h-full overflow-auto">
      <span
        class="absolute top-1 left-8 text-[#495A67] text-xl flex items-center gap-2 font-medium cursor-pointer w-full py-5 bg-[#FAFDFF]"
        @click="back"
      >
        <IconLeftArrow />
        Back
      </span>
      <BaseSidebarMessage
        class="mt-20"
        message="Log in, then verify your information"
        :text="`
        <p class='block mb-3'>
          The most common reason accounts do not report is because the business information for the account is not an exact match to what’s on file with the Secretary Of State, IRS, Bank, etc…
        </p>
        <p>
          NOTE: Because you verified your information matches with the S.O.S. ahead of time, this account should report properly.
        </p>
        <span class='block my-3'>Here’s your last verification step:</span>
        <p class='mb-20'>
          Login to ${account.funding_provider.title}. Once logged in, click the “Logged In” button below. The business information you’ve previously verified with Secretary of State will load automatically, making it super quick and simple to ensure the proper details are documented across all your accounts, in addition to what we have stored in your Fundability Foundation.
        </p>`"
      />
      <button class="btn-primary !px-10 !fixed right-4 bottom-4" @click="next">
        Logged In
      </button>
    </div>
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
