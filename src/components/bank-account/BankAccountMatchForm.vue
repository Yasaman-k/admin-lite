<template>
  <form @submit.prevent="onSubmit" class="mt-5">
    <div class="grid grid-cols-2 gap-5">
      <BaseRadioButton
        @select="(val) => handleVal(val)"
        radioName="business-account"
        text="Exact Match"
        icon="HandYes"
        value="Yes"
      />
      <BaseRadioButton
        @select="(val) => handleVal(val)"
        radioName="business-account"
        text="Does Not Match"
        icon="HandNo"
        value="No"
      />
    </div>
    <BaseBackNextBtns :nextDisabled="nextDisable" />
  </form>
</template>

<script>
import BaseRadioButton from "../BaseRadioButton.vue";
import BaseBackNextBtns from "../BaseBackNextBtns.vue";
export default {
  data() {
    return {
      addressMatch: "",
    };
  },
  methods: {
    handleVal(val) {
      return (this.addressMatch = val);
    },
    async onSubmit() {
      if (this.addressMatch === "No") {
        await this.$store.dispatch("bankAccount/sendConfirmation", {
          type: "has_confirmed_address_matches_bank_account",
          requiredData: { value: false },
        });
      } else {
        const confirmation =
          this.$store.state.bankAccount.bankAccountConfirmation;
        const businessBankAccount =
          this.$store.state.bankAccount.businessBankAccount;
        await this.$store.dispatch("bankAccount/sendConfirmation", {
          type: "has_bank_account",
          requiredData: { value: confirmation === "Yes" },
        });
        await this.$store.dispatch("bankAccount/sendConfirmation", {
          type: "has_confirmed_address_matches_bank_account",
          requiredData: { value: true },
        });
        await this.$store.dispatch("bankAccount/sendBankAccountFields", [
          {
            type: "business_bank_account",
            value: businessBankAccount,
          },
        ]);
      }
      await this.$store.dispatch(
        "aspects/fetchFinancialsStatuses",
        "bank_account" 
      );
      if (this.addressMatch === "Yes") {
        return this.$router.push(
          "/fundability/financials/business-account/bank-account-form-confirm"
        );
      }
      return this.$router.push(
        "/fundability/financials/business-account/bank-account-update"
      );
    },
  },
  computed: {
    nextDisable() {
      if (this.addressMatch.length > 1) {
        return false;
      }
      return true;
    },
  },
  components: { BaseRadioButton, BaseBackNextBtns },
};
</script>
