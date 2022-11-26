<template>
  <div>
    <p class="text-[#196499] text-xl font-medium" v-html="question" />
  </div>
  <div class="mt-6">
    <label
      class="cursor-pointer relative ml-8 mr-10 text-[#061017] custom-radio"
    >
      <input
        type="radio"
        :name="radioName"
        :value="firstValue"
        class="relative appearance-none"
        :checked="answer === firstValue"
        @change="(e) => onChange(e.target.value)"
      />
      <span class="check-circle"></span>
      {{ firstLabel }}
    </label>
    <label class="cursor-pointer relative ml-48 text-[#061017] custom-radio">
      <input
        type="radio"
        :name="radioName"
        :value="secondValue"
        class="relative appearance-none"
        :checked="answer === secondValue"
        @change="(e) => onChange(e.target.value)"
      />
      <span class="check-circle"></span>
      {{ secondLabel }}
    </label>
  </div>
</template>

<script setup>
defineProps({
  question: {
    type: String,
    default: "Ask a question.",
  },
  radioName: {
    type: String,
    default: "",
  },
  firstLabel: {
    type: String,
    default: "",
  },
  firstValue: {
    type: String,
    default: "",
  },
  secondLabel: {
    type: String,
    default: "",
  },
  secondValue: {
    type: String,
    default: "",
  },
  answer: {
    type: String,
    default: "",
  },
});

const emits = defineEmits(["onChange"]);

const onChange = (value) => emits("onChange", value);
</script>

<style scoped>
.custom-radio input::before {
  @apply content-[''] absolute -left-7 -top-[1.1rem] block w-6 h-6 border-2 border-[#495A67] rounded-full p-2 cursor-pointer;
}

.custom-radio input:checked + .check-circle {
  @apply bg-[#495A67] absolute -left-6 top-[1px] block w-4 h-4 rounded-full;
}
</style>
