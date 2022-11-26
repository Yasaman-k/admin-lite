<template>
  <section class="container my-16 px-20">
    <BaseWarning
      icon="Negative"
      title="Business address updated"
      message="Your primary business address was changed. Click the link below to reverify the address displayed is an exact match to the one listed with the S.O.S."
    />
    <div
      class="w-9/12 3xl:w-6/12 mx-auto border-[1px] border-[#DDDDDD] flex justify-between py-2 px-4 mt-12 mb-7"
    >
      <div class="flex flex-col align-middle gap-2">
        <span class="text-[#196499] text-xs font-semibold">Business Name</span>
        <p
          class="text-[#495A67] font-semibold h-full flex items-center"
          v-text="entityFields.company.data"
        ></p>
      </div>
      <div class="flex flex-col align-middle gap-2">
        <span class="text-[#196499] text-xs font-semibold"
          >Business Address</span
        >
        <p
          class="text-[#495A67] font-semibold h-full flex items-center"
          v-text="entityFields.business_address_street.data + ','"
        ></p>
        <p
          class="text-[#495A67] font-semibold"
          v-if="entityFields.business_address_line2.data"
          v-text="entityFields.business_address_line2.data + ','"
        ></p>
        <p class="text-[#495A67] font-semibold">
          {{ entityFields.business_address_city.data }}, &nbsp; &nbsp;
          {{ entityFields.business_address_state.data }}, &nbsp; &nbsp;
          {{ entityFields.business_address_zip.data }}
        </p>
      </div>
    </div>
    <router-link
      to="/fundability/foundation/entity/entity-check"
      class="font-semibold text-[#196499]"
    >
      Click here to verify with the Secretary of State of
      {{ entityFields.business_address_state.data }}
    </router-link>
    <EntityMatchForm />
  </section>
</template>

<script setup>
import { onBeforeMount, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
import BaseWarning from "../BaseWarning.vue";
import EntityMatchForm from "./EntityMatchForm.vue";

const store = useStore();
const entityFields = ref({
  company: {
    data: "",
  },
  business_address_street: {
    data: "",
  },
  business_address_line2: {
    data: "",
  },
  business_address_city: {
    data: "",
  },
  business_address_state: {
    data: "",
  },
  business_address_zip: {
    data: "",
  },
});

onBeforeMount(async () => {
  const fields = store.getters["entity/getMatchFields"];
  if (!fields.length) {
    await store.dispatch("entity/fetchEntityFields");
  }
  fields.length &&
    fields.map((field) => {
      return (entityFields.value[Object.keys(field)[0]] =
        Object.values(field)[0]);
    });
});
</script>
