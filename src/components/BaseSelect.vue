<template>
  <div class="relative">
    <input
      type="text"
      :disabled="disabled"
      :value="value"
      :placeholder="placeholder"
      :class="[
        'p-4 text-gray-900 border w-full font-semibold border-[#C9C9C9] rounded-[4px] text-md placeholder:text-[#BCBCBC] placeholder:text-md placeholder:font-semibold focus:outline-none disabled:bg-gray-50',
        { 'border-error': error },
      ]"
      readonly
      @focus="onFocus"
      @blur="onBlur"
    />
    <label
      v-if="label"
      :class="[
        'absolute top-4 left-4 flex items-center font-semibold bg-white pl-1.5 pr-5 text-[#BCBCBC] transition-all duration-200 ease-in-out pointer-events-none',
        { '-top-2.5 left-2.5 font-normal text-xs': active || hasValue },
        { 'text-error': error },
      ]"
    >
      {{ label }}
    </label>
    <div
      v-show="active && dropdowns && dropdowns.length"
      class="absolute bg-white z-10 border border-[#C9C9C9] rounded-[4px] w-full mt-1 px-2 gap-4 py-2.5 flex flex-col items-start max-h-44 overflow-y-scroll"
    >
      <button
        type="button"
        v-for="(dropdown, i) in dropdowns"
        :key="i"
        @click="selectItem(dropdown)"
        :class="`w-full text-left border-b-[0.3px] border-[#C9C9C9] text-black font-medium text-base pb-2 px-2 pr-3 flex justify-between ${
          i === dropdowns.length - 1 && '!border-0'
        }`"
      >
        <div class="flex gap-3 items-center">
          {{ dropdown.title }}
          <IconError v-if="dropdown.is_risky" />
        </div>
        <span v-if="dropdown.code">{{ dropdown.code }}</span>
      </button>
    </div>
    <span v-if="error" :class="{ 'text-error leading-10': error }">{{
      errorMessage
    }}</span>
  </div>
</template>

<script>
import IconError from "./Icon/IconError.vue";
export default {
  props: {
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
    errorMessage: {
      type: String,
      default: "",
    },
    dropdowns: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      active: false,
      error: false,
    };
  },
  computed: {
    hasValue() {
      return this.value.length > 0;
    },
  },
  methods: {
    selectItem(item) {
      this.$emit("selected", item);
      this.active = false;
    },
    onFocus() {
      this.active = true;
    },
    onBlur() {
      setTimeout(
        () => (!this.hasValue ? (this.error = true) : (this.error = false)),
        100
      );
    },
  },
  mounted() {
    document.addEventListener("click", (e) => {
      if (this.$el.contains(e.target)) {
        return;
      }
      this.active = false;
    });
  },
  components: { IconError },
};
</script>
