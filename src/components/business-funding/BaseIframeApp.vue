<template>
  <div class="h-screen relative w-2/3 overflow-hidden">
    <iframe
      ref="iframe"
      v-if="data.iframeEnable"
      :src="data.src"
      :title="data.title"
      frameborder="0"
      class="h-full w-full mt-[3.25rem] z-10"
    ></iframe>
    <div
      v-if="!data.iframeEnable"
      class="h-full w-full mt-10 pt-24 z-10 text-center"
    >
      <IconWebDevelopment class="mx-auto" />
      <h4 class="text-xl font-semibold mt-5 text-[#196499] mx-auto">
        Unable to open the link in the iFrame
      </h4>
      <p class="text-[#196499] text-lg">
        Please click on the button below to open the link in new tab or <br />
        copy-paste the link in new tab.
      </p>
      <div class="input-container">
        <input
          type="text"
          ref="input"
          name="link"
          id="link"
          :value="data.src"
          disabled
          class="input"
        />
        <IconLink class="absolute top-[9px] left-3" />
        <div class="copy" @click="onCopy">
          <IconCopy fill="#fff" />
          <span
            ref="copied"
            class="copied absolute -right-3 -top-[50px] p-2 bg-[#00000099] text-white rounded-md hidden after:hidden"
          >
            Copied!
          </span>
        </div>
      </div>
      <a
        :href="data.src"
        target="_blank"
        class="btn-primary text-center !py-3 !px-20"
      >
        Open In New Tab
      </a>
    </div>
    <div ref="modal">
      <BaseModalOver
        v-if="closeModal"
        header="Hang on! All your progress will be lost"
        content="
        If you close the iFrame, all your progress will be lost and you would have to start from the beginning. 
        <span class='block mt-4'>Click ‘Cancel’ to go back, or ‘Close’ if you want to exit.</span>
        "
        :actions="modalActionsBtns"
      />
    </div>
    <div
      class="text-white bg-[#317aaf] py-2 px-5 absolute -top-0 left-0 right-0 z-0 flex justify-end items-center"
    >
      <button
        type="button"
        class="text-lg cursor-pointer flex items-center"
        @click="closeApp"
      >
        Close Application
        <span class="ml-2 text-3xl">&times;</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import IconWebDevelopment from "../Icon/IconWebDevelopment.vue";
import IconLink from "../Icon/IconLink.vue";
import IconCopy from "../Icon/IconCopy.vue";
import BaseModalOver from "./BaseModalOver.vue";

defineProps({
  data: {
    type: Object,
    default: () => ({
      src: "",
      title: "",
      iframeEnable: false,
    }),
  },
});
const router = useRouter();
const iframe = ref(null);
const input = ref(null);
const copied = ref(null);
const modalActionsBtns = ref([
  {
    name: "Cancel",
    disabled: false,
    style: "",
    handleAction: () => (closeModal.value = false),
  },
  {
    name: "Close",
    disabled: false,
    style: "primary",
    handleAction: () => router.back(),
  },
]);
const closeModal = ref(false);

// Methods
const onCopy = () => {
  const el = document.createElement("textarea");
  let inputVal = input.value.value;
  el.value = inputVal;
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
  copied.value.classList.remove("hidden");
  copied.value.classList.remove("after:hidden");
  setTimeout(() => {
    copied.value.classList.add("hidden");
    copied.value.classList.add("after:hidden");
  }, 800);
};

const closeApp = () => (closeModal.value = true);
</script>

<style scoped>
.input-container {
  @apply relative border border-[#196499] rounded-md mt-5 w-3/4 flex mx-auto mb-7;
}
.input {
  @apply px-11 py-1 border border-white rounded-md w-full disabled:bg-white disabled:text-[#196499] disabled:text-lg;
}
.copy {
  @apply bg-[#196499] p-2 px-3 flex flex-col justify-center cursor-pointer;
}
.copied {
  @apply after:content-[""] after:absolute after:right-6 after:top-10 after:border-solid after:border-t-8 after:border-x-transparent after:border-x-8 after:border-b-0 after:border-t-[#00000099];
}
</style>
