<template>
  <div class="flex">
    <div class="flex flex-col flex-1 gap-10 page-content">
      <BaseInput
        @input="(e) => (input = e.target.value)"
        :value="input"
        class="w-full"
      />
      <BaseInput
        @input="(e) => (input2 = e.target.value)"
        :value="input2"
        class="w-full"
        errorMessage="This is a custom error message"
        :error="true"
      />
      <BaseSelect
        @selected="(e) => (dropdown = e)"
        :value="dropdown.label"
        :dropdowns="dropdowns"
        label="Select a dropdown"
      />
      <BaseSelect
        @selected="(e) => (dropdown2 = e)"
        :value="dropdown2.label"
        :dropdowns="dropdowns2"
        label="Select a dropdown"
        errorMessage="This is a custom error message for select list"
      />
      <BaseRadioButton
        radioName="Radio Name"
        text="Home Address"
        icon="CommercialAddress"
        :checked="true"
      />
      <BaseRadioButton
        radioName="Radio Name"
        text="Home Address 2"
        icon="CommercialAddress"
        value="Value 2"
      />
      <BaseAutoCompleteInput
        @input="(e) => (state = e.target.textContent)"
        @clearPlaceholder="() => (statePlaceholder = '')"
        :value="state"
        :placeholder="statePlaceholder"
        errorMessage="State is required"
        :suggestionList="states"
      />
      <button class="btn-primary">Primary button</button>
      <button class="btn-primary" disabled>Primary button disabled</button>
      <button class="btn-secondary">Secondary button</button>
      <LeadingOption label="Leading Options" />
      <StepButton type="Done" text="Label" />
      <StepLabel label="Step Header" icon="HomeAddress" />
      <BaseQuestion label="Question/Header" />
      <p class="description">
        Description paragraph multiple line. Lorem ipsum dolor sit amet,
        consetetur <br />
        sadipscing elitr, sed diam nonumy
      </p>
      <FormHeader
        linkText="One line recommendation"
        to="/"
        desc="Clickable link related to recommendation"
      />
      <FormHeader to="/" linkText="Clickable Link" />
      <div class="flex flex-wrap items-center gap-10">
        <ResourceButton
          to="/"
          linkText="Go To Website"
          image="/images/regus.png"
          text="Regus Virtual Offices"
        />
        <ResourceButton
          to="/"
          linkText="Go To Website"
          image="/images/davinci.png"
          text="Davinci Virtual Offices"
        />
        <ResourceButton
          to="/"
          linkText="Go To Website"
          image="/images/davinci.png"
          text="Davinci Virtual Offices"
        />
        <ResourceButton
          to="/"
          linkText="Go To Website"
          image="/images/davinci.png"
          text="Davinci Virtual Offices"
        />
        <ResourceButton
          to="/"
          linkText="Go To Website"
          image="/images/davinci.png"
          text="Davinci Virtual Offices"
        />
        <ResourceButton
          to="/"
          linkText="Go To Website"
          image="/images/davinci.png"
          text="Davinci Virtual Offices"
        />
      </div>
      <h3>Bad Virtual Address Page Test</h3>
      <BadVirtualAddress />
    </div>
  </div>
</template>

<script>
import { states } from "../states";
import BaseRadioButton from "../components/BaseRadioButton.vue";
import ResourceButton from "../components/ResourceButton.vue";
import BaseAutoCompleteInput from "../components/BaseAutoCompleteInput.vue";
import BadVirtualAddress from "../components/business-address/BadVirtualAddress.vue";
export default {
  data() {
    return {
      input: "",
      input2: "",
      dropdowns: [
        {
          label: "Dropdown 1",
          value: "dropdown1",
        },
        {
          label: "Dropdown 2",
          value: "dropdown2",
        },
      ],
      dropdowns2: [
        {
          label: "Dropdown 1",
          value: "dropdown1",
        },
        {
          label: "Dropdown 2",
          value: "dropdown2",
        },
      ],
      dropdown: {},
      dropdown2: {},
      states,
      state: "",
      statePlaceholder: "State",
    };
  },
  components: {
    BaseRadioButton,
    ResourceButton,
    BaseAutoCompleteInput,
    BadVirtualAddress,
  },
};
</script>
