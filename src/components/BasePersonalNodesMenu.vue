<template>
  <div
    class="mt-10 pr-3 !fixed right-0 top-10 md:w-[250px] lg:w-[240px] 3xl:w-[360px] tab-connection before:h-[300px] personal hidden lg:block z-10"
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
        <IconPersonal class="w-[30px] h-[30px] text-[#196499]" />
      </div>
      <!-- End title icons -->
      <!-- Begin title -->
      <h3 class="mb-5 text-2xl font-semibold 3xl:text-4xl text-[#196499]">
        Personal
      </h3>
      <!-- End title -->
      <!-- Begin Personal loader -->
      <div
        class="flex flex-col gap-2 pb-2 tab-connector"
        v-if="!personalStatuses.length"
      >
        <BaseBtnLoading />
        <BaseBtnLoading />
        <BaseBtnLoading />
        <BaseBtnLoading />
      </div>
      <!-- End Personal loader -->
      <!-- Begin Personal Tab -->
      <div class="flex flex-col gap-2 pb-2 tab-connector">
        <StepButton
          :type="getState('credit_score')"
          text="Personal Credit Score"
          :to="
            activeNode === 'credit_score'
              ? nodeLink
              : '/fundability/personal/personal-credit-score'
          "
          :btnActive="activeNode === 'credit_score' ? true : false"
        />
        <StepButton
          :type="getState('credit_report')"
          text="Credit Report"
          :to="
            activeNode === 'credit_report'
              ? nodeLink
              : '/fundability/personal/credit-report'
          "
          :btnActive="activeNode === 'credit_report' ? true : false"
        />
        <StepButton
          :type="getState('lexisnexis_report')"
          text="LexisNexis"
          :to="
            activeNode === 'lexisnexis_report'
              ? nodeLink
              : '/fundability/personal/lexis-nexis'
          "
          :btnActive="activeNode === 'lexisnexis_report' ? true : false"
        />
        <StepButton
          :type="getState('chex_report')"
          text="Chex Systems"
          :to="
            activeNode === 'chex_report'
              ? nodeLink
              : '/fundability/personal/chex-systems'
          "
          :btnActive="activeNode === 'chex_report' ? true : false"
        />
        <StepButton
          :type="getState('derogatory_remarks')"
          text="Bankruptcies, Liens and Judgements"
          :to="
            activeNode === 'derogatory_remarks'
              ? nodeLink
              : '/fundability/personal/bankruptcy'
          "
          :btnActive="activeNode === 'derogatory_remarks' ? true : false"
        />
      </div>
      <!-- End Personal Tab -->
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUpdated, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();

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

// Refs
const sidebar = ref(null);
const bg = ref(null);

// Statuses
const personalStatuses = ref(store.getters["aspects/getPersonalStatuses"]);

// Hooks
onMounted(() => {
  const leftNavbar = document.getElementById("left-navbar");
  const header = document.getElementById(props.pageHeaderId);
  const content = document.getElementById(props.pageContentId);
  header &&
    (header.style.left =
      leftNavbar && window.innerWidth > 1023
        ? `${leftNavbar.clientWidth}px`
        : 0);
  sidebar.value.style.top = `${header.clientHeight - 12}px`;
  content.style.marginTop = `${header.clientHeight - 12}px`;
  content.style.width = "100%";
  content.style.width = `${
    content.clientWidth - sidebar.value.clientWidth - 80
  }px`;
  bg.value.style.height = `${content.clientHeight}px`;
});

onUpdated(() => {
  personalStatuses.value = store.getters["aspects/getPersonalStatuses"];
});

// Methods
const getState = (name) => {
  const statuses = personalStatuses.value;
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
