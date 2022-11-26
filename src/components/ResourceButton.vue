<template>
  <div
    class="flex justify-center items-center p-2 rounded-md border border-[#19649912] w-[225px]"
  >
    <button
      @click="openResource"
      class="flex flex-col justify-center gap-3 text-base font-semibold text-primary-green"
    >
      <img :src="image" class="mb-8 h-20" />
      <div class="flex flex-col justify-center gap-2">
        <h6 v-text="text" class="text-base font-medium text-black"></h6>
        <div class="flex items-center justify-center gap-3">
          <span v-text="linkText"></span>
          <IconArrowRight />
        </div>
      </div>
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  to: {
    type: String,
    default: "/",
  },
  linkText: {
    type: String,
    default: "Go To Website",
  },
  image: {
    type: String,
    default: "/images/regus.png",
  },
  text: {
    type: String,
    default: "Regus Virtual Offices",
  },
});

const emits = defineEmits(["openResource"]);

const openResource = () => emits("openResource", props.to);
</script>

<style></style>
