<template>
  <div
    class="mt-10 pr-3 !fixed right-0 top-10 md:w-[250px] lg:w-[240px] 3xl:w-[360px] tab-connection before:h-[90%] before:2xl:h-full foundation hidden lg:block z-10"
    id="right-navbar"
    ref="sidebar"
  >
    <div
      class="absolute left-[-85px] top-[-40px] bg-[#fafdff] md:w-[250px] lg:w-[308px] xl:w-[325px] 3xl:w-[378px] -z-10 h-full pb-20 box-content"
      ref="bg"
    ></div>
    <div class="px-2 overflow-y-hidden h-[565px]">
      <!-- Begin title icons -->
      <div
        class="w-[53px] h-[53px] absolute left-[-75px] top-[-18px] rounded-full shadow-lg bg-white flex items-center justify-center title-icons"
      >
        <IconFoundation class="w-[30px] h-[30px] text-[#196499]" />
      </div>
      <!-- End title icons -->
      <!-- Begin title -->
      <h3 class="mb-5 text-2xl font-bold 3xl:text-4xl text-[#196499]">
        Foundation
      </h3>
      <!-- End title -->
      <!-- Begin Foundation loader -->
      <div
        class="flex flex-col gap-2 pb-2 tab-connector"
        v-if="!foundationStatuses.length"
      >
        <BaseBtnLoading />
        <BaseBtnLoading />
        <BaseBtnLoading />
        <BaseBtnLoading />
        <BaseBtnLoading />
        <BaseBtnLoading />
        <BaseBtnLoading />
        <BaseBtnLoading />
        <BaseBtnLoading />
        <BaseBtnLoading />
        <BaseBtnLoading />
        <BaseBtnLoading />
      </div>
      <!-- End Foundation loader -->
      <!-- Begin Foundation Tab -->
      <div class="flex flex-col gap-2 pb-2 tab-connector" ref="tabs">
        <StepButton
          :type="getState('business_address')"
          text="Business Address"
          :to="
            activeNode === 'business_address'
              ? nodeLink
              : '/fundability/foundation/business-address'
          "
          :btnActive="activeNode === 'business_address' ? true : false"
        />
        <StepButton
          :type="getState('business_entity')"
          text="Business Entity"
          :to="
            activeNode === 'entity'
              ? nodeLink
              : '/fundability/foundation/business-entity'
          "
          :btnActive="activeNode === 'entity' ? true : false"
          :disabled="pillarsDisabled"
        />
        <StepButton
          :type="
            foreignFilingUpdate
              ? foreignFilingStatus
              : getState('foreign_filing')
          "
          :to="
            activeNode === 'foreign_filing'
              ? nodeLink
              : '/fundability/foundation/foreign-filing'
          "
          text="Foreign Filing"
          :btnActive="activeNode === 'foreign_filing' ? true : false"
          :disabled="foreignFilingDisabled"
        />
        <StepButton
          :type="getState('ownership')"
          text="Ownership"
          :to="
            activeNode === 'ownership'
              ? nodeLink
              : '/fundability/foundation/ownership'
          "
          :btnActive="activeNode === 'ownership' ? true : false"
          :disabled="pillarsDisabled"
        />
        <StepButton
          :type="getState('ein')"
          text="EIN"
          :to="activeNode === 'ein' ? nodeLink : '/fundability/foundation/ein'"
          :btnActive="activeNode === 'ein' ? true : false"
          :disabled="pillarsDisabled"
        />
        <StepButton
          :type="getState('business_phone')"
          text="Business Phone"
          :to="
            activeNode === 'business_phone'
              ? nodeLink
              : '/fundability/foundation/business-phone'
          "
          :btnActive="activeNode === 'business_phone' ? true : false"
          :disabled="pillarsDisabled"
        />
        <!-- 411 removed > issue #242 -->

        <StepButton
          :type="getState('website_and_email')"
          text="Website and Email"
          :to="
            activeNode === 'website_and_email'
              ? nodeLink
              : '/fundability/foundation/website-email'
          "
          :btnActive="activeNode === 'website_and_email' ? true : false"
          :disabled="pillarsDisabled"
        />

        <StepButton
          :type="getState('merchant_account')"
          text="Merchant Account"
          :to="
            activeNode === 'merchant_account'
              ? nodeLink
              : '/fundability/foundation/merchant-account'
          "
          :btnActive="activeNode === 'merchant_account' ? true : false"
          :disabled="pillarsDisabled"
        />
        <StepButton
          :type="getState('business_industry')"
          text="Business Industry"
          :to="
            activeNode === 'business_industry'
              ? nodeLink
              : '/fundability/foundation/business-industry'
          "
          :btnActive="activeNode === 'business_industry' ? true : false"
          :disabled="pillarsDisabled"
        />
      </div>
      <!-- End Foundation Tab -->
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, onMounted, onUpdated, ref, watch } from "vue";
import { useStore } from "vuex";
import StepButton from "./StepButton.vue";
import BaseBtnLoading from "./BaseBtnLoading.vue";
import IconFoundation from "./Icon/IconFoundation.vue";
import { useRoute } from "vue-router";

