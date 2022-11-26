<template>
  <section class="container my-16 px-20">
    <FormHeader
      formTitle="Business Collateral"
      icon="Location"
      linkText="Does your business have any Collateral?"
      desc="Having Business Collateral can qualify you for more types of financing. Remember, you will be matched with financing options that best fit for your business, but some lenders may not approve your applications without Business Collateral."
    />
    <BaseOptions
      :goBackBtn="false"
      name="has-business-collateral"
      :value="hasBusinessCollateral"
      @handleValue="(val) => handleVal(val)"
      @submit="onSubmit"
    />
  </section>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { onBeforeMount } from "@vue/runtime-core";
import FormHeader from "../FormHeader.vue";
import BaseOptions from "../BaseOptions.vue";

const store = useStore();
const router = useRouter();
const hasBusinessCollateral = ref("");

// Hooks
onBeforeMount(() => {
  const statements = store.getters["businessCollateral/getStatements"];
  let hasCollateral;
  if (statements.length) {
    hasCollateral = statements.find((field) =>
      Object.prototype.hasOwnProperty.call(field, "has_collateral")
    );

    hasCollateral && hasCollateral.has_collateral
      ? (hasCollateral = hasCollateral.has_collateral.value)
      : (hasCollateral = "");
    hasBusinessCollateral.value =
      hasCollateral === true ? "Yes" : hasCollateral === false ? "No" : "";
  }
});

// Methods
const handleVal = (val) => (hasBusinessCollateral.value = val);

const onSubmit = async () => {
  if (hasBusinessCollateral.value === "No") {
    await store.dispatch("businessCollateral/sendStatement", {
      type: "has_collateral",
      requiredData: { value: false },
    });
    await store.dispatch("aspects/fetchFinancialsStatuses", [
      "business_collateral",
    ]);
    return router.push(
      "/fundability/financials/business-collateral/no-collateral"
    );
  }
  return router.push(
    "/fundability/financials/business-collateral/account-recurring"
  );
};
</script>
