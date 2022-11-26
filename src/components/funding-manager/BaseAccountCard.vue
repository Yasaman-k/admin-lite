<template>
  <div
    :class="`account-card ${
      status === 'decision_or_approval_pending'
        ? 'before:border-gray-500'
        : status === 'payment_pending' || status === 'approved_for_prepay'
        ? 'before:border-[#FDBE2D]'
        : 'before:border-[#0CAE87]'
    }`"
  >
    <span class="amount">{{
      amountApproved && amountApproved != "null"
        ? "$ " + amountApproved
        : "$ --"
    }}</span>
    <div class="flex gap-3">
      <image
        :src="
          fundingProvider && fundingProvider.logo
            ? fundingProvider.logo
            : './images/uline.png'
        "
        class="w-[113px] h-14 z-10"
      />
      <div class="flex flex-col gap-1">
        <h3 class="text-2xl text-[#3B4C68]">
          {{ fundingProvider ? fundingProvider.title : "" }}
        </h3>
        <span class="text-[#B7C1D1]">{{
          fundingProvider ? fundingProvider.type : ""
        }}</span>
      </div>
    </div>
    <p class="text-[#3B4C68] mt-1 mb-4" v-html="CTA" />
    <div class="flex justify-between">
      <div class="flex items-center gap-3">
        <span
          class="bg-[#FAFDFF] border border-[#DCE0E7] rounded-md text-sm text-[#495A67] py-1 px-3 font-medium"
          >Equifax</span
        >
        <span
          class="bg-[#FAFDFF] border border-[#DCE0E7] rounded-md text-sm text-[#495A67] py-1 px-3 font-medium"
          >Equifax</span
        >
      </div>
      <button
        :class="`btn ${
          status === 'decision_or_approval_pending'
            ? 'bg-gray-500'
            : status === 'payment_pending' || status === 'approved_for_prepay'
            ? 'bg-[#FDBE2D]'
            : 'bg-[#0CAE87]'
        }`"
        @click="update"
      >
        Update
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="8.405"
          height="13.611"
          viewBox="0 0 8.405 13.611"
        >
          <g
            id="Icon_material-navigate-next"
            data-name="Icon material-navigate-next"
            transform="translate(-12.885 -9)"
            fill="#fff"
          >
            <path
              d="M 14.48427486419678 22.25728034973145 L 13.23835849761963 21.01137161254883 L 18.25677490234375 15.98200035095215 L 18.43297576904297 15.805419921875 L 18.25677490234375 15.62883949279785 L 13.23835849761963 10.59946823120117 L 14.48427486419678 9.353559494018555 L 20.93613433837891 15.805419921875 L 14.48427486419678 22.25728034973145 Z"
              stroke="none"
            />
            <path
              d="M 14.48427391052246 9.707098007202148 L 13.59171676635742 10.59965133666992 L 18.7861442565918 15.805419921875 L 13.59171676635742 21.01118850708008 L 14.48427391052246 21.90373992919922 L 20.58259582519531 15.805419921875 L 14.48427391052246 9.707098007202148 M 14.48427581787109 9 L 21.28969573974609 15.805419921875 L 14.48427581787109 22.61083984375 L 12.88499450683594 21.01156997680664 L 18.07980537414551 15.805419921875 L 12.88499450683594 10.59926986694336 L 14.48427581787109 9 Z"
              stroke="none"
              fill="#fff"
            />
          </g>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const props = defineProps({
  account: {
    type: Object,
    default: () => {},
  },
  amountApproved: {
    type: String,
    default: null,
  },
  fundingProvider: {
    type: Object,
    default: () => {},
  },
  status: {
    type: String,
    default: "",
  },
  slug: {
    type: String,
    default: "",
  },
});

// Data
const CTA = ref("");

// Hooks
onBeforeMount(() => {
  const account = props.account;
  if (
    account.decision_received === "Undefined" ||
    account.decision_received === false ||
    (account.decision_received === "True" && account.approved !== "True") ||
    (account.decision_received === "True" &&
      account.approved !== "True" &&
      (account.approved_at === null ||
        (account.fundingTerm === null && account.fundingTerm !== "Prepay")))
  ) {
    return (CTA.value =
      "<span class='font-bold'>Update Acc:</span> Update the status of your application, whether the account was accepted or declined.");
  } else if (account.paid_at === null || account.invoiced === "Undefined") {
    return (CTA.value =
      "<span class='font-bold'>Next Step:</span> Make a purchase, wait to be invoiced, then make a payment.");
  } else if (account.invoiced === "False") {
    return (CTA.value =
      "<span class='font-bold'>Next Step:</span> Make another purchase, wait to be invoiced, then make a payment.");
  } else if (
    account.decision_received === "True" &&
    account.approved === "True" &&
    account.approved_at !== null &&
    account.fundingTerm !== null &&
    account.fundingTerm !== "Prepay" &&
    account.paid_at !== null &&
    account.invoiced === "True"
  ) {
    return (CTA.value =
      "<span class='font-bold'>Congrats!</span> This account is improving your Trade Bureau Distribution. Make timely payments to move to the next tier.");
  } else if (account.fundingTerm === "Prepay") {
    return (CTA.value =
      "<span class='font-bold'>Credit Opportunity!</span> Make a purchase and payment, then contact the credit department to request a Net account, which will report");
  }
});
// Methods
const update = () => {
  const account = props.account;

  if (
    account.decision_received === "Undefined" ||
    account.decision_received === "False" ||
    (account.decision_received === "True" && account.approved !== "True") ||
    (account.decision_received === "True" &&
      account.approved !== "True" &&
      (account.approved_at === null ||
        (account.funding_term === null &&
          account.funding_term.title !== "Prepay"))) ||
    (account.funding_term && account.funding_term.title === "Prepay") ||
    account.amount_approved === null
  ) {
    return router.push(`/funding/provider/${props.slug}`);
  } else if (
    account.decision_received === "True" &&
    account.approved === "True" &&
    account.approved_at !== null &&
    account.funding_term !== null &&
    account.funding_term.title !== "Prepay" &&
    account.paid_at !== null &&
    account.invoiced === "True" &&
    account.address_match === false
  ) {
    return router.push(`/funding/provider/${props.slug}/verify-address`);
  } else if (
    account.decision_received === "True" &&
    account.approved === "True" &&
    account.approved_at !== null &&
    account.funding_term !== null &&
    account.funding_term.title !== "Prepay" &&
    account.paid_at !== null &&
    account.invoiced === "True"
  ) {
    return router.push(`/funding/provider/${props.slug}/completed`);
  }
  return router.push(`/funding/provider/${props.slug}/purchase-invoicing`);
};
</script>

<style scoped>
.account-card {
  @apply relative py-3 px-5 mt-5 border border-[#DCE0E7] rounded-md drop-shadow-sm overflow-hidden before:content-[""] before:absolute before:top-0 before:bottom-0 before:left-0 before:border-2;
}

.amount {
  @apply absolute -top-[1px] -right-[1px] bg-[#FAFDFF] border border-[#DCE0E7] rounded-md drop-shadow-sm px-8 py-2 text-2xl text-[#196499];
}
.btn {
  @apply text-white rounded-md flex items-center gap-3 py-[6px] px-8 drop-shadow-sm;
}
</style>
