<template>
  <div
    class="flex my-8 rounded-2xl custom-drop-shadow overflow-hidden bg-white"
  >
    <div
      :class="`mr-3 py-5 px-6 ${
        icon === 'Negative' ? 'bg-[#F26071]' : 'bg-[#FFBE24]'
      }`"
    >
      <component :is="`Icon${icon}`" class="h-full w-full" />
    </div>
    <div>
      <h2
        :class="`text-lg font-bold uppercase pt-4 ${
          icon === 'Negative' ? 'text-[#F26071]' : 'text-[#E29F00]'
        }`"
        v-html="title"
      />
      <p class="text-sm text-[#061017] mt-1 pb-4 pr-2" v-html="message" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    message: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>
.custom-drop-shadow {
  filter: drop-shadow(0 0 15px #00000020) !important;
}
</style>
