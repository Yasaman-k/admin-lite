<template>
  <div>
    <div
      class="mb-4 flex items-center gap-3 font-normal uppercase pb-3 text-main-gray border-b-[1px] broder-main-gray"
      v-if="formTitle || icon"
    >
      <div v-if="icon" :class="`${iconColor}`">
        <component :is="`Icon${icon}`" />
      </div>
      <h2 v-if="formTitle" v-html="formTitle" class="text-2xl" />
    </div>
    <h3
      v-if="linkText"
      v-html="linkText"
      class="text-xl font-semibold text-sunglow-blue"
    />
    <p
      class="mt-3 text-base font-normal text-black"
      v-html="desc"
      v-if="desc"
    />
  </div>
</template>

<script>
export default {
  props: {
    formTitle: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "",
    },
    desc: {
      type: String,
      default: "",
    },
    linkText: {
      type: String,
      default: "",
    },
    iconColor: {
      type: String,
      default: "text-main-gray",
    },
  },
};
</script>

<style></style>
