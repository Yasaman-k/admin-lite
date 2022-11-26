<template>
  <div
    class="border-b border-[#E1E9EF] py-5 px-3 w-full"
    v-if="filterItems.length"
  >
    <Flicking
      :plugins="carouselPlugins"
      :options="{
        noPanelStyleOverride: true,
        bound: true,
        align: 'prev',
        inputType: ['pointer', 'mouse', 'touch'],
        autoResize: true,
      }"
      class="relative pl-12 pr-32"
    >
      <router-link
        v-for="item in filterItems"
        :key="item.id"
        :to="
          item.parent_category_id
            ? `/funding/funding-explorer/${getParentSlug(
                item.parent_category_id
              )}${item.slug}/vendor-list`
            : `/funding/funding-explorer/${item.slug}/vendor-list`
        "
        :class="`flicking-panel ${
          selectedSlug === item.slug ? 'selected' : ''
        }`"
      >
        {{ item.title }}
      </router-link>
      <template #viewport>
        <span class="flicking-arrow-prev"><IconLeftArrow /></span>
        <span class="flicking-arrow-next"><IconRightArrow /></span>
      </template>
    </Flicking>
  </div>
</template>

<script setup>
import "@egjs/vue3-flicking/dist/flicking.css";
// Or, if you have to support IE9
import "@egjs/vue3-flicking/dist/flicking-inline.css";
import { onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import Flicking from "@egjs/vue3-flicking";
import { Arrow } from "@egjs/flicking-plugins";
import IconRightArrow from "../Icon/IconRightArrow.vue";
import IconLeftArrow from "../Icon/IconLeftArrow.vue";

const route = useRoute();
const store = useStore();
const carouselPlugins = ref([new Arrow()]);
const selectedSlug = ref("");

// Props
defineProps({
  filterItems: {
    type: Array,
    default: () => [],
  },
});

// Hooks
onMounted(() => {
  const catSlug = route.params.category;
  const subCatSlug = route.params.subcategory;
  if (
    subCatSlug &&
    subCatSlug != "experimenter" &&
    subCatSlug != "vendor-list"
  ) {
    return (selectedSlug.value = subCatSlug);
  } else if (
    catSlug &&
    (subCatSlug === "experimenter" || subCatSlug === "vendor-list")
  ) {
    return (selectedSlug.value = catSlug);
  }
});

watch(route, (newRoute) => {
  const catSlug = newRoute.params.category;
  const subCatSlug = newRoute.params.subcategory;
  if (
    subCatSlug &&
    subCatSlug != "experimenter" &&
    subCatSlug != "vendor-list"
  ) {
    return (selectedSlug.value = subCatSlug);
  } else if (
    catSlug &&
    (subCatSlug === "experimenter" || subCatSlug === "vendor-list")
  ) {
    return (selectedSlug.value = catSlug);
  }
});

// Methods
const getParentSlug = (id) => {
  const categories = store.getters["funding/getFundingCategories"];
  let parentCategory = categories.find((item) => item.id === id);
  if (parentCategory) {
    return parentCategory.slug + "/";
  }
  return "";
};
</script>

<style>
.flicking-camera {
  @apply items-center gap-3;
}

.flicking-panel {
  @apply text-main-gray bg-[#D9E1E7] pl-2 pr-5 py-1 text-left cursor-pointer border rounded-md transition-all duration-100 hover:bg-sunglow-blue hover:text-[#FFFFFF];
}

.flicking-panel.selected {
  @apply bg-sunglow-blue text-[#FFFFFF];
}

.flicking-arrow-prev,
.flicking-arrow-next {
  @apply text-xl flex items-center justify-center bg-sunglow-blue w-[39px] h-[39px] border !rounded-lg box-border text-white font-semibold z-10 cursor-pointer;
}

.flicking-arrow-prev {
  @apply absolute top-2/4 -translate-y-2/4 left-0;
}

.flicking-arrow-next {
  @apply absolute top-2/4 -translate-y-2/4 right-0;
}

.flicking-arrow-disabled {
  @apply bg-[#00000020] text-[#00000050] cursor-default;
}
</style>
