<template>
  <p class="mt-10 text-base font-semibold text-black" v-html="text" />
  <div class="flex flex-wrap items-center gap-10 mt-5">
    <ResourceButton
      v-for="resource in resources"
      :key="resource.id"
      :to="resource.link ? resource.link : resource.url"
      linkText="Go To Website"
      :image="resource.image"
      :text="resource.title"
      @openResource="
        () =>
          openResource(
            resource.link ? resource.link : resource.url,
            resource.id
          )
      "
    />
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import ResourceButton from "./ResourceButton.vue";

const store = useStore();

defineProps({
  text: {
    type: String,
    value: "",
  },
  resources: {
    type: Array,
    default: () => [],
  },
});

// Methods
const openResource = async (to, id) => {
  window.open(to, "_blank");
  await store.dispatch("resourceMarket/increaseClicks", id);
};
</script>
