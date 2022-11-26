<template>
  <form @submit.prevent class="mt-10">
    <BaseInput
      :copy="true"
      v-if="merchantAccount.length"
      :value="merchantAccount"
      label="Merchant Account"
      class="mt-7 text-[#196499]"
      :disabled="true"
    />
    <BaseInput
      :copy="true"
      :value="businessName"
      label="Business Name"
      class="mt-7 text-[#196499]"
      :disabled="true"
    />
    <BaseInput
      :copy="true"
      :value="addressLineOne"
      label="Address Line 1"
      :disabled="true"
      class="mt-7 text-[#196499]"
      placeholder=""
    />
    <BaseInput
      :copy="true"
      v-if="addressLineTwo.length"
      :value="addressLineTwo"
      label="Address Line 2"
      class="mt-7"
      :disabled="true"
      placeholder=""
    />
    <div class="grid md:grid-cols-3 md:gap-10">
      <BaseInput
        :copy="true"
        :value="city"
        label="City"
        :disabled="true"
        class="mt-7"
        placeholder=""
      />
      <BaseInput
        :copy="true"
        :value="capitalize(state || '')"
        label="State"
        :disabled="true"
        class="mt-7"
        placeholder=""
      />
      <BaseInput
        :copy="true"
        :value="zipCode"
        label="Zip Code"
        :disabled="true"
        class="mt-7"
        placeholder=""
      />
    </div>
  </form>
</template>

<script setup>
defineProps({
  merchantAccount: {
    type: String,
    default: "",
  },
  businessName: {
    type: String,
    default: "",
  },
  addressLineOne: {
    type: String,
    default: "",
  },
  addressLineTwo: {
    type: String,
    default: "",
  },
  city: {
    type: String,
    default: "",
  },
  state: {
    type: String,
    default: "",
  },
  zipCode: {
    type: String,
    default: "",
  },
});

const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
</script>
