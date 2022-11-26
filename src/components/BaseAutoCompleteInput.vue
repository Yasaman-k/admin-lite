<template>
  <div class="relative">
    <div
      :class="[
        'px-4 py-[1.1rem] border w-full font-semibold border-[#C9C9C9] rounded-[4px] focus:outline-none disabled:bg-gray-50',
        { 'border-error': error },
      ]"
    >
      <div
        ref="input_box"
        class="border-0 outline-none text-gray-900 text-md relative h-5 whitespace-nowrap overflow-hidden"
        :tabindex="1"
        :contenteditable="!disabled"
        spellcheck="false"
        @click="() => autocomplete($refs.input_box, suggestionList)"
        @keydown="updateValue"
        @focus="() => onFocus($refs.input_box, suggestionList)"
        @blur="onBlur"
      >
        <span class="text-[#BCBCBC] text-md font-semibold">{{
          placeholder
        }}</span>
      </div>
    </div>
    <span
      v-if="label"
      :class="[
        'absolute top-4 left-4 flex items-center font-semibold bg-white pl-1.5 pr-5 text-[#BCBCBC] transition-all duration-200 ease-in-out pointer-events-none',
        { '-top-2.5 left-2.5 font-normal text-xs': active || hasValue },
        { 'text-error': error },
      ]"
    >
      {{ label }}
    </span>
    <span v-if="testError" :class="{ 'text-error leading-10': testError }">
      {{ errorMessage }}
    </span>
    <span v-if="error" :class="{ 'text-error leading-10': error }">
      {{ validMessage }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: "State",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "State",
    },
    name: {
      type: String,
      default: "State",
    },
    value: {
      type: String,
      default: "",
    },
    suggestionList: {
      type: Array,
    },
    errorMessage: {
      type: String,
      default: "",
    },
    testError: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      active: false,
      error: false,
      validMessage: `${this.name} doesn't exist`,
    };
  },
  computed: {
    hasValue() {
      return this.value.length > 0;
    },
  },
  methods: {
    updateValue(e) {
      this.$emit("input", e);
      this.error = false;
    },
    onFocus(input, suggestionList) {
      this.active = true;
      this.$emit("clearPlaceholder");
      this.autocomplete(input, suggestionList);
    },
    onBlur() {
      this.active = false;
      !this.hasValue ? (this.error = true) : (this.error = false);
    },
    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    getSelectionStartEnd(element) {
      let start = 0;
      let end = 0;
      let doc = element.ownerDocument || element.document;
      let win = doc.defaultView || doc.parentWindow;
      let sel;
      if (typeof win.getSelection != "undefined") {
        sel = win.getSelection();
        if (sel.rangeCount > 0) {
          let range = win.getSelection().getRangeAt(0);
          let preCaretRange = range.cloneRange();
          preCaretRange.selectNodeContents(element);
          preCaretRange.setEnd(range.startContainer, range.startOffset);
          start = preCaretRange.toString().length;
          preCaretRange.setEnd(range.endContainer, range.endOffset);
          end = preCaretRange.toString().length;
        }
      } else if ((sel = doc.selection) && sel.type != "Control") {
        let textRange = sel.createRange();
        let preCaretTextRange = doc.body.createTextRange();
        preCaretTextRange.moveToElementText(element);
        preCaretTextRange.setEndPoint("EndToStart", textRange);
        start = preCaretTextRange.text.length;
        preCaretTextRange.setEndPoint("EndToEnd", textRange);
        end = preCaretTextRange.text.length;
      }
      return { start: start, end: end };
    },
    autocomplete(input, arr) {
      let fragmentVal = "";
      let restVal = "";
      let graySpan;
      let suggestionList;
      input.addEventListener("input", (e) => {
        if (e.target.textContent.length >= 2) {
          hideSuggestions();
          showSuggestions();
        }
      });
      input.addEventListener("keydown", (e) => {
        if (e.keyCode == 13) {
          // Enter
          e.preventDefault();
          selectSuggestion();
          let exist = arr.findIndex((el) => el.name === input.textContent);
          if (input.textContent.length === 0) {
            this.error = true;
            return (this.validMessage = `${this.name} is required.`);
          } else if (exist === -1) {
            this.error = true;
            return (this.validMessage = `${this.name} doesn't exist.`);
          } else {
            return (this.error = false);
          }
        } else if (e.keyCode == 39) {
          // ArrowRight
          if (this.getSelectionStartEnd(input).start === getText().length) {
            e.preventDefault();
            selectSuggestion();
          }
        } else if (e.keyCode == 27) {
          // Escape
          hideSuggestions();
        }
      });
      this.$el.addEventListener("click", (e) => {
        hideSuggestions(e.target);
      });
      input.addEventListener("blur", () => {
        selectSuggestion();
        let exist = arr.findIndex((el) => el.name === input.textContent);
        if (input.textContent.length === 0) {
          this.error = true;
          return (this.validMessage = `${this.name} is required.`);
        } else if (exist === -1) {
          this.error = true;
          return (this.validMessage = `${this.name} doesn't exist.`);
        } else {
          return (this.error = false);
        }
      });
      const showSuggestions = () => {
        if (suggestionList) return;
        let text = getText();
        if (text && !text.trim()) return;
        suggestionList = arr;
        suggestionList.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
        for (let i = 0; i < arr.length; i++) {
          let fragmentName = arr[i].name.substr(0, text.length);
          let restName = arr[i].name.substr(text.length);
          let fragmentCode = arr[i].abbreviation.substr(0, text.length);
          if (fragmentName === this.capitalize(text)) {
            createGraySpan(restName);
            fragmentVal = fragmentName;
            restVal = restName;
            break;
          } else if (fragmentCode === text.toUpperCase()) {
            fragmentVal = fragmentName;
            restVal = restName;
            break;
          }
        }
      };
      const hideSuggestions = (exceptIfClicked) => {
        if (!suggestionList) return;
        if (exceptIfClicked && input.contains(graySpan))
          return selectSuggestion();
        suggestionList = null;
        input.contains(graySpan) && input.removeChild(graySpan);
        fragmentVal = "";
        restVal = "";
        graySpan = null;
      };
      const selectSuggestion = () => {
        if (!suggestionList) return;
        if (graySpan) graySpan.textContent = "";
        if (fragmentVal.length && restVal.length)
          input.textContent = fragmentVal + restVal;
        setCaretToEnd();
        hideSuggestions();
      };
      const setCaretToEnd = () => {
        let range = document.createRange();
        let sel = window.getSelection();
        let content = [...input.childNodes];
        let startNode = content.filter((el) => {
          return el.nodeType === Node.TEXT_NODE;
        })[0];
        range.setStart(startNode, input.textContent.length);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
        input.focus();
      };
      const getText = () => {
        let content = [...input.childNodes];
        let filterContent = content.filter(
          (el) => el.nodeType == Node.TEXT_NODE
        );
        if (filterContent[0]) {
          return filterContent[0].data;
        }
        return " ";
      };
      const createGraySpan = (rest) => {
        let content = [...input.childNodes];
        let filterContent = content.filter(
          (el) => el.nodeType != Node.TEXT_NODE
        );
        filterContent[0] && input.removeChild(filterContent[0]);
        graySpan = document.createElement("span");
        graySpan.className +=
          "autocomplete text-[#BCBCBC] text-md font-semibold";
        graySpan.textContent = rest;
        graySpan.addEventListener("mousedown focus", () => {
          selectSuggestion();
        });
        input.append(graySpan);
      };
    },
  },
  mounted() {
    setTimeout(
      () =>
        (this.$refs.input_box.textContent = this.capitalize(this.value) || ""),
      10
    );
  },
};
</script>
