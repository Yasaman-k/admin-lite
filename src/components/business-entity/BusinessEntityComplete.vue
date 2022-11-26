<template>
  <section class="container my-16 px-20">
    <FormHeader
      formTitle="Business Entity saved"
      icon="CommercialAddress"
      iconColor="text-red-500"
      linkText="Great, your Business Entity is recorded as follows:"
      desc="To make changes, click “Update Entity Information”."
    />
    <div class="mt-10 confirm-form">
      <BaseInput
        :copy="true"
        :value="entityFields.entity_type.data.const"
        label="Entity Type"
        class="mt-7 text-[#196499]"
        :disabled="true"
      />
      <BaseInput
        :copy="true"
        :value="entityFields.business_created_at.data"
        label="Business Entity Filing Date"
        :disabled="true"
        class="mt-7 text-[#196499]"
        placeholder=""
      />

      <!-- Business Industry removed; issue #234 -->

      <BaseInput
        :copy="true"
        :value="entityFields.business_state_incorporated.data"
        label="Entity Registration State"
        class="mt-7"
        :disabled="true"
        placeholder=""
      />
    </div>
    <BaseUpdateNextBtns
      updateLabel="Update Entity Information"
      updateLink="/fundability/foundation/business-entity"
      :nextDisabled="nextDisabled"
      nextLabel="Foreign Filing"
      :nextLink="nextLink"
    />
  </section>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { useStore } from "vuex";
import FormHeader from "../FormHeader.vue";
import BaseUpdateNextBtns from "../BaseUpdateNextBtns.vue";

const store = useStore();

// Data
const foundationStatuses = ref(store.getters["aspects/getFoundationStatuses"]);
const nextLink = ref("");
const nextDisabled = ref(true);
const entityFields = ref({
  entity_type: {
    data: { const: "" },
  },
  business_created_at: {
    data: "",
  },
  business_state_incorporated: {
    data: "",
  },
});

const industry = ref("");

// Hooks
onBeforeMount(async () => {
  const entityStatus = getState("business_entity");
  
  if (entityStatus === "Done") {
    nextLink.value = "/fundability/foundation/foreign-filing";
    nextDisabled.value = false;
  }

  const fields = await store.getters["entity/getEntityFields"];

  // Industry
  const businessIndustry = fields.filter((field) => {
    return Object.keys(field)[0] === "business_industry";
  });

  if (businessIndustry.length) {
    businessIndustry[0].business_industry &&
    businessIndustry[0].business_industry.data &&
    businessIndustry[0].business_industry.data.const
      ? (industry.value = businessIndustry[0].business_industry.data.const)
      : (industry.value = "");
  }

  if (fields.length) {
    fields.map((field) => {
      return (entityFields.value[Object.keys(field)[0]] =
        Object.values(field)[0]);
    });
  }
});

// Methods
const getState = (name) => {
  const statuses = foundationStatuses.value;
  const state = Object.values(
    statuses.filter((item) => {
      return Object.keys(item)[0] === name;
    })[0]
  )[0];
  if (state === "POSITIVE") {
    return "Done";
  } else if (state === "NEGATIVE") {
    return "FixNow";
  } else if (state === "EMPTY") {
    return "Empty";
  } else if (state === "CAUTION") {
    return "Caution";
  }
  return "";
};
</script>
