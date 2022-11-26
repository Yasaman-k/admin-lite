<template>
  <div class="mt-6">
    <p class="text-[#196499] text-xl font-semibold" v-html="question"></p>
    <div class="mt-3">
      <button
        type="button"
        :class="`btn ${answerValue === 'Yes' ? 'selected' : ''}`"
        value="Yes"
        @click="select"
      >
        Yes
      </button>
      <button
        type="button"
        :class="`btn ${answerValue === 'No' ? 'selected' : ''}`"
        value="No"
        @click="select"
      >
        No
      </button>
    </div>
  </div>
</template>

<script setup>
// Props
defineProps({
  question: {
    type: String,
    default: "",
  },
  answerValue: {
    type: String,
    default: "",
  },
});

// Emits
const emits = defineEmits(["handelSelection"]);

const select = (e) => {
  emits("handelSelection", e);
  e.target.classList.add("selected");
  e.target.previousElementSibling &&
    e.target.previousElementSibling.classList.remove("selected");
  e.target.nextElementSibling &&
    e.target.nextElementSibling.classList.remove("selected");
};
</script>

<style scoped>
.btn {
  @apply text-white bg-[#667886] px-10 py-2 uppercase rounded-md mr-3;
}

.btn.selected {
  @apply bg-[#196499];
}
</style>
