<template>
  <section class="container mt-4">
    <BaseWarning
      icon="Negative"
      title="Sole Proprietor negatively impacts fundability"
      message="Sole Proprietors are less likely to be funded due to greater financial risk. An LLC can protect your personal assets and ensure greater success with lenders."
    />
    <p class="text-xl font-semibold text-[#196499] mt-4">
      Here’s how to fix it:
    </p>
    <div class="flex flex-col mt-5 gap-5">
      <LeadingOption
        label="Form An LLC"
        class="w-full"
        value="LLC / LLP"
        @click="(e) => save(e.target)"
      />

      <LeadingOption
        label="Form An S Or C Corp"
        class="w-full"
        value="Corporation (S or C)"
        @click="(e) => save(e.target)"
      />

      <LeadingOption
        label="Form A Partnership"
        class="w-full"
        value="Partnership"
        @click="(e) => save(e.target)"
      />
    </div>
    <BaseBackNextBtns :nextBtnHidden="true" />
  </section>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import BaseWarning from "../BaseWarning.vue";
import LeadingOption from "../LeadingOption.vue";
import BaseBackNextBtns from "../BaseBackNextBtns.vue";

const router = useRouter();
const store = useStore();

// Methods
const save = async (el) => {
  const val = el.value || el.parentElement.value;
  await store.dispatch("entity/setEntityType", val);
  if (val === "LLC / LLP") {
    return router.push(`/fundability/foundation/business-entity/llc/resources`);
  } else if (val === "Corporation (S or C)") {
    return router.push(
      `/fundability/foundation/business-entity/s-or-c/resources`
    );
  } else if (val === "Partnership") {
    return router.push(
      `/fundability/foundation/business-entity/partnership/resources`
    );
  }
};
</script>
