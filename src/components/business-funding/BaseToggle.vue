<template>
  <div
    class="custom-drop-shadow flex items-center justify-between border border-[#19649916] rounded-lg py-3 px-5 bg-white"
  >
    <h4 class="text-main-gray text-lg font-semibold opacity-60">{{ title }}</h4>
    <div class="text-main-gray flex items-center justify-between gap-10">
      <span class="border-after">
        <IconRightArrow class="cursor-pointer" />
      </span>
      <div class="toggle-container">
        <span
          class="absolute top-0 bottom-0 left-0 right-0 z-10"
          @click="(e) => toggle(e.target)"
        ></span>
        <div class="toggle-icon"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import IconRightArrow from "../Icon/IconRightArrow.vue";

defineProps({
  title: {
    type: String,
    default: "",
  },
});

const emits = defineEmits(["handleToggle"]);

const toggle = (el) => {
  const container = el.parentElement;
  const toggleIcon = el.nextElementSibling;
  toggleIcon && toggleIcon.classList.toggle("translate-x-4");
  container && container.classList.toggle("active");
  emits("handleToggle");
};
</script>

<style scoped>
.toggle-container {
  @apply relative bg-[#B7C1D1] rounded-2xl px-1 py-1 w-12 h-8 cursor-pointer flex justify-start items-center transition-all duration-150;
}

.toggle-container.active {
  @apply bg-sunglow-blue;
}

.toggle-icon {
  @apply bg-white w-5 h-5 rounded-full transition-all duration-150;
}

.custom-drop-shadow {
  filter: drop-shadow(0 3px 10px #19649916);
}

.border-after {
  @apply flex items-center gap-10 after:content-[""] after:block after:bg-[#19649925] after:h-8 after:w-[1px];
}
</style>
