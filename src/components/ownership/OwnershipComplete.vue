<template>
  <section class="container my-16 px-20">
    <FormHeader
      formTitle="Business ownership confirmation"
      icon="CommercialAddress"
      linkText="Great, your Ownership Information has been recorded."
      desc="To make changes, click “Update Ownership”."
      class="pb-2"
    />
    <div v-if="businessOwners.length">
      <MultipleInput
        v-for="(businessOwner, i) in businessOwners"
        :key="businessOwner.id"
        :id="businessOwner.id"
        :ownerValue="businessOwner.name ? businessOwner.name : ''"
        :titleValue="businessOwner.title ? businessOwner.title : ''"
        :percentValue="businessOwner.owned ? String(businessOwner.owned) : ''"
        @ownerInput="(e) => handleOwner(e.target)"
        @titleInput="(e) => handleTitle(e.target)"
        @percentInput="(e) => handleOwned(e.target)"
        label="Business Owner"
        errorMessage="All Fields are required."
        :required="true"
        :disabled="true"
        :completePage="true"
        :multipleOwners="businessOwners.length > 1"
        :notFirstOwner="i > 0"
        placeholder="Owner Name"
      />
    </div>
    <BaseUpdateNextBtns
      updateLabel="Update Ownership"
      :updateLink="updateLink"
      nextLabel="EIN"
      nextLink="/fundability/foundation/ein"
    />
  </section>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { onBeforeMount } from "vue";
import { useStore } from "vuex";
import FormHeader from "../FormHeader.vue";
import MultipleInput from "./MultipleInput.vue";
import BaseUpdateNextBtns from "../BaseUpdateNextBtns.vue";

const store = useStore();
const businessOwners = ref([]);
const updateLink = ref("");

// Hooks
onBeforeMount(() => {
  businessOwners.value = store.getters["ownership/getOwnershipOwners"];
  if (businessOwners.value.length === 1) {
    return (updateLink.value =
      "/fundability/foundation/ownership/single-ownership");
  }
  return (updateLink.value =
    "/fundability/foundation/ownership/multiple-ownership");
});
</script>
