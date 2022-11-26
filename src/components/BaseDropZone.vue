<template>
  <div
    :class="active ? 'drop-zone' : ''"
    @dragenter.prevent="toggleActive"
    @dragover.prevent
    @dragleave.prevent="toggleActive"
    @drop.prevent="onDrop"
  >
    <slot :dropZoneActive="active"></slot>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["files-dropped"]);
const active = ref(false);

// Methods
const toggleActive = () => (active.value = !active.value);

const onDrop = (e) => {
  toggleActive();
  emit("files-dropped", [...e.dataTransfer.files]);
};
</script>

<style scoped>
.drop-zone {
  @apply transition-all duration-200 ease-in-out bg-gray-100;
}
</style>
