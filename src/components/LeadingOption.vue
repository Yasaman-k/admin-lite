<template>
  <button
    class="px-4 py-3 rounded-md border flex-1 border-[#19649913] flex items-center justify-between text-[#061017] transition-all ease-in-out hover:text-primary-green hover:border-[#0CAE8712] focus:bg-[#EDF5FB] focus:text-primary-green focus:font-semibold focus:shadow-md"
  >
    <h3 class="text-base font-medium">
      {{ label }}
    </h3>
    <div>
      <IconNext class="w-3 h-3" />
    </div>
  </button>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "",
    },
  },
};
</script>

<style></style>
