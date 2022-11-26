<template>
  <router-link
    :to="disabled ? '' : to"
    :class="`step-btn group ${isActive || btnActive ? 'step-btn-active' : ''}
    ${disabled ? 'step-btn-disabled' : ''}`"
  >
    <component :is="`Icon${type}`" class="flex-shrink-0" />
    <span
      :class="`text-sm font-medium text-[#686868] group-hover:text-primary-green ${
        disabled && 'group-hover:text-[#686868]'
      }`"
      >{{ text }}</span
    >
  </router-link>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: "",
    },
    to: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "Done",
    },
    btnActive: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isActive() {
      return this.$route.path == this.to;
    },
  },
};
</script>

<style scoped>
.step-btn {
  @apply flex gap-3 items-center bg-white rounded-md shadow-md shadow-gray-200 w-full max-w-[265px] border border-transparent transition-all duration-200 ease-in-out p-2 hover:border-[#0cae881e] focus:bg-[#EDF5FB] focus:text-primary-green focus:font-semibold hover:shadow-none focus:shadow-md;
}

.step-btn-active {
  @apply border-[#495A67] bg-[#EDF5FB] before:border-[10px] before:border-t-transparent before:border-b-transparent before:border-r-transparent before:border-[#D0DBE3] before:absolute before:left-[-48px] before:z-0;
}

.step-btn-active span {
  @apply font-semibold;
}

.step-btn-disabled {
  @apply opacity-70 hover:border-transparent hover:shadow-md hover:shadow-gray-200 hover:cursor-default focus:font-normal focus:text-[#00000070] focus:bg-white;
}
</style>
