<template>
  <div>
    <div class="bg-blur"></div>
    <div class="modal-over">
      <h4 class="text-xl font-semibold mb-4">{{ header }}</h4>
      <p class="text-lg" v-html="content"></p>
      <div class="flex gap-3 justify-end items-center">
        <button
          type="button"
          v-for="action in actions"
          :key="action.name"
          :disabled="action.disabled"
          @click="action.handleAction"
          :class="`${action.style} mt-10 self-end ${
            action.style === 'primary' ? 'btn-primary' : 'btn-secondary'
          }`"
        >
          {{ action.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// Props
defineProps({
  header: {
    type: String,
    default: "",
  },
  content: {
    type: String,
    default: "",
  },
  actions: {
    type: Array,
    default: () => [],
  },
});
</script>

<style scoped>
.modal-over {
  @apply fixed top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 z-[70] flex flex-col py-8 px-20 text-white bg-[#196499] rounded-md;
}

.bg-blur {
  backdrop-filter: blur(5px);
  @apply fixed top-0 bottom-0 left-0 right-0 z-50;
}

.btn-secondary {
  @apply !text-white hover:!text-[#394854];
}
</style>
