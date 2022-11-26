<template>
  <LeftNav v-if="!collapsedNav" />
  <BaseCollapsedNavbar v-if="collapsedNav" />
  <div class="lg:ml-[294px]" ref="content">
    <RouterView />
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import LeftNav from "../components/LeftNav.vue";
import BaseCollapsedNavbar from "../components/BaseCollapsedNavbar.vue";

const store = useStore();
const route = useRoute();
const router = useRouter();
const content = ref(null);
const collapsedNav = ref(false);

onMounted(() => {
  if (
    store.getters["auth/isLoggedIn"] &&
    (route.path === "/signin" ||
      route.path === "/forgot-password" ||
      route.path === "/change-password" ||
      route.path === "/reset-link")
  ) {
    return router.push("/");
  }
  if (
    (route.params.list &&
      route.params.list.length &&
      route.params.list != "experimenter") ||
    (route.params.provider && route.params.provider.length) ||
    (route.params.subcategory &&
      route.params.subcategory === "vendor-list" &&
      route.params.subcategory != "experimenter")
  ) {
    collapsedNav.value = true;
    content.value.classList.remove("lg:ml-[294px]");
    content.value.classList.add("ml-[65px]");
  } else {
    collapsedNav.value = false;
    content.value.classList.add("lg:ml-[294px]");
  }
});

watch(route, (newRoute) => {
  if (
    (newRoute.params.list &&
      newRoute.params.list.length &&
      newRoute.params.list != "experimenter") ||
    (newRoute.params.provider && newRoute.params.provider.length) ||
    (newRoute.params.subcategory &&
      newRoute.params.subcategory === "vendor-list")
  ) {
    collapsedNav.value = true;
    content.value.classList.remove("lg:ml-[294px]");
    content.value.classList.add("ml-[65px]");
  } else {
    collapsedNav.value = false;
    content.value.classList.add("lg:ml-[294px]");
  }
});
</script>
