<template>
  <section class="container my-16 px-20">
    <FormHeader
      formTitle="Collateral confirmation"
      icon="CommercialAddress"
      linkText="Other forms of available collateral are recorded as follows:"
      desc="Click “Update Collateral” to make changes."
    />
    <BaseInput
      v-if="accountValue.length"
      :value="`$ ${accountValue}`"
      label="Recurring Accounts Receivable"
      class="mt-7"
      :disabled="true"
      placeholder=""
      :editDelete="true"
      editLink="/fundability/financials/business-collateral/account-recurring"
    />
    <div v-if="titledEquipmentFields.length">
      <TitledEquipmentMultipleInput
        v-for="titledEquipmentField in titledEquipmentFields"
        :key="String(titledEquipmentField.id)"
        :id="String(titledEquipmentField.id)"
        :titledEquipmentYear="
          titledEquipmentField.year ? String(titledEquipmentField.year) : ''
        "
        :makeValue="titledEquipmentField.make ? titledEquipmentField.make : ''"
        :modelValue="
          titledEquipmentField.model ? titledEquipmentField.model : ''
        "
        :estimatedValue="
          titledEquipmentField.value ? String(titledEquipmentField.value) : ''
        "
        :completePage="true"
        label="Titled Equipment"
        :disabled="true"
        placeholder="YYYY"
        class="mt-7"
      />
    </div>
    <BaseInput
      v-if="realEstateValue.length"
      :value="`$ ${realEstateValue}`"
      label="Commercial Real Estate"
      class="mt-7"
      :disabled="true"
      placeholder=""
      :editDelete="true"
      editLink="/fundability/financials/business-collateral/real-estate"
    />
    <BaseInput
      v-if="total401Value.length"
      :value="`$ ${total401Value}`"
      label="401k"
      class="mt-7"
      :disabled="true"
      placeholder=""
      :editDelete="true"
      editLink="/fundability/financials/business-collateral/401k"
    />
    <div
      class="mt-7 relative before-border"
      v-if="hasSecuritiesAccounts === 'Yes' && securitiesAccountsValue.length"
    >
      <span class="absolute top-5 left-5 font-medium text-[#061017] z-10">
        Contributing
      </span>
      <BaseInput
        inputExtraClasses="indent-48"
        :value="`$ ${securitiesAccountsValue}`"
        label="Securities Account"
        :disabled="true"
        placeholder=""
        :editDelete="true"
        editLink="/fundability/financials/business-collateral/securities-accounts"
      />
    </div>
    <BaseInput
      v-if="hasSecuritiesAccounts === 'Yes' && !securitiesAccountsValue.length"
      value="Contributing"
      label="Securities Account"
      class="mt-7"
      :disabled="true"
      placeholder=""
      :editDelete="true"
      editLink="/fundability/financials/business-collateral/securities-accounts"
    />
    <BaseInput
      v-if="totalCombinedValue.length && typesOfCollateral.length"
      :value="`$ ${totalCombinedValue}`"
      :label="`Other: ${typesOfCollateral}`"
      class="mt-7"
      :disabled="true"
      placeholder=""
      :editDelete="true"
      editLink="/fundability/financials/business-collateral/other"
    />
    <BaseUpdateNextBtns
      updateLabel="Update Collateral"
      updateLink="/fundability/financials/business-collateral/account-recurring"
      nextLabel="Personal Tax Returns"
      nextLink="/fundability/financials/personal-tax"
    />
  </section>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { onBeforeMount } from "@vue/runtime-core";
import { useStore } from "vuex";
import FormHeader from "../FormHeader.vue";
import TitledEquipmentMultipleInput from "./TitledEquipmentMultipleInput.vue";
import BaseInput from "../BaseInput.vue";
import BaseUpdateNextBtns from "../BaseUpdateNextBtns.vue";

const store = useStore();
const titledEquipmentFields = ref([]);
const realEstateValue = ref("");
const total401Value = ref("");
const securitiesAccountsValue = ref("");
const hasSecuritiesAccounts = ref("");
const typesOfCollateral = ref("");
const totalCombinedValue = ref("");
const accountValue = ref("");

