<template>
  <div
    :class="`relative h-screen bg-[#FAFDFF] drop-shadow-lg px-8 py-10 w-2/6 overflow-hidden ${
      decisionReceived ? 'flex flex-col justify-between' : ''
    }`"
  >
    <BaseSidebarQuestion
      question="Did you receive a decision for your application?"
      @handelSelection="(e) => handleAnswer(e.target.value)"
      :answerValue="
        decisionReceived ? 'Yes' : decisionReceived === false ? 'No' : ''
      "
    />
    <BaseSidebarMessage
      v-if="decisionReceived === false"
      message="Sometimes it takes up to 3 days to get a decision from this vendor. This
    account has been added to your Funding Manager. Please update the account
    info once you get a response."
    />
    <BaseSidebarMessage
      v-if="decisionReceived"
      text="You will be notified of the lending decision within minutes of submitting your application or, you can expect to receive a response via email in 3-4 business days. 
    Please check your spam folders for the response email."
    />
    <button
      v-if="decisionReceived === false"
      class="btn-primary !absolute right-4 bottom-4"
      @click="() => router.push('/funding-manager')"
    >
      Continue
    </button>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { onBeforeMount, ref } from "vue";
import BaseSidebarQuestion from "./BaseSidebarQuestion.vue";
import BaseSidebarMessage from "./BaseSidebarMessage.vue";

const store = useStore();
const route = useRoute();
const router = useRouter();

// Emits
const emits = defineEmits(["handleDecision"]);
// Refs
const decisionReceived = ref(null);
const currentAccount = ref(null);

// Hooks
onBeforeMount(() => {
  const accounts = store.getters["funding/getFundingAccounts"];
  let currentAccountSlug = route.params.provider;

  let currentAccountExist = accounts.find(
    (account) => account.funding_provider.slug === currentAccountSlug
  );

  currentAccount.value = currentAccountExist;

  if (
    currentAccount.value &&
    currentAccount.value.decision_received === "False"
  ) {
    return (decisionReceived.value = false);
  } else if (
    currentAccount.value &&
    currentAccount.value.decision_received === "True"
  ) {
    return (decisionReceived.value = true);
  }
});

// Methods
const handleAnswer = async (value) => {
  if (currentAccount.value) {
    if (value === "Yes") {
      decisionReceived.value = "True";
      await store.dispatch("funding/sendAccountBasicData", {
        accountID: currentAccount.value.id,
        data: {
          decision_received: decisionReceived.value,
        },
      });
      return emits("handleDecision");
    }
    await store.dispatch("funding/sendAccountBasicData", {
      accountID: currentAccount.value.id,
      data: {
        decision_received: "False",
      },
    });
    return (decisionReceived.value = false);
  }
};
</script>
