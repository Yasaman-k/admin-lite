<template>
  <form @submit.prevent="save" class="mt-5">
    <BaseInput
      @input="
        (e) => {
          phoneValid = true;
          maskPhone(e.target);
          return formValid();
        }
      "
      @blur="(e) => businessNumberValid(e.target.value)"
      :required="true"
      :value="businessNumber"
      length="12"
      :error="!phoneValid"
      label="Enter your business number"
      placeholder="987-234-2398"
      :errorMessage="businessNumberErrorMessage"
    />
    <BaseInput
      @input="(e) => (serviceProvider = e.target.value)"
      :required="true"
      :value="serviceProvider"
      label="Enter phone service provider"
      placeholder="Enter phone service provider"
      errorMessage="Service provider is required."
      class="mt-4"
    />
    <BaseBackNextBtns nextLabel="Save" :nextDisabled="saveDisable" />
  </form>
</template>

<script>
import BaseInput from "../BaseInput.vue";
import BaseBackNextBtns from "../BaseBackNextBtns.vue";
export default {
  data() {
    return {
      formIsValid: false,
      businessNumber: "",
      businessNumberErrorMessage: "Business Phone Number is required.",
      serviceProvider: "",
      phoneValid: true,
    };
  },
  methods: {
    maskPhone(input) {
      if (/[0-9\\.\-\\/]\d*$/.test(input.value)) {
        const newVal = input.value
          .replace(/\D/g, "")
          .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
        input.oldValue = !newVal[2]
          ? newVal[1]
          : newVal[1] + "-" + newVal[2] + (newVal[3] ? "-" + newVal[3] : "");
        this.businessNumber = !newVal[2]
          ? newVal[1]
          : newVal[1] + "-" + newVal[2] + (newVal[3] ? "-" + newVal[3] : "");
        input.oldSelectionStart = input.selectionStart;
        input.oldSelectionEnd = input.selectionEnd;
        // eslint-disable-next-line no-prototype-builtins
      } else if (input.hasOwnProperty("oldValue") && input.value.length > 1) {
        input.value = input.oldValue;
        this.businessNumber = input.oldValue;
        input.setSelectionRange(input.oldSelectionStart, input.oldSelectionEnd);
      } else {
        input.value = "";
        this.businessNumber = "";
      }
    },
    businessNumberValid(val) {
      if (!/^[0-9]{3}[-][0-9]{3}[-][0-9]{4}$/im.test(val) && val.length != 0) {
        this.businessNumberErrorMessage = "Business Phone Number is invalid.";
        return (this.phoneValid = false);
      }
      this.businessNumberErrorMessage = "Business Phone Number is required.";
      return (this.phoneValid = true);
    },
    formValid() {
      const phoneIsValid = /^[0-9]{3}[-][0-9]{3}[-][0-9]{4}$/im.test(
        this.businessNumber
      );
      if (phoneIsValid) {
        return (this.formIsValid = true);
      }
      return (this.formIsValid = false);
    },
    goBack() {
      this.$emit("goBack");
    },
    async save() {
      await this.$store.dispatch(
        "businessPhone/sendBusinessPhoneConfirmation",
        {
          value: true,
        }
      );
      await this.$store.dispatch("businessPhone/sendBusinessPhoneFields", [
        {
          type: "business_phone",
          value: this.businessNumber,
        },
        {
          type: "business_phone_provider",
          value: this.serviceProvider,
        },
      ]);
      await this.$store.dispatch("aspects/fetchFoundationStatuses", [
        "business_phone",
      ]);
      this.$router.push(
        "/fundability/foundation/business-phone/business-phone-form-confirm"
      );
    },
  },
  computed: {
    saveDisable() {
      if (
        this.phoneValid &&
        this.serviceProvider.length >= 1 &&
        this.formIsValid
      ) {
        return false;
      }
      return true;
    },
    businessPhoneFields() {
      return this.$store.state.businessPhone.businessPhoneFields;
    },
  },
  mounted() {
    if (this.businessPhoneFields.length) {
      const businessNumber = this.businessPhoneFields.find((field) => {
        return Object.keys(field)[0] === "business_phone";
      });
      businessNumber && businessNumber.business_phone.data
        ? (this.businessNumber = businessNumber.business_phone.data)
        : (this.businessNumber = "");

      const serviceProvider = this.businessPhoneFields.find((field) => {
        return Object.keys(field)[0] === "business_phone_provider";
      });
      serviceProvider && serviceProvider.business_phone_provider.data
        ? (this.serviceProvider = serviceProvider.business_phone_provider.data)
        : (this.serviceProvider = "");
    }
    return this.formValid();
  },
  components: { BaseInput, BaseBackNextBtns },
};
</script>
