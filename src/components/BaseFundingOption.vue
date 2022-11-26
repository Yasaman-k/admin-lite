<template>
  <label class="cursor-pointer relative">
    <input
      type="radio"
      :name="radioName"
      :value="value"
      class="appearance-none sr-only radio-btn"
      :checked="checked"
      @change="onChange"
    />

    <div
      class="box h-full w-[107%] px-5 py-[30px] ml-5 bg-white border border-[#DDDDDD] rounded-md group hover:bg-[#FAFDFF] hover:border-[#E1E9EF] relative transition-all duration-100"
    >
      <div v-if="matched" class="absolute -top-2.5 -right-3">
        <IconMatchNew />
      </div>
      <div class="flex items-center gap-4">
        <div v-if="icon" class="text-[#196499]">
          <component :is="`Icon${icon}`" class="w-8 h-8" />
        </div>

        <span class="text-[#196499] text-[25px] font-semibold">
          {{ title }}</span
        >
      </div>
      <p v-text="desc" class="block mt-5 checked:font-semibold" />
    </div>
  </label>
</template>

<script setup>
import { useRouter } from "vue-router";
import IconMatchNew from "./Icon/IconMatchNew.vue";

const router = useRouter();

const props = defineProps({
  radioName: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "Business Credit Financing",
  },
  desc: {
    type: String,
    default: "",
  },
  icon: {
    type: String,
    default: "",
  },
  value: {
    type: String,
    default: "",
  },
  checked: {
    type: Boolean,
    default: false,
  },
  matched: {
    type: Boolean,
    default: false,
  },
  to: {
    type: String,
    default: "/funding/funding-explorer/business_credit_financing",
  },
});

const emits = defineEmits(["select"]);

const onChange = (e) => {
  emits("select", e.target.value);
  router.push(`/funding/funding-explorer/${props.to}`);
};
</script>

<style scoped>
.radio-btn:checked ~ .box {
  @apply border-[2px] !border-sunglow-blue;
}
</style>
