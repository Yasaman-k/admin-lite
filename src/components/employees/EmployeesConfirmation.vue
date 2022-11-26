<template>
  <section class="container my-16 px-20">
    <BaseWarning
      v-if="warning"
      icon="Warning"
      title="Access more funding with 100+ employees"
      message="Some lenders require a business to have over one hundred W2 employees to qualify for certain types of funding programs. "
    />
    <FormHeader
      v-else
      formTitle="Employee count saved"
      icon="CommercialAddress"
      linkText="Number of employees is recorded as follows:"
      desc="Click “Update Employee” to make changes. "
    />
    <BaseInput
      label="Number Of Employees "
      :value="employeesNumber"
      :disabled="true"
      class="mt-10"
    />
    <BaseUpdateNextBtns
      updateLabel="Update Employees"
      updateLink="/fundability/financials/employees"
      nextLabel="Business Credit Report"
      nextLink="/fundability/business-credit-report"
    />
  </section>
</template>

<script setup>
import { onBeforeMount, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
import FormHeader from "../FormHeader.vue";
import BaseUpdateNextBtns from "../BaseUpdateNextBtns.vue";
import BaseInput from "../BaseInput.vue";
import BaseWarning from "../BaseWarning.vue";

const store = useStore();

// Data
const warning = ref(false);
const employeesNumber = ref("");
const financialStatuses = ref(store.getters["aspects/getFinancialsStatuses"]);

// Hooks
onBeforeMount(async () => {
  const fields = store.getters["employees/getEmployees"];

  employeesNumber.value = fields.find((field) =>
    Object.prototype.hasOwnProperty.call(field, "employees_number")
  );

  employeesNumber.value && employeesNumber.value.employees_number.data
    ? (employeesNumber.value = employeesNumber.value.employees_number.data)
    : (employeesNumber.value = "--");

  const status = financialStatuses.value.find((item) =>
    Object.prototype.hasOwnProperty.call(item, "employees")
  );

  if (
    status["employees"].toLowerCase() == "caution" ||
    employeesNumber.value < 100
  ) {
    warning.value = true;
  } else {
    warning.value = false;
  }
});
</script>
