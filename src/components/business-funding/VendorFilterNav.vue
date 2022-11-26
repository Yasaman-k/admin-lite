<template>
  <div class="filters text-main-gray">
    <label class="checkbox-container filter-item">
      <span class="text-xl">&#9734;</span> Match
      <input
        type="checkbox"
        :checked="guarantee"
        @change="
          (e) => {
            handleClassSelection(e.target);
            handelGuarantee(e.target.checked);
          }
        "
      />
    </label>
    <label class="checkbox-container filter-item">
      $ No Personal Guarantee
      <input
        type="checkbox"
        :checked="guarantee"
        @change="
          (e) => {
            handleClassSelection(e.target);
            handelGuarantee(e.target.checked);
          }
        "
      />
    </label>
  </div>
</template>

<script setup>
import { computed } from "@vue/reactivity";
import { onMounted, ref } from "vue";

// Data
const guarantee = ref(false);
const reporting = ref(false);

// Props
const props = defineProps({
  cards: {
    type: Array,
    default: () => [],
  },
  modelValue: {
    type: Array,
    default: () => [],
  },
});

// Emits
const emit = defineEmits(["update:modelValue"]);

// Hooks
onMounted(() => {
  handelGuarantee(guarantee.value);
  handelReporting(reporting.value);
});

const filteredCards = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

// Methods
const handelGuarantee = (val) => {
  reporting.value = false;
  guarantee.value = val;
  filteredCards.value = props.cards.filter(
    (card) => card.guarantee === val && card.reporting === reporting.value
  );
};
const handelReporting = (val) => {
  guarantee.value = false;
  reporting.value = val;
  filteredCards.value = props.cards.filter(
    (card) => card.guarantee === guarantee.value && card.reporting === val
  );
};
const handleClassSelection = (input) => {
  let nextElement = input.parentElement.nextElementSibling;
  let prevElement = input.parentElement.previousElementSibling;
  input.parentElement.classList.toggle("selected");

  while (nextElement) {
    nextElement.classList.remove("selected");
    nextElement = nextElement.nextElementSibling;
  }

  while (prevElement) {
    prevElement.classList.remove("selected");
    prevElement = prevElement.previousElementSibling;
  }
};
</script>

<style scoped>
/* start Checkbox */
.filters {
  @apply flex h-8 gap-6 mt-8;
}

.checkbox-container {
  @apply relative py-3 cursor-pointer text-base select-none uppercase;
}

.checkbox-container input {
  @apply w-0 h-0 opacity-0 cursor-pointer absolute;
}
</style>
