<template>
  <div :class="`card pt-1 ${status} ${status.length && 'before-border'}`">
    <div
      :class="`absolute top-0 bottom-12 left-0 right-0 z-10 ${
        status.length ? 'bg-[#00000020] !bottom-[34px]' : ''
      }`"
      @click="
        (e) => {
          onClick();
          (!status.length || status === 'accepted') && toggleBorder(e.target);
        }
      "
    ></div>
    <div class="h-[130px] relative after-border">
      <img
        v-if="image"
        :src="image"
        class="h-full w-full object-contain py-5 px-2 mx-auto"
      />
    </div>
    <div class="pb-1">
      <div :class="`${!status.length && 'mb-3'}`">
        <h6
          v-text="name"
          :class="`text-lg font-bold ${
            status.length ? 'text-[#00000050]' : ''
          }`"
        ></h6>
        <span
          v-text="type"
          :class="`font-medium ${status.length ? 'text-[#00000050]' : ''}`"
        />
      </div>
      <a
        v-if="!status.length"
        :href="to"
        target="_blank"
        class="font-medium text-primary-green z-20"
      >
        <span class="text-[#0CAE87] text-base">Learn More</span>
      </a>
      <span
        v-if="status && status === 'accepted'"
        class="block text-white bg-[#0CAE87] p-2 mt-5 z-30"
      >
        Accepted
      </span>
      <span
        v-if="status && status === 'applied'"
        class="block text-white bg-[#797979] p-2 mt-5 z-30"
      >
        Applied
      </span>
      <span
        v-if="status && status === 'declined'"
        class="block text-white bg-[#FFBE24] p-2 mt-5 z-30"
      >
        Declined
      </span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  to: {
    type: String,
    default: "/",
  },
  name: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    default: "",
  },
});

const emits = defineEmits(["onClick"]);

// Methods
const toggleBorder = (el) =>
  el.parentElement.classList.toggle("!border-[#0CAE87]");

const onClick = () => emits("onClick");
</script>

<style>
.card {
  @apply rounded-md shadow-md shadow-[#00000015] w-[220px] h-[240px] overflow-hidden text-center border-2 border-white hover:border-[#0CAE87] transition-all duration-150 cursor-pointer relative;
}

.card.before-border {
  @apply before:content-[""] before:block before:absolute before:top-0 before:w-full before:h-5;
}

.card.accepted {
  @apply before:bg-[#0CAE87] cursor-auto border-0;
}

.card.applied {
  @apply before:bg-[#797979] cursor-pointer border-0;
}

.card.declined {
  @apply before:bg-[#FFBE24] cursor-auto border-0;
}

.after-border {
  @apply after:content-[""] after:block after:absolute after:bottom-2 after:left-0 after:right-0 after:w-11/12 after:h-[1px] after:mx-auto after:bg-[#ddd];
}
</style>
