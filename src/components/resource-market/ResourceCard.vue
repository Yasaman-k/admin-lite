<template>
  <div class="card custom-shadow pt-1" @click="visit">
    <div class="absolute top-0 bottom-12 left-0 right-0 z-10"></div>
    <div class="h-[130px] relative after-border">
      <img
        v-if="image"
        :src="image"
        class="h-full w-full object-contain py-5 px-2 mx-auto"
      />
    </div>
    <div class="pb-1">
      <div class="mb-3">
        <h6 v-text="name" class="text-lg font-bold break-all"></h6>
        <span class="font-medium"> COST: $ {{ cost }} </span>
      </div>
      <span class="font-medium text-primary-green z-20 text-base">
        Visit Website
      </span>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";

const store = useStore();
const props = defineProps({
  id: {
    type: Number,
  },
  to: {
    type: String,
    default: "/",
  },
  name: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
  cost: {
    type: String,
    default: "123.00",
  },
});

const visit = async () => {
  window.open(props.to, "_blank");
  await store.dispatch("resourceMarket/increaseClicks", props.id);
};
</script>

<style scoped>
.card {
  @apply rounded-md shadow-lg shadow-[#00000015] w-[220px] h-[240px] overflow-hidden text-center border-2 border-white transition-all duration-150 relative cursor-pointer;
}

.card.before-border {
  @apply before:content-[""] before:block before:absolute before:top-0 before:w-full before:h-5;
}

.after-border {
  @apply after:content-[""] after:block after:absolute after:bottom-2 after:left-0 after:right-0 after:w-11/12 after:h-[1px] after:mx-auto after:bg-[#ddd];
}

.custom-shadow {
  @apply shadow-[0px_4px_16px_rgba(17,17,26,0.15)];
}
</style>
