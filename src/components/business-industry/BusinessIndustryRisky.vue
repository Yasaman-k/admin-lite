<template>
  <section class="container my-16 px-20">
    <BaseWarning
      icon="Warning"
      title="Update your industry on your next tax filing"
      message="Use the new industry and NAICS code you selected when applying for any new funding.
              <br />
              <br />
              NOTE: Some funding providers will ask for your previous year(s) tax returns. Because your most recent tax return shows a high-risk category, you will not be matched with those that require a low-risk industry for approval.
              <br />
              <br />
              After submitting your next tax return, click “Update Industry” below, select “yes” for having filed a tax return last year, then enter the new code selected."
    />
    <h3 class="text-xl text-sunglow-blue font-semibold">
      Use your new NAICS code on future documentation and applications:
    </h3>
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
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
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
onMounted(() => {
  const industryObject = store.getters["businessIndustry/getBusinessIndustry"];
  industryObject
    ? (industry.value = industryObject.industry)
    : (industry.value = {
        title: "",
        code: "",
      });
});
</script>
