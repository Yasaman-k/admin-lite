<template>
  <section class="py-12 flex items-center justify-center flex-wrap gap-8">
    <ResourceCard
      v-for="cat in categories"
      :key="cat.id"
      :id="cat.id"
      :image="cat.image_url"
      :name="cat.title"
      :to="cat.url"
    />
    <span
      v-if="loadingNew"
      class="fixed bottom-4 left-1/2 -translate-x-1/2 px-2 py-1 rounded-md bg-[#00000075] text-white text-lg animate-pulse"
    >
      Loading More...
    </span>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";
import ResourceCard from "./ResourceCard.vue";

defineProps({
  categories: {
    type: Array,
    default: () => [],
  },
  loadingNew: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["handleScrolling"]);
const handleScrolling = () => emits("handleScrolling");

// Hooks
onMounted(() => window.addEventListener("scroll", handleScrolling));

onUnmounted(() => window.removeEventListener("scroll", handleScrolling));
</script>
