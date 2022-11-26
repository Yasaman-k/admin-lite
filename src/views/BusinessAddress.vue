<template>
  <div class="fixed right-0 z-30 bg-white" id="business-address-header">
    <PageHeader />
  </div>
  <section
    class="min-h-screen overflow-hidden relative flex gap-10 justify-between"
  >
    <SpinnerLoader
      v-if="!checkPointExist"
      pageHeaderId="business-address-header"
    />
    <div id="business-address-content" class="content">
      <router-view></router-view>
    </div>
    <base-foundation-right-bar
      activeNode="business_address"
      :nodeLink="businessAddressLink"
      pageHeaderId="business-address-header"
      pageContentId="business-address-content"
      aspectTitle="Foundation"
      :aspectStatuses="foundationNodes"
      :aspectStatusesDb="foundationStatuses"
    >
    </base-foundation-right-bar>
  </section>
</template>

<script setup>
import { onBeforeMount, onUpdated, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import SpinnerLoader from "../components/SpinnerLoader.vue";
import PageHeader from "../components/PageHeader.vue";
import BaseFoundationRightBar from "../components/BaseFoundationRightBar.vue";
import { foundationNodes } from "../constants";

const store = useStore();
const router = useRouter();
const route = useRoute();
const checkPointExist = ref(false);
const businessAddressLink = ref("");

// Statuses
const foundationStatuses = ref(store.getters["aspects/getFoundationStatuses"]);

// Fields
const businessAddressFields = ref([]);

// Hooks
onBeforeMount(async () => {
  await store.dispatch("businessAddress/fetchBusinessAddressFields");
  await store.dispatch("businessAddress/fetchVendorList");
  businessAddressFields.value =
    store.getters["businessAddress/getBusinessAddressFields"];
  const fields = businessAddressFields.value;

  // check if vendor exist and it's bad or not
  const vendorList = store.getters["businessAddress/getVendorList"];
  let vendorTitle = fields.find((field) => {
    return Object.keys(field)[0] === "virtual_address_vendor";
  });

  vendorTitle && (vendorTitle = vendorTitle.virtual_address_vendor.data);
  let isBad =
    vendorList.length &&
    vendorList[0].values.find((field) => {
      return Object.values(field)[1] === vendorTitle;
    });
  isBad && (isBad = isBad.is_bad);

  // Get Checkpoint
  let businessAddressType =
    fields.length &&
    fields.find((field) => {
      return Object.keys(field)[0] === "business_address_type";
    });
  businessAddressType &&
    (businessAddressType =
      businessAddressType.business_address_type.data.const);

  const addressStatus = getState("business_address");

  // Check Business Address Type To Determine Business Address Checkpoint
  if (businessAddressType === "Virtual Address" && isBad) {
    checkPointExist.value = true;
    return router.push("/fundability/foundation/business-address/virtual/bad");
  } else if (
    businessAddressType === "Virtual Address" &&
    vendorTitle === "Other"
  ) {
    checkPointExist.value = true;
    return router.push(
      "/fundability/foundation/business-address/virtual/other-vendor"
    );
  } else if (
    businessAddressType === "Virtual Address" &&
    addressStatus === "CAUTION"
  ) {
    checkPointExist.value = true;
    return router.push(
      "/fundability/foundation/business-address/virtual/caution"
    );
  } else if (
    businessAddressType === "Virtual Address" &&
    addressStatus === "POSITIVE"
  ) {
    checkPointExist.value = true;
    return router.push(
      "/fundability/foundation/business-address/virtual/verify"
    );
  } else if (businessAddressType === "Virtual Address") {
    checkPointExist.value = true;
    return router.push(
      "/fundability/foundation/business-address/virtual/address"
    );
  } else if (
    businessAddressType === "Business Address (not virtual, or home)"
  ) {
    checkPointExist.value = true;
    return router.push(
      "/fundability/foundation/business-address/commercial/verify"
    );
  } else if (businessAddressType === "Home") {
    checkPointExist.value = true;
    return router.push("/fundability/foundation/business-address/home/verify");
  } else if (businessAddressType === "PO Box") {
    checkPointExist.value = true;
    return router.push("/fundability/foundation/business-address/po-box");
  }
  checkPointExist.value = true;
  return router.push("/fundability/foundation/business-address");
});

onUpdated(() => {
  businessAddressLink.value = route.fullPath;
});

// Methods
const getState = (name) => {
  const statuses = foundationStatuses.value;
  const state = Object.values(
    statuses.filter((item) => {
      return Object.keys(item)[0] === name;
    })[0]
  )[0];
  return state;
};
</script>
