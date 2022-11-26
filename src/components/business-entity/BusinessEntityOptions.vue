<template>
  <form @submit.prevent="save" class="mt-5">
    <div class="grid grid-cols-2 gap-5">
      <BaseRadioButton
        @select="(e) => handleVal(e)"
        radioName="entity-type"
        text="LLC"
        icon="CommercialAddress"
        value="LLC / LLP"
        :checked="entityType === 'LLC / LLP'"
      />
      <BaseRadioButton
        @select="(e) => handleVal(e)"
        radioName="entity-type"
        text="S or C Corp"
        icon="HomeAddress"
        value="Corporation (S or C)"
        :checked="entityType === 'Corporation (S or C)'"
      />
      <BaseRadioButton
        @select="(e) => handleVal(e)"
        radioName="entity-type"
        text="Partnership"
        icon="BoxAddress"
        value="Partnership"
        :checked="entityType === 'Partnership'"
      />
      <BaseRadioButton
        @select="(e) => handleVal(e)"
        radioName="entity-type"
        text="Sole Proprietor"
        icon="VirtualAddress"
        value="Sole Proprietor"
        :checked="entityType === 'Sole Proprietor'"
      />
    </div>
    <BaseBackNextBtns :BackBtnHidden="true" :nextDisabled="nextDisable" />
  </form>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { onBeforeMount } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import BaseRadioButton from "../BaseRadioButton.vue";

const store = useStore();
const router = useRouter();
// Data
const entityType = ref("");
const nextDisable = ref(true);

onBeforeMount(() => {
  const entityFields = store.getters["entity/getEntityFields"];
  if (entityFields.length) {
    const newEntityType = entityFields.filter((field) => {
      return Object.keys(field)[0] === "entity_type";
    });
    if (newEntityType.length) {
      newEntityType[0].entity_type &&
      newEntityType[0].entity_type.data &&
      newEntityType[0].entity_type.data.const
        ? (entityType.value = newEntityType[0].entity_type.data.const)
        : (entityType.value = "");
    }
  }
  if (entityType.value.length >= 1) {
    return (nextDisable.value = false);
  }
  return (nextDisable.value = true);
});

// Methods
const handleVal = (val) => {
  entityType.value = val;
  if (entityType.value.length >= 1) {
    return (nextDisable.value = false);
  }
  return (nextDisable.value = true);
};

const save = async () => {
  const val = entityType.value;
  await store.dispatch("entity/setEntityType", val);
  await store.dispatch("aspects/fetchFoundationStatuses", ["business_entity"]);
  await store.dispatch("entity/sendEntityFields", [
    {
      type: "entity_type",
      value: val,
    },
  ]);
  if (val != "Sole Proprietor") {
    return router.push(`/fundability/foundation/business-entity/registration`);
  } else {
    return router.push(
      `/fundability/foundation/business-entity/sole-proprietor`
    );
  }
};
</script>
