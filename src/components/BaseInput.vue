<template>
  <div class="relative text-input">
    <input
      ref="input"
      type="text"
      :required="required"
      :disabled="disabled"
      :value="value"
      tabindex="1"
      :placeholder="placeholder"
      :maxlength="length"
      :class="[
        'p-4 text-gray-900 border w-full font-semibold border-[#C9C9C9] rounded-[4px] text-md placeholder:!text-white focus:placeholder:!text-[#BCBCBC] placeholder:text-md placeholder:font-semibold focus:outline-none',
        { 'border-error': empty || error },
        inputExtraClasses,
      ]"
      @input="updateValue"
      @focus="onFocus"
      @blur="onBlur"
    />
    <label
      v-if="label"
      :class="[
        'absolute top-4 left-4 flex items-center font-semibold bg-white pl-1.5 pr-5 text-[#BCBCBC] transition-all duration-200 ease-in-out pointer-events-none',
        { '-top-2.5 left-2.5 font-normal text-xs': active || hasValue },
        { 'text-error': empty || error },
        { '!text-sunglow-blue': disabled },
      ]"
    >
      {{ label }}
    </label>
    <span
      v-if="empty || error"
      :class="{ 'text-error leading-10': empty || error }"
      >{{ errorMessage }}</span
    >
    <router-link :to="editLink">
      <IconEdit
        class="absolute right-14 top-5 cursor-pointer"
        v-if="editDelete"
      />
    </router-link>
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
</template>

<script>
import IconCopy from "./Icon/IconCopy.vue";
export default {
  props: {
    inputExtraClasses: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "Field Name",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "Field Name Label",
    },
    value: {
      type: String,
      default: "",
    },
    required: {
      type: Boolean,
      default: false,
    },
    length: {
      type: String,
    },
    errorMessage: {
      type: String,
      default: "",
    },
    error: {
      type: Boolean,
      default: false,
    },
    editDelete: {
      type: Boolean,
      default: false,
    },
    copy: {
      type: Boolean,
      default: false,
    },
    editLink: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      active: false,
      empty: false,
    };
  },
  computed: {
    hasValue() {
      return this.value.length > 0;
    },
  },
  methods: {
    updateValue(e) {
      this.empty = false;
      this.$emit("input", e);
    },
    onFocus(e) {
      this.active = true;
      this.$emit("focus", e);
    },
    onBlur(e) {
      this.$emit("blur", e);
      this.active = false;
      !this.hasValue && this.required
        ? (this.empty = true)
        : (this.empty = false);
    },
    onCopy() {
      const el = document.createElement("textarea");
      let input = this.$refs.input;
      el.value = input.value;
      el.setAttribute("readonly", "");
      el.style.position = "absolute";
      el.style.left = "-9999px";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      this.$refs.copied.classList.remove("hidden");
      this.$refs.copied.classList.remove("after:hidden");
      setTimeout(() => {
        this.$refs.copied.classList.add("hidden");
        this.$refs.copied.classList.add("after:hidden");
      }, 800);
    },
  },
  components: { IconCopy },
};
</script>

<style scoped>
.copy {
  @apply after:content-[""] after:absolute  after:right-7 after:top-10 after:border-solid after:border-t-8 after:border-x-transparent after:border-x-8 after:border-b-0 after:border-t-[#00000099];
}

.text-input input:disabled {
  filter: drop-shadow(0 0 15px #00000010) !important;
  @apply bg-[#fafdff] text-[#061017] rounded-md border-0 pt-5 font-medium;
}

.text-input input:disabled + label {
  @apply bg-[#fafdff] text-[#061017] rounded-md top-1;
}
</style>
