<template>
  <section class="container my-16 px-20">
    <FormHeader
      formTitle="Business address "
      icon="Location"
      iconColor="text-red-500"
      linkText="Which one of the following ways did you choose to update your business address?"
    />
    <form @submit.prevent="save" class="mt-5">
      <div class="flex flex-col gap-5">
        <BaseRadioButton
          radioName="update-type"
          text="Updated Address with S.O.S."
          icon="CommercialAddress"
          value="update_sos"
          @select="(e) => handleVal(e)"
          class="w-1/2"
        />
        <BaseRadioButton
          radioName="update-type"
          text="Updated Address in Fundability"
          icon="HomeAddress"
          value="update_fundability"
          @select="(e) => handleVal(e)"
          class="w-1/2"
        />
      </div>
      <BaseBackNextBtns :BackBtnHidden="true" :nextDisabled="nextDisable" />
    </form>
  </section>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import FormHeader from "../FormHeader.vue";
import BaseBackNextBtns from "../BaseBackNextBtns.vue";

const store = useStore();
const router = useRouter();
const updateType = ref("");
const nextDisable = ref(true);

const handleVal = (val) => {
  updateType.value = val;
  updateType.value.length
    ? (nextDisable.value = false)
    : (nextDisable.value = true);
};

const save = async () => {
  await store.dispatch("entity/sendMatchConfirmation", {
    type: "has_confirmed_address_matches_secretary_of_states",
    requiredData: { value: true },
  });
  await store.dispatch("aspects/fetchFoundationStatuses", ["business_entity"]);
  return router.push(
    "/fundability/foundation/business-entity/entity-form-confirm"
  );
};
</script>
