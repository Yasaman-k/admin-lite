<template>
  <div class="mt-7">
    <p class="text-[#196499] text-xl font-semibold" v-html="title" />
  </div>
  <div class="flex gap-3 flex-wrap mt-3">
    <button
      type="button"
      @click="select"
      v-for="option in options"
      :key="option.id"
      :value="option.id"
      :class="`option ${value === option.id ? 'selected' : ''}`"
    >
      {{ option.title }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: "",
  },
  options: {
    type: Array,
    default: () => [],
  },
  value: {
    type: String,
  },
});

// Emits
const emits = defineEmits(["handelSelection"]);

const select = (e) => {
  let prevElement = e.target.previousElementSibling;
  let nextElement = e.target.nextElementSibling;

  emits("handelSelection", e);
  e.target.classList.add("selected");
  while (prevElement) {
    prevElement.classList.remove("selected");
    prevElement = prevElement.previousElementSibling;
  }
  while (nextElement) {
    nextElement.classList.remove("selected");
    nextElement = nextElement.nextElementSibling;
  }
};
</script>

<style scoped>
.option {
  @apply text-white bg-[#667886] w-[120px] h-10 uppercase rounded-md;
}

.option.selected {
  @apply bg-[#196499];
}
</style>
