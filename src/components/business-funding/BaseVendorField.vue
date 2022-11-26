<template>
  <div class="flex flex-col gap-2 relative mt-3">
    <label
      for="Business Email"
      class="font-semibold"
      v-text="label"
      v-if="label.length"
    ></label>
    <input
      ref="inputRef"
      type="text"
      :value="value"
      disabled
      class="border border-[#E0E0E0] bg-white p-1 px-2 rounded-md"
    />
    <svg
      @click="copy"
      :class="`absolute ${
        label.length ? 'top-10' : 'top-2'
      } right-2 w-5 h-5 cursor-pointer`"
      xmlns="http://www.w3.org/2000/svg"
      width="19.155"
      height="22.18"
      viewBox="0 0 19.155 22.18"
    >
      <path
        id="Icon_material-content-copy"
        data-name="Icon material-content-copy"
        d="M17.115,1.5H5.016A2.022,2.022,0,0,0,3,3.516V17.631H5.016V3.516h12.1Zm3.025,4.033H9.049A2.022,2.022,0,0,0,7.033,7.549V21.664A2.022,2.022,0,0,0,9.049,23.68h11.09a2.022,2.022,0,0,0,2.016-2.016V7.549A2.022,2.022,0,0,0,20.139,5.533Zm0,16.131H9.049V7.549h11.09Z"
        transform="translate(-3 -1.5)"
        fill="#A2ADB5"
      />
    </svg>
    <span
      ref="copied"
      class="copy absolute right-0 -top-5 p-2 bg-[#00000099] text-white rounded-md hidden after:hidden"
    >
      Copied!
    </span>
  </div>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  label: {
    type: String,
    default: "",
  },
  value: {
    type: String,
    default: "",
  },
});

const copied = ref(null);
const inputRef = ref(null);

// Methods
const copy = () => {
  const el = document.createElement("textarea");
  let input = inputRef.value;
  el.value = input.value;
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
</script>

<style scoped>
.copy {
  @apply after:content-[""] after:absolute  after:right-7 after:top-10 after:border-solid after:border-t-8 after:border-x-transparent after:border-x-8 after:border-b-0 after:border-t-[#00000099];
}
</style>
