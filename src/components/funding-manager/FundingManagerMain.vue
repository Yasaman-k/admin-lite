<template>
  <section class="relative flex justify-end overflow-hidden px-0 mx-0">
    <FoundationIncomplete v-if="incomplete" />
    <FundingManagerEmpty v-if="empty" />
    <section
      class="h-screen relative w-[60%] overflow-hidden"
      v-if="accountsSection"
    >
      <div :class="`cards ${overflow ? '' : 'after:hidden'}`" ref="cards">
        <BaseAccountCard
          v-for="account in accounts"
          :key="account.id"
          :account="account"
          :amountApproved="String(account.amount_approved)"
          :fundingProvider="account.funding_provider"
          :status="account.status"
          :slug="account.funding_provider.slug"
        />
      </div>
    </section>
    <BaseScoreSidebar
      :approvedFunding="empty || incomplete ? undefined : '5000'"
      :listedAccounts="empty || incomplete ? 0 : 7"
      :scoreLoaders="
        empty || incomplete
          ? foundationIncompleteAndEmptyScoreLoaders
          : scoreLoaders
      "
      :links="incomplete ? undefined : scoreSidebarLinks"
    />
  </section>
</template>

<script setup>
import { onBeforeMount, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import BaseAccountCard from "./BaseAccountCard.vue";
import FundingManagerEmpty from "./FundingManagerEmpty.vue";
import FoundationIncomplete from "./FoundationIncomplete.vue";
import BaseScoreSidebar from "../BaseScoreSidebar.vue";

const store = useStore();

// Data
const accountsSection = ref(false);
const empty = ref(false);
const incomplete = ref(false);
const accounts = ref([]);
const cards = ref(null);
const foundationIncompleteAndEmptyScoreLoaders = ref([
  {
    title: "Equifax",
    currentScore: "0",
    totalScore: "3",
    scorePercent: "",
    color: "#797979",
  },
  {
    title: "Experian",
    currentScore: "0",
    totalScore: "3",
    scorePercent: "",
    color: "#797979",
  },
  {
    title: "DnB",
    currentScore: "0",
    totalScore: "3",
    scorePercent: "",
    color: "#797979",
  },
  {
    title: "Revenue",
    currentScore: "",
    totalScore: "",
    scorePercent: "0%",
    color: "#797979",
  },
]);
const scoreLoaders = ref([
  {
    title: "Equifax",
    currentScore: "1",
    totalScore: "3",
    scorePercent: "",
    color: "#FFBE24",
  },
  {
    title: "Experian",
    currentScore: "3",
    totalScore: "3",
    scorePercent: "",
    color: "#0CAE87",
  },
  {
    title: "DnB",
    currentScore: "1",
    totalScore: "3",
    scorePercent: "",
    color: "#FFBE24",
  },
  {
    title: "Revenue",
    currentScore: "",
    totalScore: "",
    scorePercent: "11%",
    color: "#0CAE87",
  },
]);
const scoreSidebarLinks = ref([
  { name: "Add Existing Accounts", to: "/" },
  {
    name: "Accounts Not Approved",
    to: "/funding-manager/accounts-not-approved",
  },
]);
const overflow = ref(false);

// Hooks
onBeforeMount(async () => {
  await store.dispatch("funding/fetchFundingAccounts");
  // Check incomplete
  const foundationPillars = store.getters["aspects/getFoundationStatuses"];
  const notGreenOrYellow = foundationPillars.find((pillar) => {
    const status = Object.values(pillar)[0];
    return status != "POSITIVE" && status != "CAUTION";
  });

  if (notGreenOrYellow) {
    return (incomplete.value = true);
  }
  incomplete.value = false;
  // Check if there are no accounts
  accounts.value = store.getters["funding/getFundingAccounts"];
  if (!accounts.value.length) {
    accountsSection.value = false;
    return (empty.value = true);
  }
  accountsSection.value = true;
  return (empty.value = false);
});

onMounted(() => {
  if (cards.value && cards.value.clientHeight < cards.value.scrollHeight) {
    return (overflow.value = true);
  }
  return (overflow.value = false);
});

watch(store.state, (newState) => {
  // Check incomplete
  const foundationPillars = newState.aspects.foundationStatuses;
  const notGreenOrYellow = foundationPillars.find((pillar) => {
    const status = Object.values(pillar)[0];
    return status != "POSITIVE" && status != "CAUTION";
  });
  if (notGreenOrYellow) {
    return (incomplete.value = true);
  }
  incomplete.value = false;
  // Check Accounts
  accounts.value = newState.funding.fundingAccounts;
  if (!accounts.value.length) {
    empty.value = true;
    return (accountsSection.value = false);
  }
  empty.value = false;
  accountsSection.value = true;

  // Check Overflow
  if (cards.value && cards.value.clientHeight < cards.value.scrollHeight) {
    return (overflow.value = true);
  }
  overflow.value = false;
});
</script>

<style scoped>
.cards {
  @apply h-full overflow-auto px-4 pb-14 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-14 after:bg-white;
}
.cards::after {
  box-shadow: 0 0 10px 0px #0000003b;
}
</style>
