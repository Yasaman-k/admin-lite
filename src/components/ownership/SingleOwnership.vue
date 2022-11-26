<template>
  <section class="container my-16 px-20">
    <FormHeader
      formTitle="Owner Name"
      icon="CommercialAddress"
      linkText="Who is the primary owner?"
      desc="Name of the person who owns the majority of the company."
    />
    <form @submit.prevent="handleSubmit" class="mt-7">
      <BaseInput
        @input="(e) => handlePrimaryVal(e.target.value)"
        :required="true"
        :value="primaryOwner"
        label="Primary Owner"
        placeholder="Sherlock Holmer"
        errorMessage="Primary Owner is required."
      />
      <BaseInput
        @input="(e) => handleTitleVal(e.target.value)"
        :required="true"
        :value="title"
        label="Title"
        placeholder="Private Investigator"
        errorMessage="Title is required."
        class="mt-4"
      />
      <BaseBackNextBtns :nextDisabled="saveDisable" />
    </form>
  </section>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { onMounted, onUpdated } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import FormHeader from "../FormHeader.vue";
import BaseInput from "../BaseInput.vue";
import BaseBackNextBtns from "../BaseBackNextBtns.vue";

const store = useStore();
const router = useRouter();
const saveDisable = ref(true);
const businessOwners = ref([]);
const primaryOwner = ref("");
const title = ref("");
const id = ref(null);

// Hooks
onMounted(() => {
  businessOwners.value = store.getters["ownership/getOwnershipOwners"];
  if (businessOwners.value.length === 1) {
    primaryOwner.value = businessOwners.value[0].name;
    title.value = businessOwners.value[0].title;
    id.value = businessOwners.value[0].id;
  }
  if (!primaryOwner.value.length || !title.value.length) {
    return (saveDisable.value = true);
  }
  return (saveDisable.value = false);
});

onUpdated(() => {
  if (!primaryOwner.value.length || !title.value.length) {
    return (saveDisable.value = true);
  }
  return (saveDisable.value = false);
});

// Methods
const handlePrimaryVal = (val) => (primaryOwner.value = val);

const handleTitleVal = (val) => (title.value = val);

const handleSubmit = async () => {
  if (businessOwners.value.length === 1 && id.value) {
    await store.dispatch("ownership/updateOwnership", {
      id: id.value,
      owner: {
        name: primaryOwner.value,
        title: title.value,
        owned: 100,
      },
    });
    return router.push("/fundability/foundation/ownership/verification");
  }
  await store.dispatch("ownership/sendOwnerships", {
    name: primaryOwner.value,
    title: title.value,
    owned: 100,
  });
  await store.dispatch("aspects/fetchFoundationStatuses", ["ownership"]);
  router.push("/fundability/foundation/ownership/verification");
};
</script>
