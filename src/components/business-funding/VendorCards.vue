<template>
  <div>
    <div v-if="vendors.length > 0" class="flex flex-wrap items-center gap-10">
      <BaseVendorCard
        v-for="vendor in vendors"
        :key="vendor.id"
        :name="vendor.title"
        :type="vendor.type"
        :image="vendor.logo"
        :to="vendor.url"
        :status="vendor.status"
        @onClick="() => openVendor(vendor)"
      />
    </div>
    <h2
      v-if="vendors.length === 0"
      class="text-[#196499] uppercase text-center text-xl mt-10"
    >
      There are no vendors found by your criteria.
    </h2>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import BaseVendorCard from "../BaseVendorCard.vue";

const store = useStore();
const router = useRouter();
const accounts = ref([]);

defineProps({
  vendors: {
    type: Array,
    default: () => [],
  },
});

const emits = defineEmits(["openVendor"]);

// Hooks
onBeforeMount(async () => {
  accounts.value = store.getters["funding/getFundingAccounts"];
  if (!accounts.value.length) {
    await store.dispatch("funding/fetchFundingAccounts");
    accounts.value = store.getters["funding/getFundingAccounts"];
  }
});
// Methods
const openVendor = (vendor) => {
  if (vendor.status === "applied") {
    const account = accounts.value.find(
      (account) => account.funding_provider.slug === vendor.slug
    );

    if (
      account.decision_received === "Undefined" ||
      account.decision_received === "False" ||
      (account.decision_received === "True" && account.approved !== "True") ||
      (account.decision_received === "True" &&
        account.approved !== "True" &&
        (account.approved_at === null ||
          (account.funding_term === null &&
            account.funding_term.title !== "Prepay"))) ||
      (account.funding_term && account.funding_term.title === "Prepay") ||
      account.amount_approved === null
    ) {
      return router.push(`/funding/provider/${vendor.slug}`);
    } else if (
      account.decision_received === "True" &&
      account.approved === "True" &&
      account.approved_at !== null &&
      account.funding_term !== null &&
      account.funding_term.title !== "Prepay" &&
      account.paid_at !== null &&
      account.invoiced === "True" &&
      account.address_match === false
    ) {
      return router.push(`/funding/provider/${vendor.slug}/verify-address`);
    } else if (
      account.decision_received === "True" &&
      account.approved === "True" &&
      account.approved_at !== null &&
      account.funding_term !== null &&
      account.funding_term.title !== "Prepay" &&
      account.paid_at !== null &&
      account.invoiced === "True"
    ) {
      return router.push(`/funding/provider/${vendor.slug}/completed`);
    }
    return router.push(`/funding/provider/${vendor.slug}/purchase-invoicing`);
  }
  emits("openVendor", vendor);
};
</script>
