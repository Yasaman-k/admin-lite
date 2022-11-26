<template>
  <section class="container my-16 px-20" v-if="!loading">
    <FormHeader
      linkText="Verify your Ownership Information."
      desc="Is the correct ownership information listed on your filing with the Secretary of State."
    />
    <router-link
      to="/"
      class="flex gap-10 items-center mt-5 text-[#196499] font-semibold"
    >
      Click here to go the Secretary of State of {{ state }}
      <IconExternalLink />
    </router-link>
    <BaseOptions
      name="ownership-verification"
      :value="isCorrect"
      @handleValue="(val) => handleVal(val)"
      @submit="onSubmit"
    />
  </section>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { onBeforeMount } from "@vue/runtime-core";
import FormHeader from "../FormHeader.vue";
import IconExternalLink from "../Icon/IconExternalLink.vue";
import BaseOptions from "../BaseOptions.vue";

const router = useRouter();
const store = useStore();

// Data
const loading = ref(true);
const isCorrect = ref("");
const state = ref("");

// Hooks
onBeforeMount(async () => {
  await store.dispatch("businessAddress/fetchBusinessAddressState");
  const businessState = store.state.businessAddress.businessAddressState;
  state.value = businessState[0].business_address_state.data;
  const confirmation = store.getters["ownership/getOwnershipSosConfirmation"];
  if (confirmation.length) {
    isCorrect.value = confirmation.find((field) => {
      return Object.keys(field)[0] === "ownership_sos_confirmation";
    });
    if (isCorrect.value) {
      isCorrect.value.ownership_sos_confirmation.const
        ? (isCorrect.value = isCorrect.value.ownership_sos_confirmation.const)
        : (isCorrect.value = "");
    } else {
      isCorrect.value = "";
    }
  }
  loading.value = false;
});

// Methods
const handleVal = (val) => (isCorrect.value = val);

const onSubmit = async () => {
  await store.dispatch("ownership/sendOwnershipSosConfirmation", {
    value: isCorrect.value === "Yes",
  });
  await store.dispatch("aspects/fetchFoundationStatuses", ["ownership"]);
  if (isCorrect.value === "No") {
    return router.push("/fundability/foundation/ownership/resources");
  }
  return router.push("/fundability/foundation/ownership/complete");
};
</script>
