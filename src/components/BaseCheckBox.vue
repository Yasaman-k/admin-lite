<template>
  <label class="cursor-pointer">
    <div
      class="check-box h-full flex px-5 py-[30px] border border-[#DDDDDD] rounded-md group hover:border-primary-green relative transition-all duration-100"
    >
      <div class="flex items-center gap-4">
        <input
          type="checkbox"
          :name="boxName"
          :disabled="disabled"
          :checked="checked"
          :value="value"
          @change="onChange"
        />
        <div
          v-if="icon"
          class="box-icon text-main-gray group-hover:text-primary-green"
        >
          <component :is="`Icon${icon}`" />
        </div>
        <span
          class="box-text text-[#061017] text-base font-medium group-hover:text-primary-green"
        >
          {{ text }}</span
        >
      </div>
    </div>
  </label>
</template>

<script>
export default {
  props: {
    boxName: {
      type: String,
      default: "",
    },
    text: {
      type: String,
      default: "Commercial Address",
    },
    icon: {
      type: String,
      default: "",
    },
    checked: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onChange(event) {
      this.$emit("select",  event.target.value);
    },
  },
};
</script>

<style>
input:checked ~ .check-box {
  @apply bg-[#EDF5FB] border-[#C2D2DE] shadow-md shadow-gray-200;
}
input:checked ~ .check-box .box-icon,
input:checked ~ .check-box .box-text {
  @apply text-primary-green;
}
input:checked ~ .check-box .box-text {
  @apply font-semibold;
}
</style>
