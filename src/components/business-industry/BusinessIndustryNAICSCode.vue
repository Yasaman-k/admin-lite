<template>
  <section class="container my-16 px-20">
    <FormHeader
      formTitle="Business industry"
      icon="Location"
      linkText="What NAICS code was used on your last tax filing?"
      desc="Enter your business’s 6 digit NAICS code. This code may also be referred to as your Business activity code number, for example, in field B (top left corner) of your Form 1120."
    />
    <div class="mt-8 relative">
      <BaseSelect
        label="Enter your NAICS code or Business Industry Keywords"
        placeholder="Enter your NAICS code or Business Industry Keywords"
        errorMessage="NAICS code is required"
        :dropdowns="dropdowns"
        :value="item.title"
        @selected="(item) => handleSelection(item)"
      />
      <span class="text-gray-900 font-semibold text-md absolute right-6 top-4">
        {{ item.code }}
      </span>
    </div>
    <BaseBackNextBtns
      :BackBtnHidden="true"
      :nextDisabled="nextDisabled"
      @next="onSubmit"
    />
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import FormHeader from "../FormHeader.vue";
import BaseSelect from "../BaseSelect.vue";
import BaseBackNextBtns from "../BaseBackNextBtns.vue";

const store = useStore();
const router = useRouter();

// Data
const nextDisabled = ref(true);
const dropdowns = ref(store.getters["businessIndustry/getBusinessIndustries"]);
const item = ref({
  id: "",
  title: "",
  code: "",
});

// Methods
const handleSelection = (selectedItem) => {
  nextDisabled.value = false;
  item.value = selectedItem;
};

const onSubmit = async () => {
  await store.dispatch("businessIndustry/sendBusinessIndustry", item.value.id);
  await store.dispatch("aspects/fetchFoundationStatuses", [
    "business_industry",
  ]);
  if (item.value.is_risky) {
    return router.push("/fundability/foundation/business-industry/high-risk");
  }
  return router.push("/fundability/foundation/business-industry/confirmation");
};
</script>
