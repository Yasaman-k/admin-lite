<template>
  <section class="container my-16 px-20">
    <FormHeader
      :formTitle="primaryTitle"
      :icon="primaryTitleIcon"
      :linkText="title"
      :desc="content"
    />
    <BaseOptions
      name="ein"
      :value="hasEINAccount"
      @handleValue="(val) => handleVal(val)"
      @submit="onSubmit"
    />
  </section>
</template>

<script setup>
import { onMounted, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import FormHeader from "../FormHeader.vue";
import BaseOptions from "../BaseOptions.vue";

const store = useStore();
const router = useRouter();
const hasEINAccount = ref("");

//data
const primaryTitle = ref("EIN");
const primaryTitleIcon = ref("Trade");
const title = ref("Does your business have an EIN?");
const content = ref(
  "An EIN (Employer Identification Number) is a nine-digit number assigned to business entities operating in the U.S.  An EIN (or Tax ID) is required to obtain Business financing."
);

// Hooks
onMounted(() => {
  const page = store.getters["aspectScreen/getPageContent"];
  const einMainData = page.find((item) =>
    Object.prototype.hasOwnProperty.call(item, "foundation/ein")
  );

  if (page.length && einMainData) {
    let einData = einMainData["foundation/ein"];
    primaryTitle.value = einData.primary_title
      ? einData.primary_title
      : primaryTitle.value;
    primaryTitleIcon.value = einData.primary_title_icon
      ? einData.primary_title_icon
      : primaryTitleIcon.value;
    title.value = einData.title ? einData.title : title.value;
    content.value = einData.content ? einData.content : content.value;
  }

  const confirmations = store.getters["ein/getConfirmations"];
  let EINConfirmation =
    confirmations.length &&
    confirmations.filter((field) => {
      return Object.keys(field)[0] === "has_ein";
    })[0].has_ein;
  EINConfirmation &&
    (EINConfirmation.value === false || EINConfirmation.value === true) &&
    (hasEINAccount.value = EINConfirmation.value ? "Yes" : "No");
});

// Methods
const handleVal = (val) => (hasEINAccount.value = val);

const onSubmit = async () => {
  if (hasEINAccount.value === "No") {
    await store.dispatch("ein/sendConfirmation", {
      type: "has_ein",
      requiredData: { value: false },
    });

    await store.dispatch("aspects/fetchFoundationStatuses", ["ein"]);
    return router.push("/fundability/foundation/ein/resources");
  }
  await store.dispatch("ein/setEINConfirmation", "Yes");
  return router.push("/fundability/foundation/ein/ein-form");
};
</script>
