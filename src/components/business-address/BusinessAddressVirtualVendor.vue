<template>
  <section class="container my-16 px-20 relative">
    <FormHeader
      formTitle="Virtual Address"
      icon="VirtualAddress"
      linkText="Who is your Virtual Business Address Vendor?"
      desc="Select the Vendor that helped you secure your virtual business address."
    />
    <div
      v-if="!vendorList.length"
      class="flex p-4 mb-4 mt-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
      role="alert"
    >
      <svg
        class="inline flex-shrink-0 mr-3 w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clip-rule="evenodd"
        ></path>
      </svg>
      <div class="text-xl">There are no vendors available.</div>
    </div>
    <BaseSelect
      @selected="(e) => (vendor = e)"
      :value="vendor.title"
      :dropdowns="vendorList"
      :disabled="disableVendorSelect"
      label="Select a Vendor from the list"
      placeholder="Select a Vendor from the list"
      errorMessage="Vendor is required."
      class="mt-8"
    />
    <BaseInput
      @input="(e) => handleVendorInput(e.target.value)"
      v-if="showVendorInput"
      :value="vendorInput"
      label="Enter the Name of the Vendor"
      class="mt-7"
      placeholder="Gardian"
      errorMessage="Vendor Name is required."
      :required="true"
    />
    <BaseBackNextBtns :nextDisabled="nextDisable" @next="save" />
  </section>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { onBeforeMount, onUpdated } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import store from "../../store";
import BaseSelect from "../BaseSelect.vue";
import BaseBackNextBtns from "../BaseBackNextBtns.vue";

const router = useRouter();
const vendorList = ref([]);
const vendor = ref({});
const nextDisable = ref(true);
const showVendorInput = ref(false);
const vendorInput = ref("");
const disableVendorSelect = ref(false);

// Hooks
onBeforeMount(() => {
  const addressVendorList = store.getters["businessAddress/getVendorList"];
  const fields = store.getters["businessAddress/getBusinessAddressFields"];
  addressVendorList.length && (vendorList.value = addressVendorList[0].values);
  let vendorTitle =
    fields.length &&
    fields.find((field) => {
      return Object.keys(field)[0] === "virtual_address_vendor";
    });
  const vendorInList = addressVendorList.find(
    (vendor) => vendor.title === vendorTitle
  );
  if (vendorTitle && vendorInList) {
    vendor.value["title"] = vendorTitle.virtual_address_vendor.data;
  } else if (vendorTitle) {
    vendor.value["title"] = "Other";
    showVendorInput.value = true;
    vendorInput.value = vendorTitle.virtual_address_vendor.data;
  } else {
    showVendorInput.value = false;
  }

  if (
    !vendor.value.title ||
    (vendor.value.title === "Other" && !vendorInput.value.length)
  ) {
    return (nextDisable.value = true);
  } else if (!vendorInput.value.length) {
    return (nextDisable.value = true);
  }
  return (nextDisable.value = false);
});

onUpdated(() => {
  if (vendor.value.title === "Other") {
    showVendorInput.value = true;
  } else {
    showVendorInput.value = false;
  }

  if (vendor.value.title === "Other" && vendorInput.value.length) {
    return (nextDisable.value = false);
  } else if (!vendor.value.title || vendor.value.title === "Other") {
    return (nextDisable.value = true);
  }
  return (nextDisable.value = false);
});

// Methods
const handleVendorInput = (value) => {
  vendorInput.value = value;
  if (value === "") {
    disableVendorSelect.value = false;
  } else {
    disableVendorSelect.value = true;
  }
};

const save = async () => {
  if (vendor.value.title === "Other" && vendorInput.value.length) {
    await store.dispatch("businessAddress/setVendorName", vendorInput.value);
    return router.push(
      "/fundability/foundation/business-address/virtual/address"
    );
  }
  let isBad =
    vendorList.value.length &&
    vendorList.value.find((field) => {
      return Object.values(field)[1] === vendor.value.title;
    });
  isBad && (isBad = isBad.is_bad);
  if (isBad) {
    await store.dispatch("businessAddress/sendBusinessAddressFields", [
      {
        type: "business_address_type",
        value: "Virtual Address",
      },
      {
        type: "company",
        value: "",
      },
      {
        type: "business_address_street",
        value: "",
      },
      {
        type: "business_address_line2",
        value: "",
      },
      {
        type: "business_address_city",
        value: "",
      },
      {
        type: "business_address_state",
        value: "",
      },
      {
        type: "business_address_zip",
        value: "",
      },
      {
        type: "virtual_address_vendor",
        value: vendor.value.title,
      },
    ]);
    await store.dispatch("aspects/fetchFoundationStatuses", [
      "business_address",
    ]);
    await store.dispatch("aspects/fetchFinancialsStatuses", ["bank_account"]);
    return router.push("/fundability/foundation/business-address/virtual/bad");
  }
  await store.dispatch("businessAddress/setVendorName", vendor.value.title);
  router.push("/fundability/foundation/business-address/virtual/address");
};
</script>
