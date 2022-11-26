<template>
  <section class="container my-16 px-20">
    <BaseWarning
      icon="Warning"
      title="Your Business is in a high-risk industry"
      message="If you are in a high-risk industry, funding sources may look at your application with additional scrutiny and even decline credit and loans.  
      <br />
      <br />
      If your business provides multiple products and services, some in a high-risk category and others not, as long as they are similar we suggest selecting a non-high-risk industry from your various business operations."
      v-if="industry.is_risky"
    />
    <FormHeader
      formTitle="Business industry saved"
      icon="Location"
      linkText="Your NAICS code is recorded as follows:"
      desc="Update your business’s NAICS code with Credit Suite and the Secretary of State if your industry changes."
      v-if="!industry.is_risky"
    />
    <div class="relative mt-5">
      <BaseInput
        label="Business Industry"
        :disabled="true"
        :copy="true"
        :value="industry.title"
      />
      <span class="absolute top-5 right-16 text-[#061017] font-medium">
        {{ industry.code }}
      </span>
    </div>
    <BaseUpdateNextBtns
      updateLabel="Update Industry"
      updateLink="/fundability/foundation/business-industry/naics-code"
      nextLink="/fundability/foundation"
    />
  </section>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { useStore } from "vuex";
import FormHeader from "../FormHeader.vue";
import BaseInput from "../BaseInput.vue";
import BaseWarning from "../BaseWarning.vue";
import BaseUpdateNextBtns from "../BaseUpdateNextBtns.vue";

const store = useStore();

// Data
const industry = ref({
  title: "",
  code: "",
  is_risky: false,
});

// Hooks
onBeforeMount(() => {
  const industryObject = store.getters["businessIndustry/getBusinessIndustry"];
  industryObject
    ? (industry.value = industryObject.industry)
    : (industry.value = {
        title: "",
        code: "",
      });
});
</script>
