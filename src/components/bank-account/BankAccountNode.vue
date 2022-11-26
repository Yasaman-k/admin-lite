<template>
  <form @submit.prevent="onSubmit" class="mt-5">
    <BaseInput
      @input="(e) => (fastFunds = e.target.value)"
      :required="true"
      :value="fastFunds"
      label="Fast Funds Credit Union"
      errorMessage="Fast Funds Credit Union is required."
      placeholder="Fast Funds Credit Union"
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
      fastFunds: "",
    };
  },
  methods: {
    async onSubmit() {
      await this.$store.dispatch(
        "bankAccount/setBankAccountConfirmation",
        "Yes"
      );
      await this.$store.dispatch(
        "bankAccount/setBusinessBankAccount",
        this.fastFunds
      );
      return this.$router.push(
        "/fundability/financials/business-account/bank-account-match"
      );
    },
  },
  async mounted() {
    const fields = this.$store.state.bankAccount.bankAccountFields;
    if (!fields.length) {
      await this.$store.dispatch("bankAccount/fetchBankAccountFields");
    }
    this.fastFunds = fields.find((field) =>
      Object.prototype.hasOwnProperty.call(field, "business_bank_account")
    );
    this.fastFunds
      ? (this.fastFunds = this.fastFunds.business_bank_account.data)
      : (this.fastFunds = "");
  },
  computed: {
    saveDisable() {
      if (this.fastFunds.length >= 1) {
        return false;
      }
      return true;
    },
  },
  components: { BaseInput, BaseBackNextBtns },
};
</script>
