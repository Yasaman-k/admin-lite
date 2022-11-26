<template>
  <form
    @submit.prevent
    :class="`${!completePage && 'mb-3'} ${!multipleOwners && 'mt-7'} ${
      multipleOwners && notFirstOwner && 'mt-4'
    } ${multipleOwners && !notFirstOwner && 'mt-10'}`"
  >
    <div
      :class="`flex justify-start gap-0 items-center ${
        completePage && 'custom-drop-shadow'
      }`"
    >
      <!-- Owner -->
      <div class="relative w-2/3">
        <input
          :id="id"
          ref="input"
          type="text"
          :required="required"
          :disabled="editDisabled"
          :value="ownerValue"
          tabindex="1"
          :placeholder="placeholder"
          :maxlength="length"
          :class="[
            'p-4 text-gray-900 border border-r-0 w-full font-semibold border-[#C9C9C9]  rounded-[4px] rounded-tr-none rounded-br-none text-md placeholder:!text-white focus:placeholder:!text-[#BCBCBC] placeholder:text-md placeholder:font-semibold focus:outline-none disabled:font-medium disabled:bg-white',
            { 'border-error': empty || error },
            {
              ' disabled:text-black': editDisabled && !completePage,
            },
            {
              ' border-0 disabled:!bg-[#fafdff]': completePage,
            },
            {
              '  h-16': completePage && !multipleOwners,
            },
          ]"
          @input="updateOwnerValue"
          @focus="ownerOnFocus"
          @blur="ownerOnBlur"
        />
        <label
          v-if="label"
          :class="[
            'absolute top-4 left-4 flex items-center font-semibold bg-white pl-1.5 pr-5 text-[#BCBCBC] transition-all duration-200 ease-in-out pointer-events-none',
            {
              '-top-2.5 left-2.5 font-normal text-xs':
                ownerActive || ownerValue.length > 0,
            },
            { 'text-error': empty || error },
            { ' text-[#575757]': editDisabled && !completePage },
            { ' top-0 text-[#196499]': editDisabled && completePage },
            { ' -top-7 bg-transparent text-[#196499]': multipleOwners },
            { ' hidden': multipleOwners && notFirstOwner },
            {
              ' bg-transparent': completePage,
            },
            {
              '  !top-2': completePage && !multipleOwners,
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
          {{ customError && !empty ? customErrorMessage : errorMessage }}
        </span>
      </div>
      <!-- Title -->
      <div class="relative w-2/3 before-border">
        <input
          ref="input"
          :id="id"
          type="text"
          :required="required"
          :disabled="editDisabled"
          :value="titleValue"
          tabindex="1"
          placeholder="Owner Title"
          :maxlength="length"
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
              '  h-16': completePage && !multipleOwners,
            },
          ]"
          @input="updateTitleValue"
          @focus="titleOnFocus"
          @blur="titleOnBlur"
        />
        <label
          :class="[
            'absolute top-4 left-4 flex items-center font-semibold bg-white pl-1.5 pr-5 text-[#BCBCBC] transition-all duration-200 ease-in-out pointer-events-none',

            {
              '-top-2.5 left-2.5 font-normal text-xs':
                titleActive || titleValue.length > 0,
            },
            { 'text-error': empty || error },
            { ' hidden': editDisabled && !completePage },
            { ' top-0 text-[#196499]': editDisabled && completePage },
            { ' -top-7 bg-transparent text-[#196499]': multipleOwners },
            { ' hidden': multipleOwners && notFirstOwner },
            {
              ' bg-transparent': completePage,
            },
            {
              '  !top-2': completePage && !multipleOwners,
            },
          ]"
        >
          Owner Title
        </label>
      </div>
      <!-- Owner Percent -->
      <div class="relative w-2/3 before-border">
        <input
          ref="input"
          :id="id"
          @keyup.enter="onEnter"
          :type="editDisabled && id ? 'text' : 'number'"
          step="1"
          max="100"
          :required="required"
          :disabled="editDisabled"
          :value="editDisabled ? `${percentValue} %` : percentValue"
          tabindex="1"
          placeholder="Owned %"
          :maxlength="length"
          :class="[
            'hide-arrows p-4 text-gray-900 border border-l-0 w-full font-semibold border-[#C9C9C9] rounded-[4px] rounded-tl-none rounded-bl-none text-md placeholder:!text-white focus:placeholder:!text-[#BCBCBC] placeholder:text-md placeholder:font-semibold focus:outline-none disabled:font-medium disabled:bg-white',
            { 'border-error': empty || error },
            {
              ' disabled:text-black': editDisabled && !completePage,
            },
            {
              ' border-0 disabled:!bg-[#fafdff]': completePage,
            },
            {
              '  h-16': completePage && !multipleOwners,
            },
          ]"
          @input="updatePercentValue"
          @focus="percentOnFocus"
          @blur="percentOnBlur"
        />
        <label
          :class="[
            'absolute top-4 left-4 flex items-center font-semibold bg-white pl-1.5 pr-5 text-[#BCBCBC] transition-all duration-200 ease-in-out pointer-events-none',
            {
              '-top-2.5 left-2.5 font-normal text-xs':
                percentActive || percentValue.length > 0,
            },
            { 'text-error': empty || error },
            { ' hidden': editDisabled && !completePage },
            { ' top-0 text-[#196499]': editDisabled && completePage },
            { ' -top-7 bg-transparent text-[#196499]': multipleOwners },
            { ' hidden': multipleOwners && notFirstOwner },
            {
              ' bg-transparent': completePage,
            },
            {
              '  !top-2': completePage && !multipleOwners,
            },
          ]"
        >
          {{ completePage && !multipleOwners ? "Ownership" : "" }}
          {{ !completePage ? "Owned %" : "" }}
          {{ completePage && multipleOwners ? "Ownership Percentage" : "" }}
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
        <IconEdit
          class="cursor-pointer absolute right-14 top-5"
          @click="onEdit"
          v-if="editDisabled && !completePage"
        />
        <IconTrash
          class="cursor-pointer absolute right-5 top-5"
          @click="onDelete"
          v-if="editDisabled && !completePage"
        />
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
      ownerActive: false,
      titleActive: false,
      percentActive: false,
      empty: false,
      editDisabled: false,
      customError: false,
      customErrorMessage: "Owned percent can't be more than 100",
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
    ownerValue: {
      type: String,
      default: "",
    },
    titleValue: {
      type: String,
      default: "",
    },
    percentValue: {
      type: String,
      default: "",
    },
    required: {
      type: Boolean,
      default: false,
    },
    length: {
      type: String,
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
    multipleOwners: {
      type: Boolean,
      default: false,
    },
    notFirstOwner: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    saveDisable() {
      if (
        this.ownerValue.length &&
        this.titleValue.length &&
        this.percentValue.length &&
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
    // Owner
    updateOwnerValue(e) {
      this.empty = false;
      this.$emit("ownerInput", e);
    },
    ownerOnFocus(e) {
      this.ownerActive = true;
      this.$emit("ownerFocus", e);
    },
    ownerOnBlur(e) {
      this.$emit("ownerBlur", e);
      this.ownerActive = false;
    },
    // Owner Title
    updateTitleValue(e) {
      this.empty = false;
      this.$emit("titleInput", e);
    },
    titleOnFocus(e) {
      this.titleActive = true;
      this.$emit("titleFocus", e);
    },
    titleOnBlur(e) {
      this.$emit("titleBlur", e);
      this.titleActive = false;
    },
    // Owner Percent
    updatePercentValue(e) {
      this.empty = false;
      this.percentActive = false;
      this.$emit("percentInput", e);

      return (this.customError = false);
    },
    percentOnFocus(e) {
      this.percentActive = true;
      this.$emit("percentFocus", e);
    },
    percentOnBlur(e) {
      this.$emit("percentBlur", e);
      this.percentActive = false;
    },
    // Edit
    onEdit() {
      this.editDisabled = false;
    },
    onAdd() {
      const validNum = this.percentValue <= 100;
      if (
        !this.percentValue ||
        this.titleValue.length < 1 ||
        !this.ownerValue.length
      ) {
        return (this.empty = true);
      } else if (!validNum) {
        return (this.customError = true);
      }
      this.$emit("submit");
    },
    onUpdate() {
      this.$store.dispatch("ownership/updateOwnership", {
        id: this.id,
        owner: {
          name: this.ownerValue,
          title: this.titleValue,
          owned: parseInt(this.percentValue),
        },
      });
      this.editDisabled = true;
    },
    onDelete() {
      this.$store.dispatch("ownership/deleteOwnership", this.id);
    },
    onEnter() {
      if (!this.editDisabled && !this.id) {
        const validNum = this.percentValue <= 100;
        if (
          !this.percentValue ||
          this.titleValue.length < 1 ||
          !this.ownerValue.length
        ) {
          return (this.empty = true);
        } else if (!validNum) {
          return (this.customError = true);
        }
        return this.$emit("submit");
      }
      this.$store.dispatch("ownership/updateOwnership", {
        id: this.id,
        owner: {
          name: this.ownerValue,
          title: this.titleValue,
          owned: parseInt(this.percentValue),
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
