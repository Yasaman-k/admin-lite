<template>
  <section class="container my-16 px-20">
    <FormHeader
      formTitle="Bankruptcies, Liens, and Judgements"
      icon="Location"
      iconColor="text-red-500"
      linkText="Which of the following are listed on the owner’s credit report?"
      desc="Select all options that apply."
    />
    <div class="grid grid-cols-2 gap-5 mt-5">
      <div class="flex items-center gap-4">
        <input
          type="checkbox"
          class="inp-checkbox"
          id="isBankruptcy"
          v-model="isBankruptcy"
        />
        <label for="checkbox">Bankruptcies</label>
      </div>

      <div class="flex items-center gap-4">
        <input
          class="inp-checkbox"
          type="checkbox"
          id="isJudgements"
          v-model="isJudgements"
        />
        <label for="checkbox">Judgements</label>
      </div>

      <div class="flex items-center gap-4">
        <input
          class="inp-checkbox"
          type="checkbox"
          id="isLiens"
          v-model="isLiens"
        />
        <label for="checkbox">Liens</label>
      </div>

      <div class="flex items-center gap-4">
        <input
          class="inp-checkbox"
          type="checkbox"
          id="isLatePayment"
          v-model="isLatePayment"
        />
        <label for="checkbox">Late Payment</label>
      </div>
    </div>
    <BaseBackNextBtns
      :BackBtnHidden="true"
      nextLabel="Next"
      :nextDisabled="nextDisable"
      @next="onSubmit"
    />
  </section>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import BaseBackNextBtns from "../BaseBackNextBtns.vue";
import { computed, onBeforeMount } from "@vue/runtime-core";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

//data
const isBankruptcy = ref(false);
const isJudgements = ref(false);
const isLiens = ref(false);
const isLatePayment = ref(false);

//computed
const nextDisable = computed(() => {
  if (
    isJudgements.value ||
    isLiens.value ||
    isLatePayment.value ||
    isBankruptcy.value
  ) {
    return false;
  } else {
    return true;
  }
});

//methods
const onSubmit = async () => {
  let newData = [];
  if (isJudgements.value) {
    newData.push("Judgements");
  }
  if (isLiens.value) {
    newData.push("Liens");
  }
  if (isLatePayment.value) {
    newData.push("Late Payment");
  }
  if (isBankruptcy.value) {
    newData.push("Bankruptcies");
  }

  try {
    await store.dispatch("bankruptcy/sendDerogatoryRemarks", [
      {
        type: "derogatory_remarks",
        value: newData,
      },
    ]);

    await store.dispatch("aspects/fetchPersonalStatuses", [
      "derogatory_remarks",
    ]);
  } catch (error) {
    console.log(error);
  }

  return router.push("/fundability/personal/bankruptcy/registered");
};

//hooks
onBeforeMount(async () => {
  const remarks = store.getters["bankruptcy/getDerogatoryRemarks"];

  if (!remarks && remarks[0].derogatory_remarks.data.length == 0) {
    isJudgements.value = false;
    isLiens.value = false;
    isLatePayment.value = false;
    isBankruptcy.value = false;
  } else if (remarks[0].derogatory_remarks.data.length > 0) {
    remarks[0].derogatory_remarks.data.forEach((element) => {
      if (element.value.toLowerCase() == "judgements") {
        isJudgements.value = true;
      }
      if (element.value.toLowerCase() == "bankruptcies") {
        isBankruptcy.value = true;
      }
      if (element.value.toLowerCase() == "liens") {
        isLiens.value = true;
      }
      if (element.value.toLowerCase() == "late payment") {
        isLatePayment.value = true;
      }
    });
  }
});
</script>

<style scoped>
input:checked ~ .check-box {
  @apply bg-[#EDF5FB] border-[#C2D2DE] shadow-md shadow-gray-200;
}
input:checked ~ .check-box .box-icon,
input:checked ~ .check-box .box-text {
  @apply text-primary-green;
}
input:checked ~ .check-box .box-text {
  @apply font-semibold;
}

.inp-checkbox {
  width: 20px;
  height: 20px;
}
</style>

