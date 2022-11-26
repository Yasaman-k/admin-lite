<template>
  <div
    :class="`relative h-screen bg-[#FAFDFF] drop-shadow-lg px-8 py-10 w-2/6 overflow-hidden ${
      accountApproved ? 'flex flex-col justify-between' : ''
    }`"
  >
    <span
      class="absolute top-6 left-8 text-[#495A67] text-xl flex items-center gap-2 font-medium cursor-pointer"
      @click="back"
    >
      <IconLeftArrow class="text-lg" />
      Back
    </span>
    <BaseSidebarQuestion
      v-if="!dateStep"
      class="mt-12"
      question="Was your application approved?"
      :answerValue="approvedAnswer"
      @handelSelection="(e) => handleSelection(e.target.value)"
    />
    <BaseSidebarMessage
      v-if="approvedAnswer === 'No'"
      message="We recommend you wait at least 6 months before applying to this  account again. <br/>
              <p class='block my-5'>Maren.. to rewrite: </p>
              Please contact an Advisor if you would like to discuss"
    />
    <BaseSidebarMessage
      v-if="!dateStep"
      text="You will be notified of the lending decision within minutes of submitting your application or, you can expect to receive a response via email in 3-4 business days. 
      Please check your spam folders for the response email."
    />
    <!-- Confirmation Date -->
    <BaseSidebarInput
      v-if="dateStep"
      label="Confirm the Month/Year you were approved:"
      :value="date"
      maxLength="7"
      @onInput="
        (e) => {
          dateValid = true;
          maskDate(e.target);
        }
      "
      @onBlur="(val) => blur(val)"
      @onFocus="focus"
      :error="!dateValid"
      :errorMessage="validMessage"
      class="mt-12"
    />
    <button
      v-if="dateStep || accountApproved === false"
      class="btn-primary !absolute right-4 bottom-4"
      @click="sendData"
      :disabled="btnDisabled"
    >
      Continue
    </button>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import moment from "moment";
import BaseSidebarQuestion from "./BaseSidebarQuestion.vue";
import BaseSidebarMessage from "./BaseSidebarMessage.vue";
import IconLeftArrow from "../Icon/IconLeftArrow.vue";
import BaseSidebarInput from "./BaseSidebarInput.vue";

const store = useStore();
const route = useRoute();
const router = useRouter();

// Emits
const emits = defineEmits(["handleApproval", "goBack", "goNext"]);

// Refs
const currentAccount = ref(null);
const approvedAnswer = ref("");
const accountApproved = ref(null);
const dateStep = ref(false);
const date = ref("MM/ YYYY");
const dateValid = ref(true);
const validMessage = ref("");
const btnDisabled = ref(true);

// Hooks
onBeforeMount(() => {
  const accounts = store.getters["funding/getFundingAccounts"];
  let currentAccountSlug = route.params.provider;

  let currentAccountExist = accounts.find(
    (account) => account.funding_provider.slug === currentAccountSlug
  );

  currentAccount.value = currentAccountExist;

  if (currentAccount.value && currentAccount.value.approved === "False") {
    accountApproved.value = false;
    approvedAnswer.value = "No";
  } else if (currentAccount.value && currentAccount.value.approved === "True") {
    date.value = moment(currentAccount.value.approved_at).format("MMM YYYY");
    approvedAnswer.value = "Yes";
    btnDisabled.value = false;
  }
});

// Methods
const focus = () => {
  if (date.value === "MM/ YYYY" || date.value === "Invalid date") {
    date.value = "";
  }
  if (moment(date.value, "MMM YYYY", "en").isValid()) {
    date.value = moment(date.value).format("MM/YYYY");
  }
};

const maskDate = (input) => {
  const val = input.value;
  if (/[0-9\\.\\/\\/]\d*$/.test(val) || !val.length) {
    const newVal = val.replace(/\D/g, "").match(/(\d{0,2})(\d{0,4})/);
    const newDate = !newVal[2]
      ? newVal[1]
      : newVal[1] + (newVal[2] ? "/" + newVal[2] : "");
    input.oldValue = newDate;
    date.value = newDate;
    input.oldSelectionStart = input.selectionStart;
    input.oldSelectionEnd = input.selectionEnd;
    // eslint-disable-next-line no-prototype-builtins
  } else if (input.hasOwnProperty("oldValue") && val.length > 1) {
    input.value = input.oldValue;
    date.value = input.oldValue;
    input.setSelectionRange(input.oldSelectionStart, input.oldSelectionEnd);
  } else {
    input.value = "";
    date.value = "";
  }
  /\d{2}\/\d{4}/.test(val) && moment(val, "MM/YYYY", "en").isValid()
    ? (btnDisabled.value = false)
    : (btnDisabled.value = true);
};

const blur = (val) => {
  if (val.length === 0) {
    dateValid.value = false;
    return (validMessage.value = "Date is required.");
  } else if (
    /\d{2}\/\d{4}/.test(val) &&
    moment(val, "MM/YYYY", "en").isValid()
  ) {
    dateValid.value = true;
    date.value = moment(val, "MM/YYYY", "en").format("MMM YYYY");
    return (btnDisabled.value = false);
  } else if (!moment(val, "MM/YYYY", "en").isValid()) {
    dateValid.value = false;
    validMessage.value = "Date is invalid.";
    return (btnDisabled.value = true);
  }
  date.value = moment(val, "MM/YYYY", "en").format("MMM YYYY");
  dateValid.value = true;
  validMessage.value = "";
  return (btnDisabled.value = true);
};

const handleSelection = (value) => {
  if (value === "Yes") {
    accountApproved.value = true;
    approvedAnswer.value = "Yes";
    dateStep.value = true;
    if (!date.value.length) {
      btnDisabled.value = true;
    }
    return emits("handleApproval");
  }
  accountApproved.value = false;
  approvedAnswer.value = "No";
  return (btnDisabled.value = false);
};

// confirmed_at
const sendData = async () => {
  if (approvedAnswer.value === "Yes") {
    await store.dispatch("funding/sendAccountBasicData", {
      accountID: currentAccount.value.id,
      data: {
        approved: "True",
        approved_at: moment(date.value).format("DD/MM/YYYY hh:mm:ss", true),
      },
    });
    return emits("goNext");
  }
  await store.dispatch("funding/sendAccountBasicData", {
    accountID: currentAccount.value.id,
    data: {
      approved: "False",
    },
  });
  router.push("/funding-manager");
};

const back = () => {
  if (dateStep.value) {
    accountApproved.value = true;
    approvedAnswer.value = "Yes";
    return (dateStep.value = false);
  }
  emits("goBack");
};
</script>
