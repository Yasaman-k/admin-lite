<template>
  <section class="container my-16 px-20">
    <FormHeader
      formTitle="W2 Employees"
      icon="Location"
      linkText="How many W2 employees work on your team?"
      desc="Some tradeline accounts offer funding based on the number of employees in the company. NOTE: Enter the total number excluding you."
    />
    <div class="relative mt-7">
      <BaseInput
        :required="true"
        :value="employeesNumber"
        label=""
        errorMessage="Total number of Employees are required."
        placeholder="10"
        @input="(e) => checkEmployee(e.target)"
      />
      <BaseBackNextBtns
        :BackBtnHidden="true"
        nextLabel="Next"
        :nextDisabled="nextDisable"
        @next="onSubmit"
      />
    </div>
  </section>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import BaseBackNextBtns from "../BaseBackNextBtns.vue";
import BaseInput from "../BaseInput.vue";
import FormHeader from "../FormHeader.vue";

const store = useStore();
const router = useRouter();

//data
const employeesNumber = ref("");

const nextDisable = ref(true);

//methods
const checkEmployee = (input) => {
  if (/^[1-9][0-9]*$/.test(input.value)) {
    employeesNumber.value = input.value;
    nextDisable.value = false;
  } else if (input.value.length > 1) {
    input.value = employeesNumber.value;
    nextDisable.value = false;
  } else {
    input.value = "";
    nextDisable.value = true;
  }
};

const onSubmit = async () => {
  nextDisable.value = true;
  await store.dispatch("employees/sendEmployeesNumber", [
    {
      type: "employees_number",
      value: employeesNumber.value,
    },
  ]);
  await store.dispatch("aspects/fetchFinancialsStatuses", ["employees"]);
  nextDisable.value = false;
  return router.push("/fundability/financials/employees/confirmation");
};

//Hooks
onMounted(() => {
  const fields = store.getters["employees/getEmployees"];

  employeesNumber.value = fields.find((field) =>
    Object.prototype.hasOwnProperty.call(field, "employees_number")
  );

  employeesNumber.value && employeesNumber.value.employees_number.data
    ? (employeesNumber.value = employeesNumber.value.employees_number.data)
    : (employeesNumber.value = "");

  if (employeesNumber.value === "") {
    nextDisable.value = true;
  } else {
    nextDisable.value = false;
  }
});
</script>