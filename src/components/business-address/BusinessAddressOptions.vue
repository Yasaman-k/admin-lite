<template>
  <form @submit.prevent="() => save(businessAddressType)" class="mt-5">
    <div class="grid grid-cols-2 gap-5">
      <div>
        <BaseRadioButton
          radioName="address-type"
          text="Commercial Address"
          icon="CommercialAddress"
          value="Business Address (not virtual, or home)"
          @select="(e) => handleVal(e)"
          :checked="
            businessAddressType === 'Business Address (not virtual, or home)'
              ? true
              : false
          "
        />
      </div>
      <div>
        <BaseRadioButton
          radioName="address-type"
          text="Home Address"
          icon="HomeAddress"
          value="Home"
          @select="(e) => handleVal(e)"
          :checked="businessAddressType === 'Home' ? true : false"
        />
      </div>
      <div>
        <BaseRadioButton
          radioName="address-type"
          text="PO Box"
          icon="BoxAddress"
          value="PO Box"
          @select="(e) => handleVal(e)"
          :checked="businessAddressType === 'PO Box' ? true : false"
        />
      </div>
      <div>
        <BaseRadioButton
          radioName="address-type"
          text="Virtual Address"
          icon="VirtualAddress"
          value="Virtual Address"
          @select="(e) => handleVal(e)"
          :checked="businessAddressType === 'Virtual Address' ? true : false"
        />
      </div>
    </div>
    <BaseBackNextBtns :BackBtnHidden="true" :nextDisabled="nextDisable" />
  </form>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { onMounted, onUpdated } from "@vue/runtime-core";
import BaseRadioButton from "../BaseRadioButton.vue";
import BaseBackNextBtns from "../BaseBackNextBtns.vue";

const store = useStore();
const router = useRouter();
const emit = defineEmits(["submit"]);

//data
const resValue = ref("");
const currentDirection = ref("");
const businessAddressType = ref("");
const nextDisable = ref(true);

//methods
const handleVal = (val) => {
  resValue.value = val;
  businessAddressType.value = val;
  if (val === "Virtual Address") {
    return (currentDirection.value = `/fundability/foundation/business-address/virtual/vendor`);
  } else if (val === "Business Address (not virtual, or home)") {
    return (currentDirection.value = `/fundability/foundation/business-address/commercial`);
  } else if (val === "Home") {
    return (currentDirection.value = `/fundability/foundation/business-address/home`);
  }
  return (currentDirection.value = `/fundability/foundation/business-address/po-box`);
};

const save = async (addressType) => {
  if (addressType === "PO Box") {
    await store.dispatch("businessAddress/sendBusinessAddressFields", [
      {
        type: "business_address_type",
        value: "PO Box",
      },
    ]);
    await store.dispatch("aspects/fetchFoundationStatuses", [
      "business_address",
    ]);
    await store.dispatch("aspects/fetchFinancialsStatuses", ["bank_account"]);
  }
  return router.push(currentDirection.value);
};

const onSubmit = () => {
  emit("submit");
};

//Hooks
onMounted(() => {
  const fields = store.getters["businessAddress/getBusinessAddressFields"];

  if (fields.length) {
    const business_address = fields.find((field) => {
      return Object.keys(field)[0] === "business_address_type";
    });

    if (business_address.length) {
      business_address.business_address_type &&
      business_address.business_address_type.data &&
      business_address.business_address_type.data.const
        ? (businessAddressType.value =
            business_address.business_address_type.data.const)
        : (businessAddressType.value = "");
    }
  }

  resValue.value = businessAddressType;
  if (resValue.value === "Virtual Address") {
    return (currentDirection.value = `/fundability/foundation/business-address/virtual/vendor`);
  } else if (resValue.value === "Business Address (not virtual, or home)") {
    return (currentDirection.value = `/fundability/foundation/business-address/commercial`);
  } else if (resValue.value === "Home") {
    return (currentDirection.value = `/fundability/foundation/business-address/home`);
  } else if (resValue.value === "PO Box") {
    return (currentDirection.value = `/fundability/foundation/business-address/po-box`);
  }
});

onUpdated(() => {
  if (resValue.value.length >= 1) {
    nextDisable.value = false;
  } else {
    nextDisable.value = true;
  }
});
</script>
