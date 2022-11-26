<template>
  <section class="container my-16 px-20">
    <FormHeader
      formTitle="Business Financials"
      icon="Location"
      linkText="How many years and/or months can you provide financial statements for?"
    />
    <form @submit.prevent="onSubmit" class="mt-10">
      <div class="grid grid-cols-2 gap-5">
        <div>
          <BaseRadioButton
            radioName="financials-statements"
            text="Less Than A Year"
            value="Less Than A Year"
            @select="(e) => handleVal(e)"
            :checked="
              statementsTermsValue === 'Less Than A Year' ? true : false
            "
          />
        </div>
        <div>
          <BaseRadioButton
            radioName="financials-statements"
            text="Between 1 And 2 Years"
            value="Between 1 and 2 Years"
            @select="(e) => handleVal(e)"
            :checked="
              statementsTermsValue === 'Between 1 and 2 Years' ? true : false
            "
          />
        </div>
        <div>
          <BaseRadioButton
            radioName="financials-statements"
            text="Between 2 And 3 Years"
            value="Between 2 and 3 Years"
            @select="(e) => handleVal(e)"
            :checked="
              statementsTermsValue === 'Between 2 and 3 Years' ? true : false
            "
          />
        </div>
        <div>
          <BaseRadioButton
            radioName="financials-statements"
            text="More Than Three Years"
            value="More Than Three Years"
            @select="(e) => handleVal(e)"
            :checked="
              statementsTermsValue === 'More Than Three Years' ? true : false
            "
          />
        </div>
      </div>
      <BaseBackNextBtns :BackBtnHidden="true" :nextDisabled="nextDisable" />
    </form>
  </section>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import BaseRadioButton from "../BaseRadioButton.vue";
import BaseBackNextBtns from "../BaseBackNextBtns.vue";
import FormHeader from "../FormHeader.vue";

const store = useStore();
const router = useRouter();

// Data
const nextDisable = ref(true);
const statementsTermsValue = ref("");

// Hooks
onBeforeMount(() => {
  const statementsTerms =
    store.getters["financialStatement/getStatementsTerms"];
  if (statementsTerms.length) {
    statementsTermsValue.value =
      statementsTerms[0].financial_statements_terms.data.const;
    return (nextDisable.value = false);
  }
  statementsTermsValue.value = "";
});

// Methods
const handleVal = (val) => {
  statementsTermsValue.value = val;
  nextDisable.value = false;
};

const onSubmit = async () => {
  await store.dispatch(
    "financialStatement/sendFinancialStatementProvidedTime",
    [
      {
        type: "financial_statements_terms",
        value: statementsTermsValue.value,
      },
    ]
  );
  await store.dispatch("aspects/fetchFinancialsStatuses", [
    "financial_statement",
  ]);
  return router.push(
    "/fundability/financials/financial-statements/upload-statement"
  );
};
</script>
