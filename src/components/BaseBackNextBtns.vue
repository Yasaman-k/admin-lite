<template>
  <div class="flex justify-end items-center gap-5 mt-6" ref="btns">
    <button
      v-if="!BackBtnHidden"
      tabindex="1"
      type="button"
      @click="goBack"
      class="btn-secondary"
    >
      Go Back
    </button>
    <button
      v-if="!nextBtnHidden"
      tabindex="1"
      type="submit"
      class="btn-primary"
      :disabled="nextDisabled"
      @click="goNext"
    >
      {{ nextLabel }}
    </button>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const btns = ref(null);

// Hooks
onMounted(() => {
  const content = document.querySelector(".content .container");
  const leftNavbar = document.getElementById("left-navbar");
  const rightNavbar = document.getElementById("right-navbar");
  setTimeout(() => {
    if (
      document.scrollingElement.scrollHeight >
      document.scrollingElement.clientHeight
    ) {
      btns.value.className +=
        " fixed left-[294px] bottom-0 bg-white px-6 py-4 z-0 custom-drop-shadow";
      content.className += " pb-10";
      btns.value.style.left = `${
        window.innerWidth > 1023 ? leftNavbar.clientWidth : 0
      }px`;
      btns.value.style.right = `${
        window.innerWidth > 1023 ? rightNavbar.clientWidth + 80 : 0
      }px`;
    } else {
      btns.value &&
        (btns.value.className = "flex justify-end items-center gap-5 mt-6");
      content.classList.remove("pb-10");
    }
  }, 10);
});

// Props
defineProps({
  nextDisabled: {
    type: Boolean,
    default: true,
  },
  nextLabel: {
    type: String,
    default: "Next",
  },
  BackBtnHidden: {
    type: Boolean,
    default: false,
  },
  nextBtnHidden: {
    type: Boolean,
    default: false,
  },
});

// emits
const emits = defineEmits(["next"]);

// Methods
const goBack = () => router.back();
const goNext = () => emits("next");

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
