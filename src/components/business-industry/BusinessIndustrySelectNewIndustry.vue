<template>
  <section class="container my-16 px-20">
    <FormHeader
      formTitle="Business industry"
      icon="Location"
      linkText="Select a non-high-risk or nonrestricted NAICS code."
      desc="Search by typing your industry keywords to see if your business may qualify as another industry, one that is not flagged as high-risk. If not, click “Use Existing.”"
    />
    <div class="mt-8 relative">
      <BaseSelect
        label="Select an Industry Type"
        placeholder="Select an Industry Type"
        errorMessage="Industry is required"
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

  return router.push("/fundability/foundation/business-industry/risky");
};
</script>
