<template>
  <form @submit.prevent class="mt-5">
    <BaseInput
      @input="
        (e) => {
          dateValid = true;
          maskDate(e.target);
        }
      "
      @blur="(e) => updateDate(e.target.value)"
      @focus="(e) => focus(e.target)"
      :value="date"
      label="Entry Date"
      placeholder="MM/DD/YY"
      length="10"
      :error="!dateValid"
      :errorMessage="validMessage"
    />
    <div class="flex justify-end items-center gap-5 mt-6">
      <router-link to="/" class="btn-secondary" tabindex="1" @click="goBack">
        Go Back
      </router-link>
      <button type="submit" class="btn-primary" :disabled="saveDisable">
        Save
      </button>
    </div>
  </form>
</template>

<script>
import moment from "moment";
import BaseInput from "./BaseInput.vue";
export default {
  data() {
    return {
      date: "",
      dateValid: true,
      validMessage: "Date is required.",
    };
  },
  methods: {
    focus(input) {
      if (moment(this.date, "MMMM DD, YYYY", true).isValid()) {
        input.value = moment(this.date).format("MM/DD/YYYY");
        return (this.date = input.value);
      }
    },
    maskDate(input) {
      if (/[0-9\\.\\/\\/]\d*$/.test(input.value)) {
        const newVal = input.value
          .replace(/\D/g, "")
          .match(/(\d{0,2})(\d{0,2})(\d{0,4})/);
        const date = !newVal[2]
          ? newVal[1]
          : newVal[1] + "/" + newVal[2] + (newVal[3] ? "/" + newVal[3] : "");
        input.oldValue = date;
        this.date = date;
        input.oldSelectionStart = input.selectionStart;
        input.oldSelectionEnd = input.selectionEnd;
        // eslint-disable-next-line no-prototype-builtins
      } else if (input.hasOwnProperty("oldValue") && input.value.length > 1) {
        input.value = input.oldValue;
        this.date = input.oldValue;
        input.setSelectionRange(input.oldSelectionStart, input.oldSelectionEnd);
      } else {
        input.value = "";
        this.date = "";
      }
    },
    updateDate(date) {
      if (date.length === 0) {
        this.dateValid = false;
        return (this.validMessage = "Date is required.");
      } else if (
        moment(date).format("MMMM DD, YYYY") === "Invalid date" ||
        !/(\d{2})[/](\d{2})[/](\d{4})/.test(date)
      ) {
        this.dateValid = false;
        return (this.validMessage = "Date is invalid.");
      }
      this.dateValid = true;
      return (this.date = moment(date).format("MMMM DD, YYYY"));
    },
    goBack() {
      this.$emit("goBack");
    },
  },
  computed: {
    saveDisable() {
      if (
        moment(this.date).format("MMMM DD, YYYY") != "Invalid date" &&
        (moment(this.date, "MMMM DD, YYYY", true).isValid() ||
          /(\d{2})[/](\d{2})[/](\d{4})/.test(this.date))
      ) {
        return false;
      }
      return true;
    },
  },
  components: { BaseInput },
};
</script>
