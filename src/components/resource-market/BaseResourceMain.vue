<template>
  <section class="flex justify-end w-full">
    <div ref="container">
      <ResourceCards
        :categories="categories"
        :loadingNew="loadingNew"
        @handleScrolling="handleScrolling"
      />
    </div>
    <BaseResourceFilter @handleFilter="handleFilter" />
  </section>
</template>

<script setup>
import { onBeforeMount, ref, watch } from "vue";
import { useStore } from "vuex";
import BaseResourceFilter from "./BaseResourceFilter.vue";
import ResourceCards from "./ResourceCards.vue";

const store = useStore();
const container = ref(null);

// Data
const resourceTypes = ref([]);
const categories = ref([]);
const maxPagination = ref(0);
const page = ref(2);
const loadingNew = ref(false);

// Hooks
onBeforeMount(() => {
  const pagination = store.getters["resourceMarket/getPagination"];
  categories.value = store.getters["resourceMarket/getResourceCategories"];
  pagination &&
    pagination.count != 0 &&
    (maxPagination.value = Math.ceil(pagination.total / pagination.count));
});

watch(store.state, (newState) => {
  categories.value = newState.resourceMarket.resourceCategories;
});

// Methods
const handleScrolling = async () => {
  if (
    container.value.getBoundingClientRect().bottom === window.innerHeight &&
    !loadingNew.value &&
    page.value <= maxPagination.value
  ) {
    loadingNew.value = true;
    await store.dispatch("resourceMarket/loadFilterResources", {
      page: page.value,
      resourceTypes: resourceTypes.value,
    });
    page.value += 1;
    loadingNew.value = false;
  }
};

const handleFilter = async (el, filter) => {
  const types = resourceTypes.value;
  const typeExists = types.find((type) => type.id === filter.id);
  if (typeExists && !el.checked) {
    page.value = 2;
    resourceTypes.value = types.filter((type) => type.id != filter.id);
    await store.dispatch("resourceMarket/loadFilterResources", {
      page: 1,
      resourceTypes: resourceTypes.value,
    });
  } else if (!typeExists && el.checked) {
    page.value = 2;
    resourceTypes.value.push(filter);
    await store.dispatch("resourceMarket/loadFilterResources", {
      page: 1,
      resourceTypes: resourceTypes.value,
    });
  }
  const pagination = store.getters["resourceMarket/getPagination"];
  pagination &&
    pagination.count != 0 &&
    (maxPagination.value = Math.ceil(pagination.total / pagination.count));
};
</script>
