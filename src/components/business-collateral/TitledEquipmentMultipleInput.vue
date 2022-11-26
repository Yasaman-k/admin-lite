<template>
  <form @submit.prevent class="">
    <div
      :class="`flex justify-start gap-0 items-center ${
        completePage && 'custom-drop-shadow'
      }`"
    >
      <!-- Titled Equipment -->
      <div class="relative grow-0 shrink-0 basis-1/4">
        <input
          :id="id"
          ref="input"
          type="text"
          :required="required"
          :disabled="editDisabled"
          :value="titledEquipmentYear"
          maxlength="4"
          tabindex="1"
          :placeholder="placeholder"
          :class="[
            'p-4 text-gray-900 border border-r-0 w-full font-semibold border-[#C9C9C9] rounded-[4px] rounded-tr-none rounded-br-none text-md placeholder:!text-white focus:placeholder:!text-[#BCBCBC] placeholder:text-md placeholder:font-semibold focus:outline-none disabled:font-medium disabled:bg-white',
            { 'border-error': empty || error },
            {
              ' disabled:text-[#061017]': editDisabled && !completePage,
            },
            {
              ' border-0 disabled:!bg-[#fafdff]': completePage,
            },
            {
              '  h-16': completePage,
            },
          ]"
          @input="updateTitledEquipmentYear"
          @focus="titledEquipmentYearOnFocus"
          @blur="titledEquipmentYearOnBlur"
        />
        <label
          v-if="label"
          :class="[
            'absolute top-4 left-4 flex items-center font-semibold bg-white pl-1.5 pr-5 text-[#BCBCBC] transition-all duration-200 ease-in-out pointer-events-none whitespace-nowrap',
            {
              '-top-2.5 left-2.5 font-normal text-xs':
                yearActive || titledEquipmentYear.length > 0,
            },
            { 'text-error': empty || error },
            {
              ' bg-transparent text-[#061017] left-3 !top-1 text-xs font-normal':
                completePage,
            },
          ]"
        >
          {{ label }}
        </label>
        <span
          v-if="empty || error || customError"
          :class="{
            'text-error absolute left-1 -bottom-7 w-[320px]':
              empty || error || customError,
          }"
        >
          {{ customError && !empty ? "" : errorMessage }}
        </span>
      </div>
      <!-- Title -->
      <div class="relative before-border grow-0 shrink-0 basis-1/4">
        <input
          ref="input"
          :id="id"
          type="text"
          :required="required"
          :disabled="editDisabled"
          :value="makeValue"
          tabindex="1"
          placeholder="Make"
          :class="[
            'p-4 text-gray-900 border border-x-0 w-full font-semibold border-[#C9C9C9] text-md placeholder:!text-white focus:placeholder:!text-[#BCBCBC] placeholder:text-md placeholder:font-semibold focus:outline-none disabled:font-medium disabled:bg-white',
            { 'border-error': empty || error },
            {
              ' disabled:text-black': editDisabled && !completePage,
            },
            {
              ' border-0 disabled:!bg-[#fafdff]': completePage,
            },
            {
              '  h-16': completePage,
            },
          ]"
          @input="updateMakeValue"
          @focus="makeOnFocus"
          @blur="makeOnBlur"
        />
        <label
          :class="[
            'absolute top-4 left-4 flex items-center font-semibold bg-white pl-1.5 pr-5 text-[#BCBCBC] transition-all duration-200 ease-in-out pointer-events-none',

            {
              '-top-2.5 left-2.5 font-normal text-xs':
                makeActive || makeValue.length > 0,
            },
            { 'text-error': empty || error },
            { ' hidden': editDisabled || completePage },
          ]"
        >
          Make
        </label>
      </div>
      <!-- Model -->
      <div class="relative before-border grow-0 shrink-0 basis-1/4">
        <input
          ref="input"
          :id="id"
          @keyup.enter="onEnter"
          type="text"
          :required="required"
          :disabled="editDisabled"
          :value="modelValue"
          tabindex="1"
          placeholder="Model"
          :class="[
            'hide-arrows p-4 text-gray-900 border border-x-0 w-full font-semibold border-[#C9C9C9] text-md placeholder:!text-white focus:placeholder:!text-[#BCBCBC] placeholder:text-md placeholder:font-semibold focus:outline-none disabled:font-medium disabled:bg-white break-words',
            { 'border-error': empty || error },
            {
              ' disabled:text-black': editDisabled && !completePage,
            },
            {
              ' border-0 disabled:!bg-[#fafdff]  pr-20 text-ellipsis':
                completePage,
            },
            {
              '  h-16': completePage,
            },
          ]"
          @input="updateModelValue"
          @focus="modelOnFocus"
          @blur="modelOnBlur"
        />
        <label
          :class="[
            'absolute top-4 left-4 flex items-center font-semibold bg-white pl-1.5 pr-5 text-[#BCBCBC] transition-all duration-200 ease-in-out pointer-events-none',

            {
              '-top-2.5 left-2.5 font-normal text-xs':
                modelActive || modelValue.length > 0,
            },
            { 'text-error': empty || error },
            { ' hidden': editDisabled && !completePage },
            { ' top-0 text-[#196499]': editDisabled && completePage },

            {
              ' bg-transparent': completePage,
            },
            {
              '  !top-2': completePage,
            },
          ]"
        >
          {{ !completePage ? "Model" : "" }}
        </label>
      </div>
      <!-- Estimated Value -->
      <div class="relative before-border grow-0 shrink-0 basis-1/4">
        <input
          ref="input"
          :id="id"
          @keyup.enter="onEnter"
          type="text"
          :required="required"
          :disabled="editDisabled"
          :value="`${completePage ? '$ ' + estimatedValue : estimatedValue}`"
          tabindex="1"
          placeholder="Estimated Value"
          :class="[
            'hide-arrows p-4 pr-0 text-gray-900 break-words border border-l-0 w-full font-semibold border-[#C9C9C9] rounded-[4px] rounded-tl-none rounded-bl-none text-md placeholder:!text-white focus:placeholder:!text-[#BCBCBC] placeholder:text-md placeholder:font-semibold focus:outline-none disabled:font-medium disabled:bg-white',
            { 'border-error': empty || error },
            {
              ' disabled:text-black': editDisabled && !completePage,
            },
            {
              ' border-0 disabled:!bg-[#fafdff]  pr-20 text-ellipsis':
                completePage,
            },
            {
              '  h-16': completePage,
            },
          ]"
          @input="updateEstimatedValue"
          @focus="estimatedValueOnFocus"
          @blur="estimatedValueOnBlur"
        />
        <label
          :class="[
            'absolute top-4 left-4 flex items-center font-semibold bg-white pl-1.5 pr-5 text-[#BCBCBC] transition-all duration-200 ease-in-out pointer-events-none',

            {
              '-top-2.5 left-2.5 font-normal text-xs':
                estimatedActive || estimatedValue.length,
            },
            { 'text-error': empty || error },
            { ' hidden': editDisabled && !completePage },
            { ' top-0 text-[#196499]': editDisabled && completePage },

            {
              ' bg-transparent': completePage,
            },
            {
              '  !top-2': completePage,
            },
          ]"
        >
          {{ !completePage ? "Estimated Value" : "" }}
        </label>
        <IconReturnArrow
          v-if="!editDisabled && id"
          @click="onUpdate"
          class="cursor-pointer absolute right-3 top-5"
        />
        <IconReturnArrow
          v-if="!editDisabled && !id"
          @click="onAdd"
          class="cursor-pointer absolute right-3 top-5"
        />
        <router-link
          to="/fundability/financials/business-collateral/titled-equipment"
        >
          <IconEdit
            class="cursor-pointer absolute right-14 top-5"
            v-if="editDisabled && completePage"
          />
        </router-link>
        <IconEdit
          class="cursor-pointer absolute right-14 top-5"
          @click="onEdit"
          v-if="editDisabled && !completePage"
        />
        <button
          type="button"
          class="absolute right-5 top-5"
          @click="onDelete"
          v-if="editDisabled && !completePage"
        >
          <IconTrash class="d-block" />
        </button>
      </div>
    </div>
    <button
      v-if="!editDisabled && id"
      type="button"
      @click="onUpdate"
      class="btn-primary mt-10"
      tabindex="1"
      :disabled="saveDisable"
    >
      Save
    </button>
    <button
      v-if="!editDisabled && !id"
      type="button"
      @click="onAdd"
      class="btn-primary mt-10"
      tabindex="1"
      :disabled="saveDisable"
    >
      Save
    </button>
  </form>
</template>

<script>
import IconReturnArrow from "../Icon/IconReturnArrow.vue";
export default {
  data() {
    return {
      yearActive: false,
      makeActive: false,
      modelActive: false,
      estimatedActive: false,
      empty: false,
      editDisabled: false,
      customError: false,
    };
  },
  props: {
    placeholder: {
      type: String,
      default: "Field Name",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    completePage: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "Field Name Label",
    },
    titledEquipmentYear: {
      type: String,
      default: "",
    },
    makeValue: {
      type: String,
      default: "",
    },
    modelValue: {
      type: String,
      default: "",
    },
    estimatedValue: {
      type: String,
      default: "",
    },
    required: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String,
      default: "",
    },
    error: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      default: "",
    },
  },
  computed: {
    saveDisable() {
      if (
        this.titledEquipmentYear.length &&
        this.makeValue.length &&
        this.modelValue.length &&
        this.estimatedValue.length &&
        !this.customError
      ) {
        return false;
      }
      return true;
    },
  },
  mounted() {
    return (this.editDisabled = this.disabled);
  },
  methods: {
    // year
    updateTitledEquipmentYear(e) {
      this.empty = false;
      this.$emit("yearInput", e);
    },
    titledEquipmentYearOnFocus(e) {
      this.yearActive = true;
      this.$emit("yearFocus", e);
    },
    titledEquipmentYearOnBlur(e) {
      this.$emit("yearBlur", e);
      this.yearActive = false;
    },
    // Make
    updateMakeValue(e) {
      this.empty = false;
      this.$emit("makeInput", e);
    },
    makeOnFocus(e) {
      this.makeActive = true;
      this.$emit("makeFocus", e);
    },
    makeOnBlur(e) {
      this.$emit("makeBlur", e);
      this.makeActive = false;
    },
    // Model
    updateModelValue(e) {
      this.empty = false;
      this.$emit("modelInput", e);

      return (this.customError = false);
    },
    modelOnFocus(e) {
      this.modelActive = true;
      this.$emit("modelFocus", e);
    },
    modelOnBlur(e) {
      this.$emit("modelBlur", e);
      this.modelActive = false;
    },
    // Estimated Value
    updateEstimatedValue(e) {
      this.empty = false;
      this.$emit("estimatedInput", e);

      return (this.customError = false);
    },
    estimatedValueOnFocus(e) {
      this.estimatedActive = true;
      this.$emit("estimatedFocus", e);
    },
    estimatedValueOnBlur(e) {
      this.$emit("estimatedBlur", e);
      this.estimatedActive = false;
    },
    // Edit
    onEdit() {
      this.editDisabled = false;
    },
    onAdd() {
      if (
        !this.modelValue ||
        this.makeValue.length < 1 ||
        !this.titledEquipmentYear.length ||
        !this.estimatedValue.length
      ) {
        return (this.empty = true);
      }
      this.$emit("submit");
    },
    onUpdate() {
      this.$store.dispatch("businessCollateral/updateEquipment", {
        id: this.id,
        equipment: {
          year: parseInt(this.titledEquipmentYear),
          make: this.makeValue,
          model: this.modelValue,
          value: this.estimatedValue,
        },
      });
      this.editDisabled = true;
    },
    onDelete(e) {
      if (!e.target.disabled)
        this.$store.dispatch("businessCollateral/deleteEquipment", this.id);
      e.target.disabled = true;
    },
    onEnter() {
      if (!this.editDisabled && !this.id) {
        if (
          !this.modelValue ||
          this.makeValue.length < 1 ||
          !this.titledEquipmentYear.length ||
          !this.estimatedValue.length
        ) {
          return (this.empty = true);
        }
        return this.$emit("submit");
      }
      this.$store.dispatch("businessCollateral/updateEquipment", {
        id: this.id,
        equipment: {
          year: parseInt(this.titledEquipmentYear),
          make: this.makeValue,
          model: this.modelValue,
          value: this.estimatedValue,
        },
      });
      this.editDisabled = true;
    },
  },
  components: { IconReturnArrow },
};
</script>

<style scoped>
.before-border {
  @apply before:content-[''] before:absolute before:left-0 before:top-[50%] before:translate-y-[-50%] before:block before:bg-[#C9C9C9] before:w-[2px] before:h-6;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  opacity: 1;
}

.custom-drop-shadow {
  filter: drop-shadow(0 0 10px #00000010);
}
</style>
