<template>
  <section class="container my-16 px-20">
    <FormHeader
      formTitle="Chex systems confirmation"
      icon="CommercialAddress"
      linkText="Your Chex Systems report was last uploaded:"
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
        :href="`https://cms.fundability.com/storage/files/chex_report/${file.uri}`"
        target="_blank"
        class="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
      >
        <IconFeatherDownload />
      </a>
    </div>
    <BaseUpdateNextBtns
      updateLabel="Upload New Report"
      updateLink="/fundability/personal/chex-systems/upload-chex-report"
      nextLabel="Fundability"
      nextLink="/fundability/foundation"
    />
  </section>
</template>

<script setup>
import moment from "moment";
import { ref } from "@vue/reactivity";
import { onBeforeMount } from "@vue/runtime-core";
import { useStore } from "vuex";

const store = useStore();
const file = ref(null);
const fileDateUploaded = ref("");

// Hooks
onBeforeMount(() => {
  file.value = store.getters["chexSystems/getFileData"];

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
