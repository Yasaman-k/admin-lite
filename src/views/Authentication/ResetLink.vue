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
            To improve fundability, <br />
            sign in to Credit Suite
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
        class="lg:absolute lg:top-10 lg:left-[44px] text-[#1A497C60] flex items-center gap-2.5 mb-10"
      >
        <IconNext class="rotate-180" />
        <span class="font-medium">go back</span>
      </router-link>
      <router-link
        :to="{ name: 'signin' }"
        class="mb-10 lg:mb-[162px] w-full flex justify-center hidden lg:block"
      >
        <img src="/images/logo.png" alt="logo" />
      </router-link>
      <h3 class="text-sunglow-blue text-[20px] font-semibold">
        Password Reset Link Sent!
      </h3>
      <p class="mb-4 text-base font-light text-sunglow-blue">
        Check your email for the reset password link.
      </p>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { Carousel, Pagination, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
export default defineComponent({
  name: "ChangePassword",
  components: {
    Carousel,
    Slide,
    Pagination,
  },
});
</script>

<style>
.carousel__viewport {
  @apply !mx-0 pr-0;
}
</style>
