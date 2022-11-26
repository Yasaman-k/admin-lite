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
        :value="typeID"
        @handelSelection="(e) => handelSelection(e.target.value)"
      />
    </div>
    <BaseSidebarMessage
      :text="`The account type should be stated in the response you received. Or, you can find it by logging in to your ${accountTitle} account.`"
      class="absolute bottom-20 left-5"
    />
    <button
      class="btn-primary !absolute right-4 bottom-4"
      :disabled="typeBtnDisabled"
      @click="nextStep"
    >
      Complete
    </button>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import BaseSidebarMessage from "./BaseSidebarMessage.vue";
import IconLeftArrow from "../Icon/IconLeftArrow.vue";
import BaseSidebarOptions from "./BaseSidebarOptions.vue";

const store = useStore();
const route = useRoute();
const router = useRouter();

// Refs
const currentAccount = ref(null);
const options = ref([
  {
    id: 1,
    title: "Prepay",
  },
  {
    id: 2,
    title: "Net 30",
  },
  {
    id: 3,
    title: "Net 60",
  },
  {
    id: 4,
    title: "Net 90",
  },
  {
    id: 5,
    title: "Revolving",
  },
  {
    id: 6,
    title: "Loan",
  },
]);
const typeID = ref("");
const typeBtnDisabled = ref(true);
const accountTitle = ref("");
const emits = defineEmits(["goBack", "goNext"]);

// Hooks
onBeforeMount(() => {
  const accounts = store.getters["funding/getFundingAccounts"];
  let currentAccountSlug = route.params.provider;

  let currentAccountExist = accounts.find(
    (account) => account.funding_provider.slug === currentAccountSlug
  );

  currentAccountExist
    ? (currentAccount.value = currentAccountExist)
    : (currentAccount.value = null);

  currentAccount.value && currentAccount.value.funding_provider
    ? (accountTitle.value = currentAccount.value.funding_provider.title)
    : (accountTitle.value = "");

  if (currentAccount.value && currentAccount.value.funding_term) {
    typeID.value = currentAccount.value.funding_term_id;
    typeBtnDisabled.value = false;
  }
});

// Methods
const handelSelection = (value) => {
  typeID.value = value;
  typeBtnDisabled.value = false;
};

const nextStep = async () => {
  await store.dispatch("funding/sendAccountType", {
    accountID: currentAccount.value.id,
    term: typeID.value,
  });
  if (typeID.value == 1) {
    return router.push("/funding-manager");
  }
  emits("goNext");
};

const back = () => emits("goBack");
</script>
