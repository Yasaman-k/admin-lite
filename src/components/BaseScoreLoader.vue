<template>
  <div
    class="bg-[#FAFDFF] border border-[#E2ECF3] px-2 py-2 mt-3 rounded-md overflow-hidden relative flex justify-between font-medium"
  >
    <span class="text-xl tex-[#3B4C68]">{{ scoreTitle }}</span>
    <span class="text-[#B7C1D1]" v-if="!scorePercent.length"
      >{{ currentScore }} of {{ totalScore }}</span
    >
    <span class="text-[#B7C1D1]" v-if="scorePercent.length">{{
      scorePercent
    }}</span>
    <div
      class="bg-white rounded-full h-2.5 absolute -bottom-[2px] -left-1 -right-1"
    >
      <div
        v-if="!scorePercent.length"
        :class="`bg-[${barColor}] h-2.5 rounded-full`"
        :style="`width: ${
          parseInt(currentScore) === 0
            ? 3
            : (parseInt(currentScore) / parseInt(totalScore)) * 100
        }%`"
      ></div>
      <div
        v-if="scorePercent.length"
        :class="`bg-[${barColor}] h-2.5 rounded-full`"
        :style="`width: ${
          parseInt(scorePercent) === 0 ? 3 : parseInt(scorePercent)
        }%`"
      ></div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  scoreTitle: {
    type: String,
    default: "",
  },
  currentScore: {
    type: String,
    default: "",
  },
  totalScore: {
    type: String,
    default: "",
  },
  scorePercent: {
    type: String,
    default: "",
  },
  barColor: {
    type: String,
    default: "#FFBE24",
  },
});
</script>
<style scoped></style>
