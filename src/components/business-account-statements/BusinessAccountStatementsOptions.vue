<template>
  <form @submit.prevent="() => save(statements)" class="mt-10">
    <div class="grid grid-cols-2 gap-5">
      <div>
        <BaseRadioButton
          radioName="bank-statements"
          text="No Statement"
          value="No Statement"
          @select="(e) => handleVal(e)"
          :checked="statements === 'No Statement' ? true : false"
        />
      </div>
      <div>
        <BaseRadioButton
          radioName="bank-statements"
          text="Three To Five Months"
          value="Three To Five Month"
          @select="(e) => handleVal(e)"
          :checked="statements === 'Three To Five Month' ? true : false"
        />
      </div>
      <div>
        <BaseRadioButton
          radioName="bank-statements"
          text="Six Months To A Year"
          value="Six Months To A Year"
          @select="(e) => handleVal(e)"
          :checked="statements === 'Six Months To A Year' ? true : false"
        />
      </div>
      <div>
        <BaseRadioButton
          radioName="bank-statements"
          text="More Than A Year"
          value="More than a year"
          @select="(e) => handleVal(e)"
          :checked="statements === 'More than a year' ? true : false"
        />
      </div>
    </div>
    <BaseBackNextBtns :BackBtnHidden="true" :nextDisabled="nextDisable" />
  </form>
</template>

<script setup>
import { onBeforeMount, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import BaseRadioButton from "../BaseRadioButton.vue";
import BaseBackNextBtns from "../BaseBackNextBtns.vue";

const store = useStore();
const router = useRouter();

// Data
const nextDisable = ref(true);
const statements = ref("");

// Hooks
onBeforeMount(() => {
  if (statements.value.length >= 1) {
    return (nextDisable.value = false);
  }
  return (nextDisable.value = true);
});

onMounted(() => {
  const fields =
    store.getters["businessAccountStatements/getBusinessAccountStatements"];
  const statementsVal = fields.find((field) =>
    Object.prototype.hasOwnProperty.call(
      field,
      "business_bank_account_statements"
    )
  );
  statementsVal && statementsVal.business_bank_account_statements.data
    ? (statements.value =
        statementsVal.business_bank_account_statements.data.const)
    : (statements.value = "");
});

// Methods
const handleVal = (val) => {
  statements.value = val;
  statements.value = val;
  if (statements.value.length >= 1) {
    return (nextDisable.value = false);
  }
  return (nextDisable.value = true);
};

const save = async (statementsVal) => {
  await store.dispatch(
    "businessAccountStatements/sendBusinessAccountStatements",
    [
      {
        type: "business_bank_account_statements",
        value: statementsVal,
      },
    ]
  );
  await store.dispatch("aspects/fetchFinancialsStatuses", [
    "business_account_statements",
  ]);
  return router.push(
    "/fundability/financials/business-account-statements/confirmation"
  );
};
</script>
