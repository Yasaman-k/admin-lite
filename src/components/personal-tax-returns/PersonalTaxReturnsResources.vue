<template>
  <section class="container my-16 px-20">
    <BaseWarning
      icon="Warning"
      title="File your Personal tax returns"
      message="Your personal tax returns can impact your ability to get business loans and lines. File your personal tax returns to increase your chances of being funded."
    />
    <BaseResources
      text="Click below to learn more and File your Personal Tax Returns."
      :resources="resources"
    />
    <BaseBackNextBtns
      :nextLabel="nextLabel"
      :nextDisabled="false"
      @next="next"
    />
  </section>
</template>

<script>
import BaseWarning from "../BaseWarning.vue";
import BaseResources from "../BaseResources.vue";
import BaseBackNextBtns from "../BaseBackNextBtns.vue";

export default {
  data() {
    return {
      fromPage: "",
      nextLabel: "",
      resources: [
        {
          id: 1,
          title: "Regus Virtual Offices",
          image: "/images/regus.png",
          link: "/",
        },
      ],
    };
  },
  beforeMount() {
    const confirmations =
      this.$store.getters[
        "personalTaxReturns/getPersonalTaxReturnsConfirmations"
      ];

    // Determine Checkpoint
    if (confirmations.length) {
      // Get Up-to-date Confirmation
      let upToDateConfirmation = "";
      upToDateConfirmation = confirmations.find((field) =>
        Object.prototype.hasOwnProperty.call(
          field,
          "has_personal_tax_returns_updated"
        )
      );

      upToDateConfirmation &&
      upToDateConfirmation.has_personal_tax_returns_updated &&
      (upToDateConfirmation.has_personal_tax_returns_updated.value === false ||
        upToDateConfirmation.has_personal_tax_returns_updated.value === true)
        ? (upToDateConfirmation =
            upToDateConfirmation.has_personal_tax_returns_updated.value)
        : (upToDateConfirmation = null);

      // Get Extensions Confirmation
      let extensionConfirmation = "";
      extensionConfirmation = confirmations.find((field) =>
        Object.prototype.hasOwnProperty.call(
          field,
          "has_personal_tax_returns_filed_for_extension"
        )
      );
      extensionConfirmation &&
      extensionConfirmation.has_personal_tax_returns_filed_for_extension &&
      (extensionConfirmation.has_personal_tax_returns_filed_for_extension
        .value === false ||
        extensionConfirmation.has_personal_tax_returns_filed_for_extension
          .value === true)
        ? (extensionConfirmation =
            extensionConfirmation.has_personal_tax_returns_filed_for_extension
              .value)
        : (extensionConfirmation = null);

      // Get Back Taxes Confirmation
      let backTaxesConfirmation = "";
      backTaxesConfirmation = confirmations.find((field) =>
        Object.prototype.hasOwnProperty.call(
          field,
          "has_no_personal_back_taxes"
        )
      );
      backTaxesConfirmation &&
      backTaxesConfirmation.has_no_personal_back_taxes &&
      (backTaxesConfirmation.has_no_personal_back_taxes.value === false ||
        backTaxesConfirmation.has_no_personal_back_taxes.value === true)
        ? (backTaxesConfirmation =
            backTaxesConfirmation.has_no_personal_back_taxes.value)
        : (backTaxesConfirmation = null);

      if (
        upToDateConfirmation &&
        extensionConfirmation &&
        !backTaxesConfirmation &&
        backTaxesConfirmation != null
      ) {
        this.nextLabel = "I have updated my back taxes";
        return (this.fromPage = "back-taxes");
      } else if (
        upToDateConfirmation &&
        !extensionConfirmation &&
        extensionConfirmation != null
      ) {
        this.nextLabel = "I have filed for extension";
        return (this.fromPage = "extension");
      }
      this.nextLabel = "I Have my Personal Tax Returns";
      return (this.fromPage = "");
    }
  },
  methods: {
    next() {
      if (this.fromPage === "") {
        return this.$router.push("/fundability/financials/personal-tax");
      } else if (this.fromPage === "extension") {
        return this.$router.push(
          "/fundability/financials/personal-tax/extension"
        );
      }
      this.$router.push("/fundability/financials/personal-tax/back-taxes");
    },
  },
  components: { BaseWarning, BaseResources, BaseBackNextBtns },
};
</script>
