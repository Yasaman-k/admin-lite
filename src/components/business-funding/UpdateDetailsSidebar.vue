<template>
  <div
    class="relative h-screen bg-[#FAFDFF] drop-shadow-lg px-8 pt-2 w-2/6 overflow-hidden"
  >
    <div
      :class="`h-full overflow-auto ${overflow ? 'pb-32' : ''}`"
      ref="content"
    >
      <BaseSidebarMessage
        message="Update business details"
        :text="`
          Click the buttons to the right of your business information below to copy and paste the correct business details into your ${
            account.funding_provider && account.funding_provider.title
              ? account.funding_provider.title
              : ''
          }
        `"
      />
      <BaseSidebarInput
        :copy="true"
        normalLabel="Owner Name"
        :value="businessInfo && businessInfo.owner ? businessInfo.owner : ''"
        :disabled="true"
      />
      <BaseSidebarInput
        :copy="true"
        normalLabel="Business Name"
        :value="
          businessInfo && businessInfo.company ? businessInfo.company.data : ''
        "
        :disabled="true"
      />
      <BaseSidebarInput
        :copy="true"
        normalLabel="Business Address"
        :value="
          businessInfo && businessInfo.business_address_street
            ? businessInfo.business_address_street.data
            : ''
        "
        :disabled="true"
      />
      <BaseSidebarInput
        :copy="true"
        v-if="businessInfo && businessInfo.business_address_line2"
        :value="
          businessInfo && businessInfo.business_address_line2
            ? businessInfo.business_address_line2.data
            : ''
        "
        :disabled="true"
      />
      <BaseSidebarInput
        :copy="true"
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
        :copy="true"
        :value="
          businessInfo && businessInfo.business_address_zip
            ? businessInfo.business_address_zip.data
            : ''
        "
        :disabled="true"
      />
      <BaseSidebarInput
        :copy="true"
        normalLabel="Business Phone"
        :value="
          businessInfo && businessInfo.business_phone
            ? businessInfo.business_phone.data
            : ''
        "
        :disabled="true"
      />
      <BaseSidebarActions :actions="actionBtns" extraClasses="!justify-end" />
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

// Data
const content = ref(null);
const overflow = ref(false);
const account = ref("");
const businessInfo = ref([]);
const actionBtns = ref([
  {
    name: "Details Updated",
    disabled: false,
    style: "",
    handleAction: async () => {
      await store.dispatch("funding/sendAccountBasicData", {
        accountID: account.value.id,
        confirmed_at: moment().format("DD/MM/YYYY hh:mm:ss"),
      });
      router.push("/funding-manager");
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

  account.value = vendorProviderAccount;

  // Get Fields values getOwnershipsOwners
  let businessAddressFields =
    store.getters["businessAddress/getBusinessAddressFields"];
  let owner = store.getters["ownership/getOwnershipOwners"];
  let businessPhoneFields =
    store.getters["businessPhone/getBusinessPhoneFields"];
  // ---> Business Address Fields
  if (!businessAddressFields.length) {
    await store.dispatch("businessAddress/fetchBusinessAddressFields");
    businessAddressFields =
      store.getters["businessAddress/getBusinessAddressFields"];
  }
  if (businessAddressFields.length) {
    // Set Business Info Data
    businessAddressFields.map((field) => {
      businessInfo.value[Object.keys(field)[0]] = Object.values(field)[0];
    });
  }
  // ---> Owner Name businessPhone
  if (!owner.length) {
    await store.dispatch("ownership/getOwnershipsOwners");
    owner = store.getters["ownership/getOwnershipOwners"];
  }
  owner.length
    ? (businessInfo.value.owner = owner[0].name)
    : (businessInfo.value.owner = "");

  // --->
  if (!businessPhoneFields.length) {
    await store.dispatch("businessPhone/fetchBusinessPhoneFields");
    businessPhoneFields = store.getters["businessPhone/getBusinessPhoneFields"];
  }
  businessPhoneFields.length
    ? businessPhoneFields.map((field) => {
        if (Object.keys(field)[0] === "business_phone") {
          businessInfo.value[Object.keys(field)] = Object.values(field)[0];
        }
      })
    : (businessInfo.value.business_phone = { data: "" });
});

onMounted(() => {
  if (content.value.clientHeight < content.value.scrollHeight) {
    return (overflow.value = true);
  }
  return (overflow.value = false);
});
</script>
