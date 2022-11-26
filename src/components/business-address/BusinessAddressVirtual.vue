<template>
  <section class="container my-16 px-20">
    <FormHeader
      formTitle="Virtual Address"
      icon="VirtualAddress"
      linkText="Enter Your Virtual Business Address"
      desc="A virtual address helps to improve fundability and increase approvals. It’s a great alternative to a home business address."
    />
    <BusinessAddressFields
      @save="(data) => save(data)"
      addressType="Virtual Address"
      class="mt-7"
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
      :vendorName="businessAddressFields.vendor_name || ''"
    />
  </section>
</template>

<script setup>
import { onBeforeMount, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import FormHeader from "../FormHeader.vue";
import BusinessAddressFields from "./BusinessAddressFields.vue";

const businessAddressFields = ref({
  company: "",
  business_address_street: "",
  business_address_line2: "",
  business_address_city: "",
  business_address_state: "",
  business_address_zip: "",
  vendor_name: "",
});

const store = useStore();
const router = useRouter();

// Statuses
const foundationStatuses = ref(store.getters["aspects/getFoundationStatuses"]);

// Hooks
onBeforeMount(() => {
  const fields = store.getters["businessAddress/getBusinessAddressFields"];
  const vendorName = store.state.businessAddress.vendorName;
  businessAddressFields.value.vendor_name = vendorName;
  const businessAddressType =
    fields.length &&
    fields.find((field) => {
      return Object.keys(field)[0] === "business_address_type";
    }).business_address_type.data.const;
  if (businessAddressType === "Virtual Address") {
    return (
      fields.length &&
      fields.map((field) => {
        return (businessAddressFields.value[Object.keys(field)[0]] =
          Object.values(field)[0]);
      })
    );
  }
});

watch(store.state, (newState) => {
  foundationStatuses.value = newState.aspects.foundationStatuses;
});

// Methods
const getState = (slug) => {
  const statuses = foundationStatuses.value;
  const state = Object.values(
    statuses.filter((item) => {
      return Object.keys(item)[0] === slug;
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

const save = async (data) => {
  await store.dispatch("businessAddress/sendBusinessAddressFields", data);
  await store.dispatch("aspects/fetchFoundationStatuses", ["business_address"]);
  await store.dispatch("aspects/fetchFinancialsStatuses", ["bank_account"]);
  if (getState("business_address") === "Done") {
    return router.push(
      "/fundability/foundation/business-address/virtual/verify"
    );
  }
  return router.push(
    "/fundability/foundation/business-address/virtual/caution"
  );
};
</script>
