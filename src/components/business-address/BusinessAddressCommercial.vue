<template>
  <section class="container my-16 px-20">
    <FormHeader
      formTitle="Commercial address"
      icon="CommercialAddress"
      linkText="Enter Your Commercial Business Address"
      desc="A Commercial Business Address is the physical location where your business is conducted, separate from your home address."
    />
    <BusinessAddressFields
      @save="(data) => save(data)"
      addressType="Business Address (not virtual, or home)"
      class="mt-10"
      :businessNameProp="businessAddressFields.company.data || ''"
      :addressLineOneProp="
        businessAddressFields.business_address_street.data || ''
      "
      :addressLineTwoProp="
        businessAddressFields.business_address_line2.data || ''
      "
      :cityProp="businessAddressFields.business_address_city.data || ''"
      :stateProp="businessAddressFields.business_address_state.data || ''"
      :zipCodeProp="businessAddressFields.business_address_zip.data || ''"
    />
  </section>
</template>

<script setup>
import FormHeader from "../FormHeader.vue";
import BusinessAddressFields from "./BusinessAddressFields.vue";
import { onBeforeMount, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const businessAddressFields = ref({
  company: "",
  business_address_street: "",
  business_address_line2: "",
  business_address_city: "",
  business_address_state: "",
  business_address_zip: "",
});
const store = useStore();
const router = useRouter();

onBeforeMount(() => {
  const fields = store.getters["businessAddress/getBusinessAddressFields"];
  const businessAddressType =
    fields.length &&
    fields.find((field) => {
      return Object.keys(field)[0] === "business_address_type";
    }).business_address_type.data.const;

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

const save = async (data) => {
  await store.dispatch("businessAddress/sendBusinessAddressFields", data);
  await store.dispatch("aspects/fetchFoundationStatuses", ["business_address"]);
  await store.dispatch("aspects/fetchFinancialsStatuses", ["bank_account"]);
  router.push("/fundability/foundation/business-address/commercial/verify");
};
</script>
