<template>
  <div class="vendor-details-sidebar">
    <IconClose class="absolute top-8 right-10 cursor-pointer" @click="close" />
    <div
      class="bg-white w-[194px] h-[112px] rounded-md p-3 drop-shadow-md shadow-[#000000]"
    >
      <img :src="image" :alt="name" />
    </div>
    <div class="mt-3">
      <h4 class="text-[#196499] text-[25px] font-semibold">{{ name }}</h4>
      <span class="text-[#9C9C9C] text-sm">{{ type }}</span>
      <p class="mt-2 flex items-center gap-4">
        Reports to:
        <span class="text-[15px] text-[#9C9C9C]">
          {{
            reportsTo.length
              ? `${reportsTo.map((report) => report.title).join(", ")}`
              : ""
          }}
        </span>
      </p>
      <p class="mt-2 flex items-center gap-4">
        Terms:
        <span class="text-[15px] text-[#9C9C9C]">
          {{
            terms.length ? ` ${terms.map((term) => term.title).join(", ")}` : ""
          }}
        </span>
      </p>
      <p class="mt-2 flex items-center gap-4">
        {{ description }}
      </p>
      <div class="mt-6">
        <h5 class="mb-2 text-[#196499] text-lg">
          Creditor/Lender Requirements:
        </h5>
        <div class="requirements" v-html="lenderRequirements"></div>
      </div>
      <div class="mt-6">
        <h5 class="mb-2 text-[#196499] text-lg">How to Apply:</h5>
        <div class="steps" v-html="applyingSteps"></div>
      </div>
      <router-link
        :to="`/funding/provider/${slug}`"
        class="btn-primary !bg-[#0CAE87] text-left mt-8 drop-shadow-md shadow-[#000000] !text-base border border-[#0CAE87] flex justify-between items-center"
      >
        Apply Now
        <IconRightArrow />
      </router-link>
    </div>
  </div>
</template>

<script setup>
import IconRightArrow from "../Icon/IconRightArrow.vue";

defineProps({
  image: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "",
  },
  slug: {
    type: String,
    default: "",
  },
  reportsTo: {
    type: Array,
    default: () => [],
  },
  terms: {
    type: Array,
    default: () => [],
  },
  description: {
    type: String,
    default: "",
  },
  lenderRequirements: {
    type: String,
    default: "",
  },
  applyingSteps: {
    type: String,
    default: "",
  },
});

const emits = defineEmits(["close"]);
// Methods
const close = () => emits("close");
</script>

<style scoped>
.vendor-details-sidebar {
  @apply relative h-screen w-full bg-[#FAFDFF] px-8 pt-4 pb-10;
}

.vendor-details-sidebar .requirements {
  @apply flex flex-col gap-3;
}

.vendor-details-sidebar .requirements p {
  @apply flex items-center gap-1;
}

.vendor-details-sidebar .requirements p {
  @apply before:content-check-mark before:block before:w-5 before:h-5;
}

.vendor-details-sidebar .steps {
  @apply flex flex-col gap-3;
}

.vendor-details-sidebar .steps b,
.vendor-details-sidebar .steps bold,
.vendor-details-sidebar .steps strong {
  @apply text-[#196499] font-semibold;
}
</style>
