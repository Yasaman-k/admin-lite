<template>
  <div
    :class="`mt-3 pt-7 pb-5 bg-white drop-shadow-2xl absolute bottom-0 left-0 right-0 flex items-center justify-around ${extraClasses}`"
  >
    <button
      type="button"
      v-for="action in actions"
      :key="action.name"
      :disabled="action.disabled"
      @click="action.handleAction"
      :class="`${action.style} ${
        action.style === 'primary' ? 'btn-primary' : 'btn-secondary'
      }`"
    >
      {{ action.name }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  actions: {
    type: Array,
    default: () => [],
  },
  extraClasses: {
    type: String,
    default: "",
  },
});
</script>

<style scoped>
.primary {
  @apply !bg-[#0CAE87] text-left mt-8 mx-auto !text-base border border-[#0CAE87] disabled:opacity-25;
}
</style>
