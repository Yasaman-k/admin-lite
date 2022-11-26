<template>
  <div
    v-for="item in aspectStatuses"
    :key="item.state"
    class="flex flex-col gap-2 pb-2 tab-connector"
    ref="tabs"
  >
    <StepButton
      :type="
        item.state === 'foreign_filing'
          ? foreignFilingUpdate
            ? foreignFilingStatus
            : getState(item.state)
          : getState(item.state)
      "
      :text="item.title"
      :to="activeNode === item.active_node ? nodeLink : item.link"
      :btnActive="activeNode === item.active_node ? true : false"
      :disabled="
        aspectTitle === 'Foundation' && item.state != 'business_address'
          ? pillarsDisabled
          : false
      "
    />
  </div>
</template>
<script setup>
import { ref, onUpdated, onBeforeMount, watch } from "vue";
import StepButton from "./StepButton.vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const route = useRoute();

const pillarsDisabled = ref(false);
const foreignFilingDisabled = ref(false);
const foreignFilingUpdate = ref(false);
const foreignFilingStatus = ref("");

//props
const props = defineProps({
  activeNode: {
    type: String,
    default: "",
  },
  nodeLink: {
    type: String,
    default: "",
  },
  aspectTitle: {
    type: String,
    default: "",
  },
  aspectStatuses: {
    type: Array,
    default: () => [],
  },
  aspectStatusesDb: {
    type: Array,
    default: () => [],
  },
});

const dbStatuses = ref(props.aspectStatusesDb);

//methods
const getState = (name) => {
  const status = dbStatuses.value.find((item) =>
    Object.prototype.hasOwnProperty.call(item, name)
  );

  const state = status ? status[name] : "";
  if (state === "POSITIVE") {
    return "Done";
  } else if (state === "NEGATIVE") {
    return "FixNow";
  } else if (state === "EMPTY") {
    return "Empty";
  } else if (state === "CAUTION") {
    return "Caution";
  }
  return "";
};

const updateEntityStatus = () => {
  dbStatuses.value = store.getters["aspects/getFoundationStatuses"];
  const status = getState("foreign_filing");
  if (status != "") {
    foreignFilingUpdate.value = true;
    foreignFilingDisabled.value = false;
    foreignFilingStatus.value = status;
  } else {
    foreignFilingUpdate.value = false;
  }
};

watch(route, async (newRoute) => {
  if (props.aspectTitle === "Foundation") {
    if (newRoute.name == "business-entity-form-confirm") {
      await store.dispatch("aspects/fetchFoundationStatuses", [
        "foreign_filing",
      ]);
      updateEntityStatus();
    } else {
      foreignFilingUpdate.value = false;
    }
  }
});

//hooks
onBeforeMount(() => {
  if (props.aspectTitle === "Foundation") {
    const status = getState("business_address");
    const entityStatus = getState("business_entity");
    if (
      (status === "Done" || status === "Caution") &&
      entityStatus === "Done"
    ) {
      pillarsDisabled.value = false;
      foreignFilingDisabled.value = false;
    } else if (status === "Done" || status === "Caution") {
      pillarsDisabled.value = false;
      foreignFilingDisabled.value = true;
    } else {
      pillarsDisabled.value = true;
      foreignFilingDisabled.value = true;
    }
  } else {
    pillarsDisabled.value = false;
    foreignFilingDisabled.value = true;
  }
});

onUpdated(() => {
  if (props.aspectTitle === "Foundation") {
    dbStatuses.value = store.getters["aspects/getFoundationStatuses"];
    const status = getState("business_address");
    if (status === "Done" || status === "Caution") {
      return (pillarsDisabled.value = false);
    }
    return (pillarsDisabled.value = true);
  } else if (props.aspectTitle === "Financials") {
    dbStatuses.value = store.getters["aspects/getFinancialsStatuses"];
    pillarsDisabled.value = false;
  } else if (props.aspectTitle === "Personal") {
    dbStatuses.value = store.getters["aspects/getPersonalStatuses"];
    pillarsDisabled.value = false;
  } else {
    return (pillarsDisabled.value = false);
  }
});
</script>