<template>
  <section class="container my-16 px-20">
    <FormHeader
      formTitle="LexisNexis confirmation"
      icon="CommercialAddress"
      linkText="Your LexisNexis report was last uploaded:"
      desc="Click “Upload New Report” if your information has changed since your last upload. "
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
        :href="`https://cms.fundability.com/storage/files/lexisnexis_report/${file.uri}`"
        target="_blank"
        class="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
      >
        <IconFeatherDownload />
      </a>
    </div>
    <BaseUpdateNextBtns
      updateLabel="Upload New Report"
      updateLink="/fundability/personal/lexis-nexis/upload-lexisnexis"
      nextLabel="Chex Systems"
      nextLink="/fundability/personal/chex-systems"
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
  file.value = store.getters["lexisNexis/getFileData"];

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
