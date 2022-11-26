<template>
  <div class="flex justify-end items-center gap-5 mt-6" ref="btns">
    <router-link :to="updateLink" class="block" v-if="!updateBtnHidden">
      <button type="button" class="btn-secondary">{{ updateLabel }}</button>
    </router-link>
    <router-link :to="nextLink" class="block">
      <button
        type="submit"
        class="btn-primary flex gap-6 items-center"
        :disabled="nextDisabled"
      >
        Next: {{ nextLabel }}
        <IconRightArrow />
      </button>
    </router-link>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const btns = ref(null);

// Hooks
onMounted(() => {
  setTimeout(() => {
    if (
      document.scrollingElement.scrollHeight >
      document.scrollingElement.clientHeight
    ) {
      btns.value &&
        (btns.value.className +=
          " fixed left-[294px] bottom-0 bg-white px-6 py-4 z-0 custom-drop-shadow");
      const content = document.querySelector(".content .container");
      const leftNavbar = document.getElementById("left-navbar");
      const rightNavbar = document.getElementById("right-navbar");
      content.classList.add("pb-10");
      btns.value &&
        (btns.value.style.left = `${
          window.innerWidth > 1023 ? leftNavbar.clientWidth : 0
        }px`);
      btns.value &&
        (btns.value.style.right = `${
          window.innerWidth > 1023 ? rightNavbar.clientWidth + 80 : 0
        }px`);
    }
  }, 10);
});

// Props
defineProps({
  updateBtnHidden: {
    type: Boolean,
    default: false,
  },
  updateLabel: {
    type: String,
    default: "",
  },
  updateLink: {
    type: String,
    default: "",
  },
  nextDisabled: {
    type: Boolean,
    default: false,
  },
  nextLabel: {
    type: String,
    default: "",
  },
  nextLink: {
    type: String,
    default: "",
  },
});

// Methods
window.addEventListener("resize", (e) => {
  const content = document.querySelector(".content .container");
  const leftNavbar = document.getElementById("left-navbar");
  const rightNavbar = document.getElementById("right-navbar");

  if (
    document.scrollingElement.scrollHeight >
    document.scrollingElement.clientHeight
  ) {
    btns.value &&
      (btns.value.className +=
        " fixed left-[294px] bottom-0 bg-white px-6 py-4 z-0 custom-drop-shadow");
    content.classList.add("pb-10");
  } else {
    btns.value &&
      (btns.value.className = "flex justify-end items-center gap-5 mt-6");
    content.classList.remove("pb-10");
  }

  btns.value &&
    (btns.value.style.left = `${
      e.target.innerWidth > 1023 ? leftNavbar.clientWidth : 0
    }px`);
  btns.value &&
    (btns.value.style.right = `${
      e.target.innerWidth > 1023 ? rightNavbar.clientWidth + 80 : 0
    }px`);
});
</script>

<style scoped>
.custom-drop-shadow {
  filter: drop-shadow(0 -3px 6px #00000010);
}
</style>
