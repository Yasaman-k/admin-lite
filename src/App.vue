<template>
  <ErrorMessage
    v-if="loggedIn && errorMessage.length"
    :message="errorMessage"
  />
  <MainPages v-if="!authPage && loggedIn && errorMessage.length === 0" />
  <AuthPages v-if="authPage && !loggedIn" />
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import AuthPages from "./views/Authentication/AuthPages.vue";
import MainPages from "./views/MainPages.vue";

const store = useStore();
const route = useRoute();
const router = useRouter();
const authPage = ref(true);
const loggedIn = ref(false);
const errorMessage = ref("");
const tokenExpired = ref(false);

onMounted(async () => {
  // Fetch Nodes when user is logged in and refreshed the page
  if (store.getters["auth/isLoggedIn"]) {
    await store.dispatch("aspects/fetchNodesStatuses");
    errorMessage.value = store.state.errorMessage;
  }
  if (
    route.path === "/signin" ||
    route.path === "/forgot-password" ||
    route.path === "/change-password" ||
    route.path === "/reset-link"
  ) {
    authPage.value = true;
  } else {
    authPage.value = false;
  }
});

watch(route, (newRoute) => {
  if (
    newRoute.path === "/signin" ||
    newRoute.path === "/forgot-password" ||
    newRoute.path === "/change-password" ||
    newRoute.path === "/reset-link"
  ) {
    authPage.value = true;
  } else {
    authPage.value = false;
  }
});

watch(store.state, async (newState) => {
  authPage.value = !newState.auth.loggedIn;
  loggedIn.value = newState.auth.loggedIn;
  tokenExpired.value = newState.auth.tokenExpired;
  errorMessage.value = newState.errorMessage;
  // Get Nodes Statuses
  if (
    loggedIn.value &&
    !newState.aspects.foundationStatuses.length &&
    !newState.errorMessage.length
  ) {
    await store.dispatch("aspects/fetchNodesStatuses");
    errorMessage.value = store.state.errorMessage;
  }

  if (tokenExpired.value) {
    localStorage.clear();
    router.push("/signin");
    location.reload();
  }
});
</script>
