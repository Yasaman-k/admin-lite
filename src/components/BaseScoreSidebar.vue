<template>
  <section
    class="h-screen bg-[#FAFDFF] border border-[#E2ECF3] relative px-8 pt-2 w-[40%] overflow-hidden"
    :class="extraClasses"
  >
    <div class="h-full overflow-auto pb-5">
      <BaseHalfCircleBar title="Fundability Score" percent="057" />
      <div class="flex flex-col gap-4 my-4">
        <p class="text-lg font-bold text-[#B7C1D1] flex justify-between">
          Approved Funding
          <span class="text-[#196499] font-normal">
            $ {{ approvedFunding }}
          </span>
        </p>
        <p class="text-lg font-bold text-[#B7C1D1] flex justify-between">
          Listed Accounts
          <span class="font-normal text-[#3B4C68]">{{ listedAccounts }}</span>
        </p>
      </div>

      <BaseScoreLoader
        v-for="scoreLoader in scoreLoaders"
        :key="scoreLoader.title"
        :scoreTitle="scoreLoader.title"
        :currentScore="scoreLoader.currentScore"
        :totalScore="scoreLoader.totalScore"
        :scorePercent="scoreLoader.scorePercent"
        :barColor="scoreLoader.color"
      />

      <div class="flex flex-col gap-4 mt-8" v-if="links.length">
        <router-link
          v-for="link in links"
          :key="link.name"
          :to="link.to"
          class="link"
        >
          {{ link.name }}
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import BaseScoreLoader from "./BaseScoreLoader.vue";
import BaseHalfCircleBar from "./BaseHalfCircleBar.vue";
defineProps({
  approvedFunding: {
    type: String,
    default: "- -",
  },
  listedAccounts: {
    type: Number,
  },
  scoreLoaders: {
    type: Array,
    default: () => [],
  },
  links: {
    type: Array,
    default: () => [],
  },
  extraClasses: {
    type: String,
    default: "",
  },
});
</script>

<style scoped>
.link {
  @apply text-lg font-medium text-[#196499];
}
</style>
