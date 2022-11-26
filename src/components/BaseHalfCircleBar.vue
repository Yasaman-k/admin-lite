<template>
  <div class="flex flex-col items-center my-7 w-full">
    <div class="svg-container">
      <svg viewbox="0 0 220 200" preserveAspectRatio="xMidYMin slice">
        <path class="grey" d="M5,175 A40,40 0 1,1 340,175" fill="none" />
        <path
          fill="none"
          id="progress"
          class="blue"
          d="M5,175 A40,40 0 1 1 340,175"
        />

        <text
          x="50%"
          y="75%"
          dominant-baseline="middle"
          text-anchor="middle"
          style="font-size: 72px; fill: #495a67"
        >
          {{ percent }}
        </text>
        <!-- Number -->
        <text
          x="10%"
          y="85%"
          dominant-baseline="middle"
          text-anchor="middle"
          style="font-size: 22px; fill: #b7c1d1"
        >
          30
        </text>
        <text
          x="17%"
          y="55%"
          dominant-baseline="middle"
          text-anchor="middle"
          style="font-size: 22px; fill: #b7c1d1"
        >
          40
        </text>
        <text
          x="30%"
          y="30%"
          dominant-baseline="middle"
          text-anchor="middle"
          style="font-size: 22px; fill: #b7c1d1"
        >
          50
        </text>
        <text
          x="50%"
          y="20%"
          dominant-baseline="middle"
          text-anchor="middle"
          style="font-size: 22px; fill: #b7c1d1"
        >
          60
        </text>
        <text
          x="70%"
          y="30%"
          dominant-baseline="middle"
          text-anchor="middle"
          style="font-size: 22px; fill: #b7c1d1"
        >
          70
        </text>
        <text
          x="85%"
          y="55%"
          dominant-baseline="middle"
          text-anchor="middle"
          style="font-size: 22px; fill: #b7c1d1"
        >
          80
        </text>
        <text
          x="90%"
          y="85%"
          dominant-baseline="middle"
          text-anchor="middle"
          style="font-size: 22px; fill: #b7c1d1"
        >
          90
        </text>
      </svg>
    </div>
    <span class="text-[#196499] text-2xl">
      {{ title }}
    </span>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: "",
  },
  percent: {
    type: String,
    default: "057",
  },
});
</script>

<style scoped>
.svg-container {
  @apply relative w-full;
}

svg {
  @apply mx-auto w-[345px] h-[180px];
}

path {
  stroke-linecap: round;
  stroke-width: 6;
  width: 100%;
}

path.grey {
  @apply stroke-[#DCE0E7];
}

path.blue {
  @apply stroke-[#196499];
  stroke-dasharray: 706px;
  stroke-dashoffset: 471px;
}
</style>
