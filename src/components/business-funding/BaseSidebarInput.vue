<template>
  <div :class="`${normalLabel.length || label.length ? 'mt-7' : ''} w-11/12`">
    <div :class="`flex flex-col ${normalLabel.length ? 'gap-2' : 'gap-3'}`">
      <label
        class="text-[#196499] text-xl font-semibold"
        :for="label"
        v-if="!normalLabel.length"
      >
        {{ label }}
      </label>
      <label class="font-semibold" :for="normalLabel" v-if="normalLabel.length">
        {{ normalLabel }}
      </label>
      <div class="relative">
        <input
          ref="inputRef"
          type="text"
          :id="normalLabel.length ? normalLabel : label"
          :value="value"
          :disabled="disabled"
          @input="input"
          @focus="focus"
          @blur="blur"
          :maxlength="maxLength"
          class="input"
          :class="`w-full ${extraInputClasses}`"
        />
        <span class="absolute left-3 top-[5px]" v-if="dollarIcon">$</span>
        <span v-if="error" class="text-error leading-10">{{
          errorMessage
        }}</span>
        <span
          v-if="copy"
          class="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
          @click="onCopy"
        >
          <IconCopy />
        </span>
        <span
          ref="copied"
          class="copy absolute right-0 -top-12 p-2 bg-[#00000099] text-white rounded-md hidden after:hidden"
        >
          Copied!
        </span>
      </div>
    </div>
    <p v-if="note.length" class="text-[#196499] mt-4 font-semibold">
      <span class="font-bold uppercase"> Note: </span>
      {{ note }}
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import IconCopy from "../Icon/IconCopy.vue";

// Props
defineProps({
  label: {
    type: String,
    default: "",
  },
  normalLabel: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  value: {
    type: String,
    default: "",
  },
  extraInputClasses: {
    type: String,
    default: "",
  },
  note: {
    type: String,
    default: "",
  },
  dollarIcon: {
    type: Boolean,
    default: false,
  },
  maxLength: {
    type: String,
    default: "",
  },
  error: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: String,
    default: "",
  },
  copy: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["onFocus", "onInput", "onBlur"]);

const inputRef = ref(null);
const copied = ref(null);

// Methods
const focus = () => emits("onFocus");
const input = (e) => emits("onInput", e);
const blur = (e) => emits("onBlur", e.target.value);
const onCopy = () => {
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
.input {
  @apply border border-[#E0E0E0] rounded-md px-3 py-1 outline-none disabled:bg-transparent;
}

.copy {
  @apply after:content-[""] after:absolute  after:right-7 after:top-10 after:border-solid after:border-t-8 after:border-x-transparent after:border-x-8 after:border-b-0 after:border-t-[#00000099];
}
</style>