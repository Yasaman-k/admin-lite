<template>
  <section
    class="absolute top-0 bottom-0 left-0 right-0 bg-white z-50"
    ref="loader"
  >
    <div class="lds-roller">
      <div class="loader"></div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from "@vue/runtime-core";

const loader = ref(null);
// Props
const props = defineProps({
  pageHeaderId: {
    type: String,
    default: "",
  },
});

// Hooks
onMounted(() => {
  const rightNavbar = document.getElementById("right-navbar");
  const header = props.pageHeaderId.length
    ? document.getElementById(props.pageHeaderId)
    : "";
  loader.value.style.top = `${header && header.clientHeight}px`;
  loader.value.style.right = `${rightNavbar && rightNavbar.clientWidth + 90}px`;
});
</script>

<style>
.lds-roller {
  display: inline-block;
  position: relative;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  opacity: 0.7;
}
.loader {
  border: 3px solid #f3f3f3;
  border-radius: 50%;
  border-top: 3px solid #1f6499;
  width: 40px;
  height: 40px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}
/* Safari */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
