<template>
  <section class="container my-16 px-20">
    <BaseWarning
      icon="Negative"
      title="Update business address"
      message="Your primary business address must be an exact match to the IRS. You must use the exact same business address on all business documentation and applications to ensure Fundability."
    />
    <p class="my-3 text-[#196499] font-medium text-xl">
      Select an option below:
    </p>
    <div class="flex flex-col mt-5 gap-5">
      <router-link to="/fundability/foundation/ein/ein-update">
        <LeadingOption label="Update Address with the IRS" class="w-full" />
      </router-link>
      <router-link to="/fundability/foundation/business-address">
        <LeadingOption
          label="Update Address In Fundability >> Business Address"
          class="w-full"
        />
      </router-link>
    </div>
    <BaseBackNextBtns
      nextLabel="Address is Up-To-date"
      :nextDisabled="false"
      @next="save"
    />
  </section>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import LeadingOption from "../LeadingOption.vue";
import BaseBackNextBtns from "../BaseBackNextBtns.vue";

const store = useStore();
const router = useRouter();

// Methods
const save = async () => {
  const EIN = store.state.ein.EIN;
  await store.dispatch("ein/sendConfirmation", {
    type: "has_ein",
    requiredData: { value: true },
  });
  await store.dispatch("ein/sendConfirmation", {
    type: "has_confirmed_address_matches_irs",
    requiredData: { value: true },
  });
  await store.dispatch("ein/sendEINFields", [
    {
      type: "business_ein",
      value: EIN,
    },
  ]);
  await store.dispatch("aspects/fetchFoundationStatuses", ["ein"]);
  return router.push("/fundability/foundation/ein/ein-form-confirm");
};
</script>
