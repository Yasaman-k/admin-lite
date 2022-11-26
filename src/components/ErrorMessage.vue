<template>
  <section
    class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 bg-[#F0F7FB] rounded-md p-28"
  >
    <h1 class="text-center font-semibold text-2xl">
      {{ message }}
    </h1>
  </section>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: "",
    },
  },
};
</script>
