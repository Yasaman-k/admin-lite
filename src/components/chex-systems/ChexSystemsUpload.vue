<template>
  <section class="container my-16 px-20">
    <FormHeader
      linkText="Upload your Chex Systems report"
      desc="To ensure your best match for business credit and lending recommendations, upload your Chex Systems report below."
    />
    <p class="mt-10 text-base font-semibold">Upload Chex Systems report</p>
    <BaseDropZone
      class="bg-[#fafdff] w-3/4 h-[265px] mt-5 rounded-sm custom-border custom-drop-shadow"
      @files-dropped="addFiles"
    >
      <label
        for="drop-zone"
        class="flex flex-col justify-center items-center cursor-pointer p-10"
      >
        <IconUploadImage />
        <span class="text-center mt-8 cursor-pointer">
          Drop your file here. <br />
          or
          <label for="drop-zone" class="text-[#196499] cursor-pointer">
            Browse
          </label>
          <input
            type="file"
            id="drop-zone"
            class="hidden"
            @change="onInputChange"
          />
        </span>
      </label>
    </BaseDropZone>
    <div class="relative flex items-center gap-4 mt-5">
      <BaseInput
        @input="deleteFiles"
        :value="
          files.length > 0 && files[0].original_name
            ? files[0].original_name
            : files.length > 0 && files[0].name
            ? files[0].name
            : ''
        "
        label="Browse and Upload From Computer"
        placeholder="File Name"
        errorMessage=""
        class="h-full w-2/3 mt-4"
      />
      <div class="relative">
        <button
          @click.prevent="uploadFile()"
          class="btn-upload mt-4"
          :disabled="uploadDisable"
        >
          Upload
        </button>
        <span
          ref="uploaded"
          class="hidden absolute right-5 -top-9 p-2 bg-[#19649999] text-white rounded-md after:content-[''] after:w-2 after:border-8 after:border-l-transparent after:border-r-transparent after:border-b-transparent after:border-[#19649999] after:absolute after:right-4 after:top-10 after:hidden"
        >
          Uploaded!
        </span>
      </div>
    </div>
    <BaseBackNextBtns :nextDisabled="nextDisable" @next="next" />
  </section>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import FormHeader from "../FormHeader.vue";
import BaseDropZone from "../BaseDropZone.vue";
import IconUploadImage from "../Icon/IconUploadImage.vue";
import { onBeforeMount } from "@vue/runtime-core";

const store = useStore();
const router = useRouter();
// Refs
const uploaded = ref(null);
// Data
const files = ref([]);
const nextDisable = ref(true);
const uploadDisable = ref(true);

// Hooks
onBeforeMount(async () => {
  await store.dispatch("chexSystems/fetchChexFile");
  const fileData = store.getters["chexSystems/getFileData"];
  fileData && files.value.push(fileData);
  if (files.value.length) {
    return (nextDisable.value = false);
  }
  return (nextDisable.value = true);
});

// Methods
const onInputChange = (e) => {
  uploadDisable.value = false;
  return (files.value = e.target.files);
};

const addFiles = (uploadedFiles) => {
  uploadDisable.value = false;
  return (files.value = uploadedFiles);
};

const deleteFiles = () => (files.value = []);

const uploadFile = async () => {
  if (files.value[0]) {
    const formData = new FormData();
    formData.append(
      "file",
      files.value[0],
      files.value[0].name ? files.value[0].name : files.value[0].original_name
    );
    await store.dispatch("chexSystems/sendChexFile", formData);
    const fileData = store.getters["chexSystems/getFileData"];
    files.value = [];
    files.value.push(fileData);

    // Handle Alert
    uploaded.value && uploaded.value.classList.remove("hidden");
    uploaded.value && uploaded.value.classList.remove("after:hidden");
    setTimeout(() => {
      uploaded.value && uploaded.value.classList.add("hidden");
      uploaded.value && uploaded.value.classList.add("after:hidden");
    }, 800);

    if (files.value.length) {
      return (nextDisable.value = false);
    }
    nextDisable.value = true;
  }
};

const next = async () => {
  await store.dispatch("chexSystems/sendChexConfirmation", { value: true });
  await store.dispatch("aspects/fetchPersonalStatuses", ["chex_report"]);
  return router.push("/fundability/personal/chex-systems/complete");
};
</script>

<style scoped>
.custom-border {
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='13' ry='13' stroke='%23196499FF' stroke-width='4' stroke-dasharray='10' stroke-dashoffset='68' stroke-linecap='butt'/%3e%3c/svg%3e");
  border-radius: 13px;
}

.custom-drop-shadow {
  filter: drop-shadow(0 3px 10px #00000020);
}

.btn-upload {
  @apply bg-[#196499] hover:bg-[#196499] rounded-md relative overflow-hidden
  disabled:bg-[#4c7897] disabled:bg-opacity-25 text-white text-lg font-medium py-[15px] px-11;
}
</style>
