<template>
  <div
    class="relative flex flex-col gap-6 overflow-auto mt-10 px-1"
    :style="{ height: tableHeight }"
  >
    <BaseToggle title="Foundation complete" />
    <BaseToggle title="D&B Paydex Score" />
    <BaseToggle title="Bank Account Statements" />
    <BaseToggle title="Personal Credit" />
    <BaseToggle title="Bank Account Balance" />
    <BaseToggle title="Foundation complete" />
    <BaseToggle title="Foundation complete" />
    <BaseToggle title="Foundation complete" />
    <BaseToggle title="Foundation complete" />
    <div class="custom-drop-shadow table-footer">
      <span class="text-xl font-semibold">Tradelines Match</span>
      <div><span class="text-2xl font-bold">0</span> / 156</div>
    </div>
  </div>
</template>
<script setup>
import BaseToggle from "./BaseToggle.vue";

defineProps({
  tableHeight: {
    type: String,
    default: "200px",
  },
});
</script>

<style scoped>
.table-footer {
  @apply sticky bottom-0 h-20 py-2 px-5 bg-sunglow-blue flex justify-between items-center text-white;
}

.custom-drop-shadow {
  filter: drop-shadow(0 3px 16px #19649916);
}
</style>
