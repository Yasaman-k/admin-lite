<template>
  <div
    :class="`mt-10 pr-3 !fixed right-0 top-10 md:w-[250px] lg:w-[240px] 3xl:w-[360px] tab-connection before:h-[${sidebarHeight}] hidden lg:block z-10`"
    id="right-navbar"
    ref="sidebar"
  >
    <div
      class="absolute left-[-85px] top-[-40px] bg-[#fafdff] md:w-[250px] lg:w-[308px] xl:w-[325px] 3xl:w-[378px] -z-10 h-full pb-20 box-content"
      ref="bg"
    ></div>
    <div :class="`px-2 overflow-y-hidden h-[${sidebarHeight}]`">
      <!-- Begin title icons -->
      <div
        class="w-[53px] h-[53px] absolute left-[-75px] top-[-18px] rounded-full shadow-lg bg-white flex items-center justify-center title-icons"
      >
        <IconFoundation
          v-if="aspectTitle === 'Foundation'"
          class="w-[30px] h-[30px] text-[#196499]"
        />
        <IconFinancials
          v-else-if="aspectTitle === 'Financials'"
          class="w-[30px] h-[30px]"
        />
        <IconBusinessCreditReport
          v-else-if="aspectTitle === 'Business Credit Report'"
          class="w-[30px] h-[30px]"
        />
        <IconPersonal
          v-else-if="aspectTitle === 'Personal'"
          class="w-[30px] h-[30px] text-[#196499]"
        />
        <IconApplicationProcess
          v-else-if="aspectTitle === 'Application Process'"
          class="w-[30px] h-[30px]"
        />
      </div>
      <!-- End title icons -->
      <!-- Begin title -->
      <h3 class="mb-5 text-2xl font-bold 3xl:text-4xl text-[#196499]">
        {{ aspectTitle }}
      </h3>
      <!-- End title -->
      <!-- Begin Foundation loader -->
      <div
        class="flex flex-col gap-2 pb-2 tab-connector"
        v-if="aspectStatuses.length === 0"
      >
        <BaseBtnLoading />
        <BaseBtnLoading />
        <BaseBtnLoading />
        <BaseBtnLoading />
      </div>
      <!-- End Foundation loader -->
      <!-- Begin Foundation Tab -->
      <base-tab-right-side-bar
        :activeNode="activeNode"
        :nodeLink="nodeLink"
        :aspectTitle="aspectTitle"
        :aspectStatuses="aspectStatuses"
        :aspectStatusesDb="aspectStatusesDb"
        ref="tabs"
      ></base-tab-right-side-bar>

      <!-- End Foundation Tab -->
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import BaseTabRightSideBar from "./BaseTabRightSideBar.vue";
import BaseBtnLoading from "./BaseBtnLoading.vue";
import IconFoundation from "./Icon/IconFoundation.vue";
import IconFinancials from "./Icon/IconFinancials.vue";
import IconBusinessCreditReport from "./Icon/IconBusinessCreditReport.vue";
import IconPersonal from "./Icon/IconPersonal.vue";
import IconApplicationProcess from "./Icon/IconApplicationProcess.vue";

// Refs
const sidebar = ref(null);
const tabs = ref(null);
const bg = ref(null);

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
  aspectTitle: {
    type: String,
    default: "",
  },
  aspectStatuses: {
    type: Array,
    default: () => [],
  },
  aspectStatusesDb: {
    type: Array,
    default: () => [],
  },
});

//computed
const sidebarHeight = computed(() => {
  let height = "100px";

  if (props.aspectTitle === "Foundation") {
    height = "462px";
  } else if (props.aspectTitle === "Financials") {
    height = "500px";
  } else if (props.aspectTitle === "Business Credit Report") {
    height = "320px";
  } else if (props.aspectTitle === "Personal") {
    height = "300px";
  } else if (props.aspectTitle === "Application Process") {
    height = "100px";
  }

  return height;
});

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
  sidebar.value && (sidebar.value.style.top = `${header.clientHeight - 12}px`);
  content && (content.style.marginTop = `${header.clientHeight - 12}px`);
  content && (content.style.width = "100%");
  content &&
    (content.style.width = `${
      content.clientWidth - sidebar.value.clientWidth - 80
    }px`);
  bg.value && (bg.value.style.height = `${content.clientHeight}px`);
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
