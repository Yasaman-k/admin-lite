<template>
  <div
    class="flex flex-col gap-10 lg:flex-row lg:gap-0 lg:h-screen lg:w-screen"
  >
    <div
      class="bg-sunglow-blue lg:w-1/2 flex items-center flex-col justify-end 2xl:justify-center px-5 py-10 lg:px-[105px] lg:pb-[75px]"
    >
      <Carousel :autoplay="2000" :wrap-around="true">
        <Slide :key="1">
          <h3 class="carousel-title">
            To improve fundability, sign <br />
            in to Credit Suite
          </h3>
        </Slide>
        <Slide :key="2">
          <h3 class="carousel-title">
            To increase credit,<br />
            sign in to Credit Suite
          </h3>
        </Slide>

        <template #addons>
          <Pagination class="lg:mt-[160px] lg:mb-[100px] mt-4 mb-6" />
        </template>
      </Carousel>
      <router-link :to="{ name: 'signin' }">
        <img src="/images/logo-white.png" alt="logo" />
      </router-link>
    </div>
    <div class="lg:px-[128px] px-5 flex flex-col justify-center relative">
      <router-link
        :to="{ name: 'signin' }"
        class="mb-10 lg:mb-[162px] w-full flex justify-center hidden lg:block"
      >
        <img src="/images/logo.png" alt="logo" />
      </router-link>
      <h3 class="text-sunglow-blue text-[20px] font-semibold">
        Forgot Password
      </h3>
      <p class="mb-4 text-base font-light text-sunglow-blue">
        Send a link to your email to reset password
      </p>
      <div class="flex gap-2 mb-5">
        <div class="relative flex-1">
          <input
            type="text"
            placeholder="Email in use"
            class="base-input flex-1 w-full lg:w-[344px]"
            v-model="email"
          />
        </div>
        <button
          type="button"
          class="flex items-center justify-center w-8 h-8 rounded-full text-sunglow bg-sunglow-blue"
        >
          <IconNext />
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { Carousel, Pagination, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
export default defineComponent({
  name: "ForgotPassword",
  components: {
    Carousel,
    Slide,
    Pagination,
  },
  data() {
    return {
      email: "",
    };
  },
});
</script>

<style>
.carousel__viewport {
  @apply !mx-0 pr-0;
}
</style>
