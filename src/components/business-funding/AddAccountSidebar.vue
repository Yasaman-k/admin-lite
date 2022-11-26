<template>
  <div
    class="h-screen relative bg-[#FAFDFF] drop-shadow-lg px-8 pt-2 w-2/6 overflow-hidden"
  >
    <div class="h-full overflow-auto">
      <div>
        <h5 class="mb-2 text-[#196499] text-lg">How to Apply:</h5>
        <ul class="list-none flex flex-col gap-3">
          <li
            v-for="(applyingStep, index) in applyingSteps"
            :key="index"
            class="flex items-center gap-3"
          >
            <span class="text-[#196499] font-semibold">{{
              `Step${index + 1}:`
            }}</span>
            {{ applyingStep }}
          </li>
        </ul>
      </div>
      <form class="flex flex-col mt-5 pb-36">
        <BaseVendorField label="Business Email" :value="fields.email" />
        <BaseVendorField label="Business Name" :value="fields.company.data" />
        <BaseVendorField
          label="Business Address"
          :value="fields.business_address_street.data"
        />
        <BaseVendorField
          label=""
          v-if="fields.business_address_line2.data"
          :value="fields.business_address_line2.data"
        />
        <BaseVendorField
          label=""
          :value="`${fields.business_address_state.data}, ${fields.business_address_city.data}`"
        />
        <BaseVendorField label="" :value="fields.business_address_zip.data" />
        <BaseVendorField label="EIN" :value="fields.business_ein.data" />
        <div class="mt-4 flex gap-2 items-center">
          <input
            type="checkbox"
            name="exact-match"
            id="exact-match"
            class="w-5 h-5 text-[#196499] cursor-pointer"
            @change="handleCheckbox"
          />
          <label
            for="exact-match"
            class="text-[#196499] font-medium cursor-pointer"
            >My Business Info is an Exact Match</label
          >
        </div>
      </form>
    </div>
    <BaseSidebarActions :actions="[addAccountBtn]" />
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import BaseVendorField from "./BaseVendorField.vue";
import BaseSidebarActions from "./BaseSidebarActions.vue";

const route = useRoute();
const store = useStore();

const emits = defineEmits(["addAccount"]);
const addNewAccount = () => emits("addAccount", vendorId.value);

// Refs
const fields = ref({
  email: "",
  ein: "",
  company: {
    data: "",
  },
  business_address_street: {
    data: "",
  },
  business_address_city: {
    data: "",
  },
  business_address_state: {
    data: "",
  },
  business_address_zip: {
    data: "",
  },
  business_address_line2: {
    data: "",
  },
  business_ein: {
    data: "",
  },
});

const addAccountBtn = ref({
  name: "Add Account To Funding Manager",
  disabled: true,
  style: "primary",
  handleAction: addNewAccount,
});

const vendorId = ref(null);

// Props
defineProps({
  applyingSteps: {
    type: Array,
    default: () => [],
  },
});

// Methods
const handleCheckbox = (e) =>
  (addAccountBtn.value.disabled = !e.target.checked);

// Hooks
onBeforeMount(async () => {
  await store.dispatch("ein/fetchEINFields");
  await store.dispatch("websiteEmail/fetchWebsiteEmailFields");

  // Get Business Address
  const einFields = store.getters["ein/getEINFields"];
  einFields.length &&
    einFields.map((field) => {
      return (fields.value[Object.keys(field)[0]] = Object.values(field)[0]);
    });

  // Get Email
  const websiteEmailFields =
    store.getters["websiteEmail/getWebsiteEmailFields"];
  const email = websiteEmailFields.find((field) => {
    return Object.keys(field)[0] === "business_email";
  });
  if (email) {
    email.business_email && email.business_email.data
      ? (fields.value.email = email.business_email.data)
      : (fields.value.email = "");
  }

  // Get current vendor id
  const vendors = store.getters["funding/getVendors"];
  const vendorProviderSlug = route.params.provider;
  let vendorProvider = vendors.find(
    (vendor) => vendor.slug === vendorProviderSlug
  );

  vendorId.value = vendorProvider ? vendorProvider.id : "";
});
</script>
