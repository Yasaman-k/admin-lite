<template>
  <section class="container my-16 px-20">
    <FormHeader linkText="What tax year did you last file for?" />
    <div class="mt-4">
      <p class="text-[#061017] mb-2">Enter last tax year filed.</p>
      <BaseInput
        @input="(e) => maskDate(e.target)"
        length="4"
        :value="date"
        placeholder="2021"
        label="Financial Year"
        :required="true"
        errorMessage="Financial Year is required."
        class="mt-4"
      />
    </div>
    <FormHeader linkText="What’s your business’ industry?" class="mt-20" />
    <div class="mt-4">
      <p class="text-[#061017] mb-5">
        Select the industry that best represents your business.
      </p>
      <BaseSelect
        @selected="(e) => (industry = e)"
        :value="industry.title"
        :dropdowns="industries"
        label="Business Industry"
        errorMessage="Business Industry is required"
      />
    </div>
    <FormHeader linkText="Filing Status" class="mt-20" />
    <div class="mt-4">
      <label class="custom-radio">
        <input
          type="radio"
          name="filing-status"
          value="Filed Profit"
          class="relative appearance-none"
          :checked="filingStatus === 'Filed Profit'"
          @change="(e) => onChange(e.target.value)"
        />
        <span class="check-circle"></span>
        Filed Profit
      </label>
      <label class="custom-radio">
        <input
          type="radio"
          name="filing-status"
          value="Filed Loss"
          class="relative appearance-none"
          :checked="filingStatus === 'Filed Loss'"
          @change="(e) => onChange(e.target.value)"
        />
        <span class="check-circle"></span>
        Filed Loss
      </label>
    </div>
    <BaseBackNextBtns :nextDisabled="nextDisable" @next="next" />
  </section>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { onBeforeMount, onMounted, onUpdated } from "@vue/runtime-core";
import { useStore } from "vuex";
import FormHeader from "../FormHeader.vue";
import BaseInput from "../BaseInput.vue";
import BaseBackNextBtns from "../BaseBackNextBtns.vue";
import BaseSelect from "../BaseSelect.vue";

const store = useStore();
const router = useRouter();
const nextDisable = ref(true);
const date = ref("");
const industry = ref({
  title: "",
  value: "",
});
const industries = ref([]);
const filingStatus = ref("");

// Hooks
onBeforeMount(async () => {
  industries.value = store.getters["businessTaxReturns/getIndustries"];
  industries.value.length && (industries.value = industries.value[0].values);
  const fields =
    store.getters["businessTaxReturns/getBusinessTaxReturnsFields"];
  if (!fields.length) {
    await store.dispatch("businessTaxReturns/fetchBusinessTaxReturnsFields");
  }

  if (fields.length) {
    // Get Date
    date.value = fields.find((field) =>
      Object.prototype.hasOwnProperty.call(
        field,
        "business_tax_return_year_last_filed_at"
      )
    );
    date.value && date.value.business_tax_return_year_last_filed_at.data
      ? (date.value = date.value.business_tax_return_year_last_filed_at.data)
      : (date.value = "");

    // Get Industry
    industry.value = fields.find((field) =>
      Object.prototype.hasOwnProperty.call(field, "business_industry")
    );
    industry.value && industry.value.business_industry.data
      ? (industry.value = industry.value.business_industry.data)
      : (industry.value = { title: "" });

    // Get Filing Status
    filingStatus.value = fields.find((field) =>
      Object.prototype.hasOwnProperty.call(
        field,
        "business_tax_return_filing_status"
      )
    );
    filingStatus.value &&
    filingStatus.value.business_tax_return_filing_status.data
      ? (filingStatus.value =
          filingStatus.value.business_tax_return_filing_status.data.const)
      : (filingStatus.value = "");
  }
});

onMounted(() => {
  if (
    date.value.length === 4 &&
    filingStatus.value.length &&
    industry.value.title.length
  ) {
    return (nextDisable.value = false);
  }
  nextDisable.value = true;
});

onUpdated(() => {
  if (
    date.value.length === 4 &&
    filingStatus.value.length &&
    industry.value.title.length
  ) {
    return (nextDisable.value = false);
  }
  nextDisable.value = true;
});

// Methods
const maskDate = (input) => {
  if (/^-?\d*$/.test(input.value)) {
    input.oldValue = input.value;
    date.value = input.value;
    input.oldSelectionStart = input.selectionStart;
    input.oldSelectionEnd = input.selectionEnd;
    // eslint-disable-next-line no-prototype-builtins
  } else if (input.hasOwnProperty("oldValue")) {
    input.value = input.oldValue;
    date.value = input.oldValue;
    input.setSelectionRange(input.oldSelectionStart, input.oldSelectionEnd);
  } else {
    input.value = "";
    date.value = "";
  }
};

const onChange = (val) => {
  filingStatus.value = val;
  if (
    date.value.length === 4 &&
    filingStatus.value.length &&
    industry.value.title.length
  ) {
    return (nextDisable.value = false);
  }
  return (nextDisable.value = true);
};

const next = async () => {
  await store.dispatch("businessTaxReturns/sendBusinessTaxReturnsFields", [
    {
      type: "business_tax_return_year_last_filed_at",
      value: date.value,
    },
    {
      type: "business_industry",
      value: industry.value.title,
    },
    {
      type: "business_tax_return_filing_status",
      value: filingStatus.value,
    },
  ]);
  await store.dispatch("aspects/fetchFinancialsStatuses", [
    "business_tax_returns",
  ]);
  return router.push("/fundability/financials/business-tax/confirmation");
};
</script>

<style scoped>
.custom-radio {
  @apply cursor-pointer relative ml-8 mr-10 text-[#061017];
}

.custom-radio input {
  @apply before:content-[''] before:absolute before:-left-7 before:-top-[1.1rem] before:block before:w-6 before:h-6 before:border-2 before:border-[#495A67] before:rounded-full before:p-2 before:cursor-pointer;
}

.custom-radio input:checked + .check-circle {
  @apply bg-[#495A67] absolute -left-6 top-[1px] block w-4 h-4 rounded-full;
}
</style>
