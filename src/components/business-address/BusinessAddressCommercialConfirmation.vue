<template>
  <section class="container my-16 px-20">
    <FormHeader
      formTitle="Commercial address saved"
      icon="CommercialAddress"
      linkText="Your Commercial Business Address is recorded as follows:"
      desc="Update your business address with Credit Suite and the Secretary of State if your business moves."
    />
    <BaseBusinessConfirmationFields
      :businessName="businessAddressFields.company.data || ''"
      :addressLineOne="businessAddressFields.business_address_street.data || ''"
      :addressLineTwo="businessAddressFields.business_address_line2.data || ''"
      :city="businessAddressFields.business_address_city.data || ''"
      :state="businessAddressFields.business_address_state.data || ''"
      :zipCode="businessAddressFields.business_address_zip.data || ''"
    />
    <BaseUpdateNextBtns
      updateLabel="Update Address"
      updateLink="/fundability/foundation/business-address"
      nextLabel="Business Entity"
      nextLink="/fundability/foundation/business-entity"
    />
  </section>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { useStore } from "vuex";
import FormHeader from "../FormHeader.vue";
import BaseBusinessConfirmationFields from "../BaseBusinessConfirmationFields.vue";
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
  let businessAddressType =
    fields.length &&
    fields.find((field) => {
      return Object.keys(field)[0] === "business_address_type";
    });
  businessAddressType &&
    (businessAddressType =
      businessAddressType.business_address_type.data.const);
  if (businessAddressType === "Business Address (not virtual, or home)") {
    return (
      fields.length &&
      fields.map((field) => {
        return (businessAddressFields.value[Object.keys(field)[0]] =
          Object.values(field)[0]);
      })
    );
  }
});
</script>
