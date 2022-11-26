<template>
  <router-link :to="to" :class="`right-nav-item ${isActive && 'nav-active'}`">
    <component :is="`Icon${type}`" />
    <span class="text-sm font-medium text-[#686868]">{{ text }}</span>
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
  },
  computed: {
    isActive() {
      return this.$route.path == this.to;
    },
  },
};
</script>

<style scoped>
.right-nav-item {
  @apply flex gap-1 items-center bg-white rounded-md drop-shadow-md w-full border border-transparent transition-all duration-200 ease-in-out p-2 border-[#495A67];
}

.nav-active {
  @apply border-[#495A67] bg-[#EDF5FB] before:border-2 before:border-t-transparent before:border-b-transparent before:border-r-transparent before:border-[#D0DBE3] before:absolute before:left-[-32px] before:z-0;
}
</style>