const store = useStore();
const route = useRoute();

// Refs
const sidebar = ref(null);
const tabs = ref(null);
const bg = ref(null);

// Data
const pillarsDisabled = ref(false);
const foreignFilingDisabled = ref(false);
const foreignFilingUpdate = ref(false);
const foreignFilingStatus = ref("");

// Props
const props = defineProps({
  activeNode: {
    type: String,
    default: "",
  },
  nodeLink: {
    type: String,
    default: "",
  },
  pageHeaderId: {
    type: String,
    default: "",
  },
  pageContentId: {
    type: String,
    default: "",
  },
});

// Statuses
const foundationStatuses = ref(store.getters["aspects/getFoundationStatuses"]);

// Hooks
onBeforeMount(() => {
  const status = getState("business_address");
  const entityStatus = getState("business_entity");

  if ((status === "Done" || status === "Caution") && entityStatus === "Done") {
    pillarsDisabled.value = false;
    return (foreignFilingDisabled.value = false);
  } else if (status === "Done" || status === "Caution") {
    foreignFilingDisabled.value = true;
    return (pillarsDisabled.value = false);
  }
  foreignFilingDisabled.value = true;
  return (pillarsDisabled.value = true);
});

onMounted(() => {
  const leftNavbar = document.getElementById("left-navbar");
  const header = document.getElementById(props.pageHeaderId);
  const content = document.getElementById(props.pageContentId);
  header &&
    (header.style.left =
      leftNavbar && window.innerWidth > 1023
        ? `${leftNavbar.clientWidth}px`
        : 0);
  sidebar.value && (sidebar.value.style.top = `${header.clientHeight - 12}px`);
  content && (content.style.marginTop = `${header.clientHeight - 12}px`);
  content && (content.style.width = "100%");
  content &&
    (content.style.width = `${
      content.clientWidth - sidebar.value.clientWidth - 80
    }px`);
  bg.value && (bg.value.style.height = `${content.clientHeight}px`);
});

onUpdated(() => {
  foundationStatuses.value = store.getters["aspects/getFoundationStatuses"];
  const status = getState("business_address");
  if (status === "Done" || status === "Caution") {
    return (pillarsDisabled.value = false);
  }
  return (pillarsDisabled.value = true);
});

// Methods
const getState = (name) => {
  const statuses = foundationStatuses.value;
  const status = statuses.find((item) =>
    Object.prototype.hasOwnProperty.call(item, name)
  );

  const state = status ? status[name] : "";
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

const updateEntityStatus = () => {
  foundationStatuses.value = store.getters["aspects/getFoundationStatuses"];
  const status = getState("foreign_filing");
  if (status != "") {
    foreignFilingUpdate.value = true;
    foreignFilingDisabled.value = false;
    foreignFilingStatus.value = status
  } else {
    foreignFilingUpdate.value = false;
  }
};

watch(route, async (newRoute) => {
  if (newRoute.name == "business-entity-form-confirm") {
    await store.dispatch("aspects/fetchFoundationStatuses", ["foreign_filing"]);
    updateEntityStatus();
  }
});

window.addEventListener("resize", (e) => {
  const leftNavbar = document.getElementById("left-navbar") || null;
  const header = document.getElementById(props.pageHeaderId) || null;
  const content = document.getElementById(props.pageContentId) || null;
  header &&
    (header.style.left =
      leftNavbar && e.target.innerWidth > 1023
        ? `${leftNavbar.clientWidth}px`
        : 0);
  sidebar.value && (sidebar.value.style.top = `${header.clientHeight - 12}px`);
  content && (content.style.marginTop = `${header.clientHeight - 12}px`);
  content && (content.style.width = "100%");
  content &&
    sidebar.value &&
    (content.style.width = `${
      content.clientWidth - sidebar.value.clientWidth - 80
    }px`);
  bg.value && (bg.value.style.height = `${content.clientHeight}px`);
});
</script>
