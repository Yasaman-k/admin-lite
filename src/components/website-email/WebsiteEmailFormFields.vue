<template>
  <form @submit.prevent="save" class="mt-5">
    <BaseInput
      @input="
        (e) => {
          websiteError = false;
          website = e.target.value;
          return formValid();
        }
      "
      @blur="(e) => websiteValidation(e.target.value)"
      label="Business Website"
      placeholder="www.johndough.com"
      :value="website"
      :errorMessage="websiteErrorMessage"
      :error="websiteError"
    />
    <BaseInput
      @input="
        (e) => {
          emailError = false;
          email = e.target.value;
          return formValid();
        }
      "
      @blur="(e) => emailValidation(e.target.value)"
      label="Business Email"
      placeholder="@busin"
      :value="email"
      :errorMessage="emailErrorMessage"
      :error="emailError"
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
      website: "",
      websiteError: false,
      websiteErrorMessage: "Website is required.",
      email: "",
      emailError: false,
      emailErrorMessage: "Email is required.",
    };
  },
  methods: {
    formValid() {
      const websiteExp =
        /^((ftp|http|https):\/\/)?(www\.)?([a-zA-Z0-9_.-]+)\.([A-z]{2,})/;
      const emailExp =
        /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\]\\.,;:\s@\\"]+\.)+[^<>()[\]/.,;:\s@/"]{2,})$/i;
      if (this.website.length === 0) {
        return (this.formIsValid = false);
      } else if (!websiteExp.test(this.website)) {
        return (this.formIsValid = false);
      }
      if (this.email.length === 0) {
        return (this.formIsValid = false);
      } else if (!emailExp.test(this.email)) {
        return (this.formIsValid = false);
      }
      return (this.formIsValid = true);
    },
    websiteValidation(val) {
      const exp =
        /^((ftp|http|https):\/\/)?(www\.)?([a-zA-Z0-9_.-]+)\.([A-z]{2,})/;
      if (val.length === 0) {
        this.websiteErrorMessage = "Website is required.";
        this.formIsValid = false;
        return (this.websiteError = true);
      } else if (!exp.test(val)) {
        this.websiteErrorMessage = "Website is invalid.";
        return (this.websiteError = true);
      }
      return (this.websiteError = false);
    },
    emailValidation(val) {
      const exp =
        /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\]\\.,;:\s@\\"]+\.)+[^<>()[\]/.,;:\s@/"]{2,})$/i;
      if (val.length === 0) {
        this.emailErrorMessage = "Email is required.";
        return (this.emailError = true);
      } else if (!exp.test(val)) {
        this.emailErrorMessage = "Email is invalid.";
        return (this.emailError = true);
      }
      return (this.emailError = false);
    },
    async save() {
      await this.$store.dispatch("websiteEmail/sendWebsiteEmailConfirmation", {
        value: true,
      });
      await this.$store.dispatch("websiteEmail/sendWebsiteEmailFields", [
        {
          type: "business_website",
          value: this.website,
        },
        {
          type: "business_email",
          value: this.email,
        },
      ]);
      await this.$store.dispatch("aspects/fetchFoundationStatuses", [
        "website_and_email",
      ]);
      this.$router.push(
        "/fundability/foundation/website-email/website-form-confirm"
      );
    },
  },
  computed: {
    saveDisable() {
      if (
        this.website.length >= 1 &&
        this.websiteError === false &&
        this.email.length >= 1 &&
        this.emailError === false &&
        this.formIsValid
      ) {
        return false;
      }
      return true;
    },
    websiteEmailFields() {
      return this.$store.state.websiteEmail.websiteEmailFields;
    },
  },
  mounted() {
    if (this.websiteEmailFields.length) {
      const website = this.websiteEmailFields.filter((field) => {
        return Object.keys(field)[0] === "business_website";
      });
      if (website) {
        website.length && website[0].business_website.data
          ? (this.website = website[0].business_website.data)
          : (this.website = "");
      }
      const email = this.websiteEmailFields.filter((field) => {
        return Object.keys(field)[0] === "business_email";
      });
      if (email) {
        email.length && email[0].business_email.data
          ? (this.email = email[0].business_email.data)
          : (this.email = "");
      }
    }
    return this.formValid();
  },
  components: { BaseInput, BaseBackNextBtns },
};
</script>
