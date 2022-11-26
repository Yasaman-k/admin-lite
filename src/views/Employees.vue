<template>
  <div class="fixed right-0 z-30 bg-white" id="employees-header">
    <PageHeader />
  </div>
  <section
    class="min-h-screen overflow-hidden relative flex gap-10 justify-between"
  >
    <SpinnerLoader v-if="!checkPointExist" pageHeaderId="employees-header" />
    <div id="employees-content" class="content">
      <router-view></router-view>
    </div>
    <base-foundation-right-bar
      activeNode="employees"
      :nodeLink="employeesLink"
      pageHeaderId="employees-header"
      pageContentId="employees-content"
      aspectTitle="Financials"
      :aspectStatuses="financialNodes"
      :aspectStatusesDb="financialStatuses"
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
import { financialNodes } from "../constants";

const store = useStore();
const router = useRouter();
const route = useRoute();

// Data
const checkPointExist = ref(false);
const employeesLink = ref("");
const financialStatuses = ref(store.getters["aspects/getFinancialsStatuses"]);

onBeforeMount(async () => {
  await store.dispatch("employees/fetchEmployeesNumber");

  const fields = store.getters["employees/getEmployees"];

  const employeesNumber = fields.find((field) =>
    Object.prototype.hasOwnProperty.call(field, "employees_number")
  );

  if (
    employeesNumber &&
    employeesNumber.employees_number.data &&
    employeesNumber.employees_number.data > 0
  ) {
    checkPointExist.value = true;
    return router.push("/fundability/financials/employees/confirmation");
  } else {
    checkPointExist.value = true;
    return router.push("/fundability/financials/employees");
  }
});

onUpdated(() => {
  employeesLink.value = route.fullPath;
});
</script>
