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
    <div class="mt-20">
      <BaseSidebarInput
        label="When was the date of your last payment?"
        :value="lastPayment"
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
      />
    </div>
    <BaseSidebarQuestion
      v-if="waitQuestionStep"
      question="Did you wait to be invoiced before making the above payment?"
      @handelSelection="(e) => handleSelection(e)"
      :answerValue="waitQuestionAnswer ? waitQuestionAnswer : ''"
    />
    <div class="mt-5">
      <BaseSidebarMessage
        v-if="waitQuestionAnswer === 'No' && waitQuestionStep"
        text="When you make purchases, be sure to wait for the invoice before making a payment. Not waiting for the invoice to be generated will result in payments that do not report."
      />
    </div>
    <div class="absolute bottom-20 left-8">
      <BaseSidebarMessage
        :text="`You can track your last payment by logging in to your ${account.funding_provider.title} account.`"
      />
    </div>
    <button
      class="btn-primary !px-10 !absolute right-4 bottom-4"
      :disabled="btnDisabled"
      @click="complete"
    >
      Complete
    </button>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import moment from "moment";
import BaseSidebarQuestion from "./BaseSidebarQuestion.vue";
import IconLeftArrow from "../Icon/IconLeftArrow.vue";
import BaseSidebarMessage from "./BaseSidebarMessage.vue";
import BaseSidebarInput from "./BaseSidebarInput.vue";

const store = useStore();
const router = useRouter();
const route = useRoute();

// Data
const account = ref(null);
const lastPayment = ref("MM/ YYYY");
const waitQuestionStep = ref(false);
const waitQuestionAnswer = ref(false);
const dateValid = ref(true);
const validMessage = ref("");
const btnDisabled = ref(true);

// Emits
const emits = defineEmits(["goBack"]);

// Hooks
onBeforeMount(() => {
  const accounts = store.getters["funding/getFundingAccounts"];
  const vendorProviderSlug = route.params.provider;
  let vendorProviderAccount = accounts.find(
    (account) => account.funding_provider.slug === vendorProviderSlug
  );

  account.value = vendorProviderAccount;
  if (
    account.value.paid_at != undefined &&
    moment(account.value.paid_at).isValid()
  ) {
    lastPayment.value = moment(account.value.paid_at).format("MMMM, YYYY");
    waitQuestionStep.value = true;
  }
  if (moment(account.value.paid_at).isValid() && account.value.invoiced) {
    waitQuestionAnswer.value = account.value.invoiced === "True" ? "Yes" : "No";
    btnDisabled.value = false;
  }
});

// Methods
const focus = () => {
  const val = lastPayment.value;
  if (val === "MM/ YYYY") {
    lastPayment.value = "";
  }

  if (moment(val, "MMMM, YYYY", true).isValid()) {
    waitQuestionStep.value = true;
    lastPayment.value = moment(val).format("MM/YYYY");
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
    lastPayment.value = newDate;
    input.oldSelectionStart = input.selectionStart;
    input.oldSelectionEnd = input.selectionEnd;
    // eslint-disable-next-line no-prototype-builtins
  } else if (input.hasOwnProperty("oldValue") && val.length > 1) {
    input.value = input.oldValue;
    lastPayment.value = input.oldValue;
    input.setSelectionRange(input.oldSelectionStart, input.oldSelectionEnd);
  } else {
    input.value = "";
    lastPayment.value = "";
  }

  if (/\d{2}\/\d{4}/.test(val) && moment(val, "MM/YYYY", "en").isValid()) {
    waitQuestionAnswer.value.length
      ? (btnDisabled.value = false)
      : (btnDisabled.value = true);
    return (waitQuestionStep.value = true);
  }
  btnDisabled.value = true;
  waitQuestionStep.value = false;
};

const blur = (val) => {
  if (val.length === 0) {
    btnDisabled.value = true;
    waitQuestionStep.value = false;
    dateValid.value = false;
    return (validMessage.value = "Date is required.");
  } else if (!moment(val, "MM/YYYY", "en").isValid()) {
    waitQuestionStep.value = false;
    dateValid.value = false;
    validMessage.value = "Date is invalid.";
    return (btnDisabled.value = true);
  } else if (
    (/\d{2}\/\d{4}/.test(val) && moment(val, "MM/YYYY", "en").isValid()) ||
    moment(val, "MMMM, YYYY", "en").isValid()
  ) {
    dateValid.value = true;
    lastPayment.value = moment(val, "MM/YYYY", "en").format("MMMM, YYYY");
    waitQuestionAnswer.value.length
      ? (btnDisabled.value = false)
      : (btnDisabled.value = true);
    btnDisabled.value = true;
    return (waitQuestionStep.value = true);
  }
  lastPayment.value = moment(val, "MM/YYYY", "en").format("MMMM YYYY");
  btnDisabled.value = true;
  dateValid.value = true;
  validMessage.value = "";
  return (waitQuestionStep.value = true);
};

const handleSelection = (e) => {
  waitQuestionAnswer.value = e.target.value;
  btnDisabled.value = false;
};

const complete = async () => {
  const lastPaymentDate = moment(lastPayment.value, "MMMM/YYYY", "en").format(
    "DD/MM/YYYY hh:mm:ss"
  );

  await store.dispatch("funding/sendAccountBasicData", {
    accountID: account.value.id,
    data: {
      paid_at: lastPaymentDate,
      invoiced: waitQuestionAnswer.value === "Yes" ? "True" : "False",
    },
  });
  return router.push("/funding-manager");
};

const back = () => emits("goBack");
</script>
