<template>
  <label class="cursor-pointer relative">
    <input
      type="radio"
      :name="radioName"
      :value="value"
      class="appearance-none sr-only"
      :disabled="disabled"
      :checked="checked"
      @change="onChange"
    />
    <div
      v-if="negative"
      class="icon text-[#FF5E5E] absolute -top-1 -left-1 z-10"
    >
      <component :is="`IconDot`" />
    </div>
    <div
      v-if="caution"
      class="icon text-yellow-300 absolute -top-1 -left-1 z-10"
    >
      <component :is="`IconDot`" />
    </div>
    <div
      class="radio-box group"
      :class="[
        {
          'classic-radio': !icon.length,
          'border-yellow-300': caution,
          'border-[#FF5E5E]': negative,
        },
      ]"
    >
      <div class="checked-icon">
        <component :is="`IconChecked`" />
      </div>
      <div class="flex items-center gap-4">
        <div
          v-if="icon"
          class="box-icon text-main-gray group-hover:text-primary-green"
          :class="[
            {
              'group-hover:text-[#061017]': !icon.length,
            },
          ]"
        >
          <component :is="`Icon${icon}`" />
        </div>

        <span
          class="box-text text-[#061017] text-base font-medium group-hover:text-primary-green"
          :class="[
            {
              'group-hover:text-[#061017]': !icon.length,
            },
          ]"
        >
          {{ text }}</span
        >
      </div>
    </div>
  </label>
</template>

<script setup>
// Props & Emits
defineProps({
  radioName: {
    type: String,
    default: "",
  },
  text: {
    type: String,
    default: "Commercial Address",
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
  negative: {
    type: Boolean,
    default: false,
  },
  caution: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits(["select"]);

// Methods
const onChange = (event) => emits("select", event.target.value);
</script>

<style scoped>
input:checked ~ .icon {
  @apply hidden;
}

.radio-box {
  @apply h-full flex px-5 py-[30px] border border-[#ddd] rounded-md hover:border-primary-green relative transition-all duration-100;
}

input:checked ~ .radio-box {
  @apply bg-[#EDF5FB] border-[#C2D2DE] shadow-md shadow-gray-200;
}
input ~ .radio-box .checked-icon {
  @apply hidden;
}
input:checked ~ .radio-box .checked-icon {
  @apply block absolute -top-2 -left-2;
}
input:checked ~ .radio-box .box-icon,
input:checked ~ .radio-box .box-text {
  @apply text-primary-green;
}
input:checked ~ .radio-box .box-text {
  @apply font-semibold;
}

/* Classic Radio Button */
.radio-box.classic-radio {
  @apply hover:bg-[#fff] hover:border-[#ddd];
}
.radio-box.classic-radio .box-text {
  @apply relative indent-9  before:content-[""] before:block before:w-6 before:h-6 before:border-2 before:border-main-gray before:rounded-full before:absolute before:left-0 before:top-0;
}

input:checked ~ .radio-box.classic-radio {
  @apply bg-[#fff] border-[#ddd] shadow-none;
}

input:checked ~ .radio-box.classic-radio .checked-icon {
  @apply hidden;
}
input:checked ~ .radio-box.classic-radio .box-icon,
input:checked ~ .radio-box.classic-radio .box-text {
  @apply text-[#061017];
}
input:checked ~ .radio-box.classic-radio .box-text {
  @apply font-medium after:content-[""] after:block after:w-[18px] after:h-[18px] after:rounded-full after:bg-main-gray after:absolute after:top-[2.5px] after:left-[2.5px];
}
</style>
