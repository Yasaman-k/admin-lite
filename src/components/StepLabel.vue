<template>
  <div
    class="flex items-center gap-2 text-[#495A67] text-xl pb-4 border-b border-[#E1E9EF]"
  >
    <component :is="`Icon${icon}`" />
    <h3 v-text="label"></h3>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "Step Header",
    },
    icon: {
      type: String,
      default: "HomeAddress",
    },
  },
};
</script>

<style></style>
