<template>
  <section class="container my-16 px-20">
    <BaseWarning
      icon="Warning"
      title="virtual address provider impacts Fundability"
      message="Your current virtual address provider is not known to be widely accepted by lenders. Use a different address ‘type’ or get a New Virtual Address."
    />
    <form @submit.prevent class="mt-10 confirm-form">
      <BaseInput
        :copy="true"
        :value="businessAddressFields.company.data"
        label="Business Name"
        :disabled="true"
      />
      <BaseInput
        :copy="true"
        :value="businessAddressFields.business_address_street.data || ''"
        label="Address Line 1"
        :disabled="true"
        class="mt-7 text-[#196499]"
        placeholder=""
      />
      <BaseInput
        :copy="true"
        :value="businessAddressFields.business_address_line2.data"
        v-if="businessAddressFields.business_address_line2.data"
        label="Address Line 2"
        class="mt-7"
        :disabled="true"
        placeholder=""
      />
      <div class="grid md:grid-cols-3 md:gap-10">
        <BaseInput
          :copy="true"
          :value="businessAddressFields.business_address_city.data"
          label="City"
          :disabled="true"
          class="mt-7"
          placeholder=""
        />
        <BaseInput
          :copy="true"
          :value="
            capitalize(businessAddressFields.business_address_state.data || '')
          "
          label="State"
          :disabled="true"
          class="mt-7"
          placeholder=""
        />
        <BaseInput
          :copy="true"
          :value="businessAddressFields.business_address_zip.data"
          label="Zip Code"
          :disabled="true"
          class="mt-7"
          placeholder=""
        />
      </div>
      <BaseUpdateNextBtns
        updateLabel="Get New Address"
        updateLink="/fundability/foundation/business-address/virtual/other-virtual-options"
        nextLabel="Business Entity"
        nextLink="/fundability/foundation/business-entity"
      />
    </form>
  </section>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { useStore } from "vuex";
import BaseWarning from "../BaseWarning.vue";
import BaseUpdateNextBtns from "../BaseUpdateNextBtns.vue";

const businessAddressFields = ref({
  company: "",
  business_address_street: "",
  business_address_line2: "",
  business_address_city: "",
  business_address_state: "",
  business_address_zip: "",
});

const store = useStore();

// Hooks
onBeforeMount(() => {
  const fields = store.getters["businessAddress/getBusinessAddressFields"];

  return (
    fields.length &&
    fields.map((field) => {
      return (businessAddressFields.value[Object.keys(field)[0]] =
        Object.values(field)[0]);
    })
  );
});

// Methods
const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
</script>

<style scoped>
.confirm-form input:disabled {
  @apply bg-[#FAFDFF] text-[#196499] drop-shadow-md rounded-md border-0;
}

.confirm-form input:disabled + label {
  @apply bg-white text-[#196499] rounded-md;
}
</style>
