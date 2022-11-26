<template>
  <div class="mt-7">
    <p
      class="text-[#196499] text-xl font-semibold"
      v-html="message"
      v-if="message.length"
    />
    <p
      v-html="text"
      v-if="text.length"
      :class="`${message.length ? 'mt-8' : ''}`"
    />
  </div>
</template>
<script setup>
// Props
defineProps({
  message: {
    type: String,
    default: "",
  },
  text: {
    type: String,
    default: "",
  },
});
</script>
