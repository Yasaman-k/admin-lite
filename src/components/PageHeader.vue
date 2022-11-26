<template>
  <div
    class="container min-w-full flex items-center justify-between page-header"
  >
    <h3
      class="flex gap-3 items-center lg:text-[30px] text-xl font-semibold text-sunglow-blue"
    >
      <component :is="`Icon${icon}`" />
      {{ title }}
    </h3>
    <AccountSettings />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Business Fundability",
    },
    icon: {
      type: String,
      default: "",
    },
  },
};
</script>

<style>
.page-header {
  @apply lg:pl-[37px] px-5 lg:pr-[80px] py-6 border-b border-[#E1E9EF];
}
</style>
