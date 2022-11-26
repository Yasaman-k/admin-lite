<template>
  <section class="container my-16 px-20">
    <FormHeader
      formTitle="Business Entity"
      icon="Location"
      iconColor="text-red-500"
      linkText="When did you register with the Secretary of State"
      desc="Please enter the month and year you registered:"
    />
    <div class="mt-10">
      <BaseInput
        @input="
          (e) => {
            dateValid = true;
            maskDate(e.target);
          }
        "
        @focus="(e) => focus(e.target)"
        @blur="(e) => updateDate(e.target.value)"
        :value="date"
        label="When did you file? MM/YYYY"
        placeholder="Month YYYY"
        length="10"
        :error="!dateValid"
        :errorMessage="validMessage"
      />
    </div>
    <BaseBackNextBtns
      nextLabel="Next"
      :nextDisabled="nextDisable"
      :BackBtnHidden="true"
      @next="goNext"
    />
  </section>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import moment from "moment";
import { onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import FormHeader from "../FormHeader.vue";
import BaseInput from "../BaseInput.vue";
import BaseBackNextBtns from "../BaseBackNextBtns.vue";

const router = useRouter();
const store = useStore();

//Data
const nextDisable = ref(true);
const date = ref("");
const dateValid = ref(true);
const validMessage = ref("Date is required.");

//methods
const focus = (input) => {
  const dateArr = date.value.split("/");
  let month = dateArr[0];
  let year = dateArr[1];
  if (moment(month + "/01/" + year, "MMMM YYYY", true).isValid()) {
    input.value = moment(month + "/01/" + year).format("MMMM YYYY");
    return (date.value = input.value);
  }
};

const maskDate = (input) => {
  if (/[0-9\\.\\/]\d*$/.test(input.value) && input.value.length <= 7) {
    const newVal = input.value.replace(/\D/g, "").match(/(\d{0,2})(\d{0,4})/);
    const newDate = !newVal[2] ? newVal[1] : newVal[1] + "/" + newVal[2];
    input.oldValue = newDate;
    date.value = newDate;
    input.oldSelectionStart = input.selectionStart;
    input.oldSelectionEnd = input.selectionEnd;

    if (input.value.length === 7) {
      const checkDate = updateDate(date.value);
      if (checkDate.toLowerCase() != "date is invalid") {
        nextDisable.value = false;
      } else {
        nextDisable.value = true;
      }
    } else {
      nextDisable.value = true;
    }
    // eslint-disable-next-line no-prototype-builtins
  } else if (input.hasOwnProperty("oldValue") && input.value.length > 1) {
    input.value = input.oldValue;
    date.value = input.oldValue;
    input.setSelectionRange(input.oldSelectionStart, input.oldSelectionEnd);
  } else {
    input.value = "";
    date.value = "";
    nextDisable.value = true;
  }
};

const updateDate = (newDate) => {
  if (newDate.length === 0) {
    dateValid.value = false;
    return (validMessage.value = "Date is required.");
  } else if (newDate.length === 7) {
    const dateArr = newDate.split("/");
    let month = dateArr[0];
    let year = dateArr[1];
    let currentDate = new Date();
    let currentYear = moment(currentDate).format("YYYY");

    if (
      parseFloat(month) > 0 &&
      parseFloat(month) < 13 &&
      parseFloat(year) > 1900 &&
      parseFloat(year) <= parseFloat(currentYear)
    ) {
      dateValid.value = true;
      nextDisable.value = false;
      return (date.value = moment(month + "/01/" + year).format("MMMM YYYY"));
    }

    dateValid.value = false;
    nextDisable.value = false;
    return (validMessage.value = "Date is invalid.");
  }
  dateValid.value = true;
  return (date.value = moment("01/" + newDate).format("MMMM YYYY"));
};

const goNext = async () => {
  const entityFields = store.getters["entity/getEntityFields"];

  if (entityFields.length) {
    const entity_type = entityFields.filter((field) => {
      return Object.keys(field)[0] === "entity_type";
    });

    if (entity_type[0].entity_type.data.const) {
      await store.dispatch("entity/sendEntityFields", [
        {
          type: "business_created_at",
          value: date.value,
        },
      ]);

      if (entity_type[0].entity_type.data.const === "LLC / LLP") {
        return router.push(
          `/fundability/foundation/business-entity/llc/resources`
        );
      } else if (
        entity_type[0].entity_type.data.const === "Corporation (S or C)"
      ) {
        return router.push(
          `/fundability/foundation/business-entity/s-or-c/resources`
        );
      } else if (entity_type[0].entity_type.data.const === "Partnership") {
        return router.push(
          `/fundability/foundation/business-entity/partnership/resources`
        );
      }
    }
  }
};

//Hooks

onMounted(() => {
  const entityFields = store.getters["entity/getEntityFields"];
  if (entityFields.length) {
    // Date
    const businessCreatedAt = entityFields.filter((field) => {
      return Object.keys(field)[0] === "business_created_at";
    });
    if (businessCreatedAt) {
      businessCreatedAt.length && businessCreatedAt[0].business_created_at.data
        ? (date.value = businessCreatedAt[0].business_created_at.data)
        : (date.value = "");
    }
  }

  if (
    moment(date.value).format("MMMM YYYY") != "Invalid date" &&
    (moment(date.value, "MMMM YYYY", true).isValid() ||
      /(\d{2})[/](\d{2})[/](\d{4})/.test(date.value))
  ) {
    return (nextDisable.value = false);
  }
  return (nextDisable.value = true);
});
</script>
