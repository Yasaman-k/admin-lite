<template>
  <div
    class="relative h-screen bg-[#FAFDFF] drop-shadow-lg px-8 py-10 w-2/6 overflow-hidden"
  >
    <span
      class="absolute top-6 left-8 text-[#495A67] text-xl flex items-center gap-2 font-medium cursor-pointer"
      @click="back"
    >
      <IconLeftArrow class="text-lg" />
      Back
    </span>
    <div class="mt-12">
      <BaseSidebarOptions
        title="What kind of account were you approved for:"
        :options="options"
        @handelSelection="(e) => handelSelection(e.target.value)"
      />
    </div>
    <div class="relative">
      <BaseSidebarInput
        label="How much were you approved for?"
        :value="String(amountApproved)"
        @onInput="(e) => handleInput(e.target.value)"
        :btnDisabled="false"
        note="This account has a monthly minimum purchase amount of $50.00 to report."
        :dollarIcon="true"
        extraInputClasses="indent-3"
      />
    </div>
    <div class="absolute bottom-20 left-5">
      <BaseSidebarMessage
        :text="`The amount approved for should be stated in the response you received. Or, you can find it by logging in to your ${accountTitle} account.`"
      />
    </div>
    <button
      class="btn-primary !absolute right-4 bottom-4"
      :disabled="btnDisabled"
      @click="sendApprovedAmount"
    >
      Complete
    </button>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import BaseSidebarMessage from "./BaseSidebarMessage.vue";
import BaseSidebarInput from "./BaseSidebarInput.vue";
import BaseSidebarOptions from "./BaseSidebarOptions.vue";

const store = useStore();
const route = useRoute();
const router = useRouter();

// Refs
const currentAccount = ref(null);
const options = ref([
  { title: "NET", id: 1 },
  { title: "Revolving", id: 2 },
  { title: "Prepay", id: 3 },
]);
const accountTitle = ref("");
const type = ref("");
const amountApproved = ref("");
const btnDisabled = ref(true);

const emits = defineEmits(["goBack"]);

// Hooks
onBeforeMount(async () => {
  await store.dispatch("funding/fetchFundingAccounts");
  const accounts = store.getters["funding/getFundingAccounts"];
  let currentAccountSlug = route.params.provider;

  let currentAccountExist = accounts.find(
    (account) => account.funding_provider.slug === currentAccountSlug
  );

  currentAccount.value = currentAccountExist;

  currentAccount.value && currentAccount.value.funding_provider
    ? (accountTitle.value = currentAccount.value.funding_provider.title)
    : (accountTitle.value = "");
  amountApproved.value = currentAccount.value.amount_approved
    ? currentAccount.value.amount_approved
    : "";
});

// Methods
const handelSelection = (value) => {
  type.value = value;

  if (String(amountApproved.value).length && type.value.length) {
    return (btnDisabled.value = false);
  }
  return (btnDisabled.value = true);
};

const handleInput = (val) => {
  amountApproved.value = val;
  if (amountApproved.value.length && type.value.length) {
    return (btnDisabled.value = false);
  }
  return (btnDisabled.value = true);
};

const sendApprovedAmount = async () => {
  await store.dispatch("funding/sendAccountBasicData", {
    accountID: currentAccount.value.id,
    data: { amount_approved: parseInt(amountApproved.value) },
  });
  return router.push("/funding-manager");
};

const back = () => emits("goBack");
</script>