// Hooks
onBeforeMount(() => {
  const statements = store.getters["businessCollateral/getStatements"];
  const collateralFields =
    store.getters["businessCollateral/getCollateralFields"];
  const equipments = store.getters["businessCollateral/getEquipment"];
  let realStateValue = "";
  let totalCombined = "";
  let collateralTypes = "";
  let combinedValue = "";
  let receivableAccountsValue = "";
  if (equipments.length) {
    titledEquipmentFields.value = equipments;
  }
  if (collateralFields.length) {
    // Get real estate value
    realStateValue = collateralFields.find((field) =>
      Object.prototype.hasOwnProperty.call(
        field,
        "commercial_real_estate_value"
      )
    );
    realStateValue &&
      realStateValue.commercial_real_estate_value &&
      realStateValue.commercial_real_estate_value.data &&
      (realStateValue = realStateValue.commercial_real_estate_value.data);

    realEstateValue.value = realStateValue;
    // Get 401ks
    totalCombined = collateralFields.find((field) =>
      Object.prototype.hasOwnProperty.call(field, "401ks_value")
    );

    totalCombined &&
      totalCombined["401ks_value"] &&
      totalCombined["401ks_value"].data &&
      (totalCombined = totalCombined["401ks_value"].data);
    total401Value.value = totalCombined;

    // Get Securities
    if (statements.length) {
      hasSecuritiesAccounts.value = statements.find((field) =>
        Object.prototype.hasOwnProperty.call(field, "has_securities_accounts")
      );

      if (hasSecuritiesAccounts.value) {
        hasSecuritiesAccounts.value.has_securities_accounts.value
          ? (hasSecuritiesAccounts.value = "Yes")
          : hasSecuritiesAccounts.value.has_securities_accounts.value === false
          ? (hasSecuritiesAccounts.value = "No")
          : (hasSecuritiesAccounts.value = "");
      } else {
        hasSecuritiesAccounts.value = "";
      }
    }
    if (collateralFields.length) {
      securitiesAccountsValue.value = collateralFields.find((field) =>
        Object.prototype.hasOwnProperty.call(field, "securities_accounts_value")
      );

      if (securitiesAccountsValue.value) {
        securitiesAccountsValue.value.securities_accounts_value &&
        securitiesAccountsValue.value.securities_accounts_value.data
          ? (securitiesAccountsValue.value =
              securitiesAccountsValue.value.securities_accounts_value.data)
          : (securitiesAccountsValue.value = "");
      } else {
        securitiesAccountsValue.value = "";
      }
    }
    // Get Collateral Types
    collateralTypes = collateralFields.find((field) =>
      Object.prototype.hasOwnProperty.call(field, "other_collateral_types")
    );

    collateralTypes &&
      collateralTypes.other_collateral_types &&
      collateralTypes.other_collateral_types.data &&
      (collateralTypes = collateralTypes.other_collateral_types.data);
    typesOfCollateral.value = collateralTypes.length ? collateralTypes : "";
    // Get Combined Value
    combinedValue = collateralFields.find((field) =>
      Object.prototype.hasOwnProperty.call(field, "other_collateral_value")
    );

    combinedValue &&
    combinedValue.other_collateral_value &&
    combinedValue.other_collateral_value.data
      ? (combinedValue = String(combinedValue.other_collateral_value.data))
      : (combinedValue = "");
    totalCombinedValue.value = String(combinedValue);

    // Get Receivable Account Value
    receivableAccountsValue = collateralFields.find((field) =>
      Object.prototype.hasOwnProperty.call(field, "accounts_receivable_value")
    );
    receivableAccountsValue &&
    receivableAccountsValue.accounts_receivable_value &&
    receivableAccountsValue.accounts_receivable_value.data
      ? (receivableAccountsValue =
          receivableAccountsValue.accounts_receivable_value.data)
      : (receivableAccountsValue = "");
    return (accountValue.value = receivableAccountsValue);
  }
});
</script>

<style scoped>
.before-border {
  @apply before:content-[''] before:z-10 before:absolute before:left-48 before:top-5 before:block before:bg-[#C9C9C9] before:w-[2px] before:h-6;
}
</style>
