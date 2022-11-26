<template>
  <section class="bg-[#FAFDFF] py-10 px-20 w-[440px] flex-shrink-0">
    <h4 class="text-[#196499] text-xl font-bold">Resource Type</h4>
    <ul>
      <li v-for="filter in filters" :key="filter.id" class="mt-3">
        <input
          type="checkbox"
          class="checkbox"
          :id="`filter ${filter.id}`"
          @change="(e) => handleFilter(e.target, filter)"
        />
        <label
          class="text-[#686868] text-xl flex items-center"
          :for="`filter ${filter.id}`"
        >
          {{ filter.title }}
        </label>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { onBeforeMount, ref, watch } from "vue";
import { useStore } from "vuex";

const store = useStore();
const filters = ref([]);

const emits = defineEmits(["handleFilter"]);

// Hooks
onBeforeMount(
  () => (filters.value = store.getters["resourceMarket/getResourceTypes"])
);

watch(store.state, (newState) => {
  filters.value = newState.resourceMarket.resourceTypes;
});

// Methods
const handleFilter = (el, filter) => emits("handleFilter", el, filter);
</script>
<style scoped>
.checkbox {
  @apply leading-3 absolute -left-[999em];
}

.checkbox + label {
  @apply relative overflow-hidden cursor-pointer;
}
.checkbox:checked + label {
  @apply after:content-[""] after:absolute after:top-[6px] after:left-[6px] after:w-2 after:h-3 after:border-2 after:border-[#fff] after:border-t-0 after:border-l-0 after:rotate-45 before:bg-[#686868];
}

.checkbox + label {
  @apply before:content-[""] before:block before:h-5 before:w-5 before:bg-[#fff] before:border-2 before:border-[#686868] before:rounded-sm before:mr-2;
}
</style>
