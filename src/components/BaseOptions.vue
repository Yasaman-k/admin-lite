<template>
  <form @submit.prevent class="mt-5">
    <div class="grid grid-cols-2 gap-5">
      <BaseRadioButton
        @select="(val) => handleVal(val)"
        :radioName="name"
        text="Yes"
        icon="HandYes"
        value="Yes"
        :checked="value === 'Yes' ? true : false"
      />
      <BaseRadioButton
        @select="(val) => handleVal(val)"
        :radioName="name"
        text="No"
        icon="HandNo"
        value="No"
        :checked="value === 'No' ? true : false"
      />
    </div>
    <div class="flex justify-end items-center gap-5 mt-6">
      <button
        type="button"
        class="btn-secondary"
        v-if="goBackBtn"
        @click="goBack"
      >
        Go Back
      </button>
      <button
        type="submit"
        class="btn-primary"
        :disabled="nextDisable"
        @click="onSubmit"
      >
        Next
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { onMounted, onUpdated } from "@vue/runtime-core";
import BaseRadioButton from "./BaseRadioButton.vue";

const router = useRouter();
const props = defineProps({
  name: {
    type: String,
    default: "",
  },
  value: {
    type: String,
    default: "",
  },
  goBackBtn: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["submit", "handleValue"]);

const nextDisable = ref(true);

// Hooks
onMounted(() => {
  if (props.value.length > 1) {
    return (nextDisable.value = false);
  }
  return (nextDisable.value = true);
});

onUpdated(() => {
  if (props.value.length > 1) {
    return (nextDisable.value = false);
  }
  return (nextDisable.value = true);
});

// Methods
const handleVal = (value) => emit("handleValue", value);

const goBack = () => router.back();

const onSubmit = () => {
  emit("submit");
};
</script>
