<template>
  <section class="container my-16 px-20">
    <FormHeader
      formTitle="Credit report confirmation"
      icon="CommercialAddress"
      linkText="Your <a href='https://www.myscoreiq.com/' target='_blank' class='underline'> MyScoreIQ.com </a> Personal Credit report was last uploaded: "
      desc="Click “Update New Report” to make changes."
    />
    <div class="relative mt-7 custom-drop-shadow">
      <input
        type="text"
        :disabled="true"
        :value="fileDateUploaded"
        class="p-4 pt-7 text-gray-900 w-full font-semibold rounded-[4px] text-md disabled:bg-white"
      />
      <label
        class="absolute top-2 left-4 flex items-center text-[12px] font-semibold"
      >
        Date Uploaded
      </label>
      <a
        ref="download_btn"
        :href="`https://cms.fundability.com/storage/files/credit_report/${file.uri}`"
        target="_blank"
        class="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
      >
        <IconFeatherDownload />
      </a>
    </div>
    <BaseUpdateNextBtns
      updateLabel="Upload New Report"
      updateLink="/fundability/personal/credit-report/upload-my-score-iq"
      nextLabel="Lexis Nexis"
      nextLink="/fundability/personal/lexis-nexis"
    />
  </section>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { onBeforeMount } from "@vue/runtime-core";
import { useStore } from "vuex";
import moment from "moment";
import BaseUpdateNextBtns from "../BaseUpdateNextBtns.vue";

const store = useStore();
const file = ref(null);
const fileDateUploaded = ref("");
const download_btn = ref(null);

// Hooks
onBeforeMount(() => {
  file.value = store.getters["creditReport/getFileData"];

  if (file) {
    fileDateUploaded.value = moment(file.value.created_at).format("MMM Do, Y");
  }
});
</script>

<style scoped>
.custom-drop-shadow {
  filter: drop-shadow(0 0 15px #00000015);
}
</style>
