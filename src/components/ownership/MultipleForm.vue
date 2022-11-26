<template>
  <form>
    <div v-if="businessOwners.length">
      <MultipleInput
        v-for="businessOwner in businessOwners"
        :key="businessOwner.id"
        :id="businessOwner.id"
        :ownerValue="businessOwner.name ? businessOwner.name : ''"
        :titleValue="businessOwner.title ? businessOwner.title : ''"
        :percentValue="businessOwner.owned ? String(businessOwner.owned) : ''"
        @ownerInput="(e) => updateOwner(e.target)"
        @titleInput="(e) => updateTitle(e.target)"
        @percentInput="(e) => updateOwned(e.target)"
        label="Business Owner"
        errorMessage="All Fields are required."
        :required="true"
        :disabled="true"
        placeholder="Owner Name"
        class="mt-7"
      />
    </div>
    <p
      v-if="businessOwners.length"
      v-text="`Additional Owner`"
      class="font-semibold mt-7"
    />
    <MultipleInput
      :id="null"
      :ownerValue="newBusinessOwner.name"
      :titleValue="newBusinessOwner.title"
      :percentValue="String(newBusinessOwner.owned)"
      @ownerInput="(e) => handleOwner(e.target)"
      @titleInput="(e) => handleTitle(e.target)"
      @percentInput="(e) => handleOwned(e.target)"
      @submit="addNewOwner"
      label="Business Owner"
      errorMessage="All Fields are required."
      :required="true"
      placeholder="Owner Name"
      class="mt-3"
    />
  </form>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { onMounted, watch } from "@vue/runtime-core";
import { useStore } from "vuex";
import MultipleInput from "./MultipleInput.vue";

const store = useStore();
const businessOwners = ref([]);
const newBusinessOwner = ref({
  name: "",
  title: "",
  owned: "",
});

// Hooks
onMounted(() => {
  businessOwners.value = store.getters["ownership/getOwnershipOwners"];
});

watch(store.state, (newState) => {
  businessOwners.value = newState.ownership.ownershipOwners;
});

// Methods
const handleOwner = (input) => (newBusinessOwner.value.name = input.value);

const handleTitle = (input) => (newBusinessOwner.value.title = input.value);

const handleOwned = (input) =>
  (newBusinessOwner.value.owned = parseInt(input.value));

const updateOwner = (input) => {
  businessOwners.value = businessOwners.value.map((businessOwner) => {
    if (input.id === String(businessOwner.id)) {
      return {
        id: businessOwner.id,
        name: input.value,
        title: businessOwner.title,
        owned: businessOwner.owned,
      };
    }
    return businessOwner;
  });
};

const updateTitle = (input) => {
  businessOwners.value = businessOwners.value.map((businessOwner) => {
    if (input.id === String(businessOwner.id)) {
      return {
        id: businessOwner.id,
        name: businessOwner.name,
        title: input.value,
        owned: businessOwner.owned,
      };
    }
    return businessOwner;
  });
};

const updateOwned = (input) => {
  businessOwners.value = businessOwners.value.map((businessOwner) => {
    if (input.id === String(businessOwner.id)) {
      return {
        id: businessOwner.id,
        name: businessOwner.name,
        title: businessOwner.title,
        owned: parseInt(input.value),
      };
    }
    return businessOwner;
  });
};

const addNewOwner = async () => {
  await store.dispatch("ownership/sendOwnerships", newBusinessOwner.value);
  newBusinessOwner.value = {
    name: "",
    title: "",
    owned: "",
  };
};
</script>
