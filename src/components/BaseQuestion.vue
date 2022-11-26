<template>
  <h3 class="text-xl font-semibold text-sunglow-blue" v-text="label"></h3>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "Question/Header",
    },
  },
};
</script>

<style></style>
