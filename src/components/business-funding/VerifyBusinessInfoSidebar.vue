<template>
  <div
    class="relative h-screen bg-[#FAFDFF] drop-shadow-lg px-8 pt-2 w-2/6 overflow-hidden"
  >
    <div
      :class="`h-full overflow-auto ${overflow ? 'pb-32' : ''}`"
      ref="content"
    >
      <BaseSidebarMessage
        message="Verify your business information:"
        :text="`
          <p class='block mb-3'>
          The business information below was previously verified and is currently stored as your most up-to-date information in Fundability Foundation. Does the information below match what’s on file with
          ${
            currentAccount.funding_provider &&
            currentAccount.funding_provider.title
              ? currentAccount.funding_provider.title
              : ''
          }?
          </p>
          **Abbreviations and special characters must match.
        `"
      />
      <BaseSidebarInput
        normalLabel="Owner Name"
        :value="businessInfo && businessInfo.owner ? businessInfo.owner : ''"
        :disabled="true"
      />
      <BaseSidebarInput
        normalLabel="Business Name"
        :value="
          businessInfo && businessInfo.company ? businessInfo.company.data : ''
        "
        :disabled="true"
      />
      <BaseSidebarInput
        normalLabel="Business Address"
        :value="
          businessInfo && businessInfo.business_address_street
            ? businessInfo.business_address_street.data
            : ''
        "
        :disabled="true"
      />
      <BaseSidebarInput
        v-if="businessInfo && businessInfo.business_address_line2"
        :value="
          businessInfo && businessInfo.business_address_line2
            ? businessInfo.business_address_line2.data
            : ''
        "
        :disabled="true"
      />
      <BaseSidebarInput
        :value="
          businessInfo && businessInfo.business_address_state
            ? businessInfo.business_address_state.data +
              ', ' +
              businessInfo.business_address_city.data
            : ''
        "
        :disabled="true"
      />
      <BaseSidebarInput
        :value="
          businessInfo && businessInfo.business_address_zip
            ? businessInfo.business_address_zip.data
            : ''
        "
        :disabled="true"
      />
      <BaseSidebarActions :actions="actionBtns" />
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import moment from "moment";
import BaseSidebarMessage from "./BaseSidebarMessage.vue";
import BaseSidebarInput from "./BaseSidebarInput.vue";
import BaseSidebarActions from "./BaseSidebarActions.vue";

const store = useStore();
const route = useRoute();
const router = useRouter();

const emits = defineEmits(["goNext"]);
// Data
const content = ref(null);
const overflow = ref(false);
const currentAccount = ref("");
const businessInfo = ref([]);
const actionBtns = ref([
  {
    name: "Exact Match",
    disabled: false,
    style: "",
    handleAction: async () => {
      await store.dispatch("funding/sendAccountBasicData", {
        accountID: currentAccount.value.id,
        confirmed_at: moment().format("DD/MM/YYYY hh:mm:ss"),
        address_match: true,
      });
      router.push("/funding-manager");
    },
  },
  {
    name: "Does Not Match",
    disabled: false,
    style: "",
    handleAction: async () => {
      await store.dispatch("funding/sendAccountBasicData", {
        accountID: currentAccount.value.id,
        address_match: false,
      });
      emits("goNext");
    },
  },
]);

// Hooks
onBeforeMount(async () => {
  // Get Current Account
  const accounts = store.getters["funding/getFundingAccounts"];
  const vendorProviderSlug = route.params.provider;
  let vendorProviderAccount = accounts.find(
    (account) => account.funding_provider.slug === vendorProviderSlug
  );

  currentAccount.value = vendorProviderAccount;

  // Get Fields values getOwnershipsOwners
  let businessAddressFields =
    store.getters["businessAddress/getBusinessAddressFields"];
  let owner = store.getters["ownership/getOwnershipOwners"];
  if (!businessAddressFields.length) {
    await store.dispatch("businessAddress/fetchBusinessAddressFields");
    businessAddressFields =
      store.getters["businessAddress/getBusinessAddressFields"];
  }
  if (!owner.length) {
    await store.dispatch("ownership/getOwnershipsOwners");
    owner = store.getters["ownership/getOwnershipOwners"];
  }
  if (businessAddressFields.length) {
    // Set Business Info Data
    businessAddressFields.map((field) => {
      businessInfo.value[Object.keys(field)[0]] = Object.values(field)[0];
    });
  }
  owner.length
    ? (businessInfo.value.owner = owner[0].name)
    : (businessInfo.value.owner = "");
});

onMounted(() => {
  if (content.value.clientHeight < content.value.scrollHeight) {
    return (overflow.value = true);
  }
  return (overflow.value = false);
});
</script>
