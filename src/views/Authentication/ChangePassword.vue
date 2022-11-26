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
        Reset Password
      </h3>
      <p class="mb-4 text-base font-light text-sunglow-blue">
        Please choose a new password
      </p>
      <div class="flex gap-2 mb-5 lg:w-[344px]">
        <div class="relative flex-1">
          <input
            ref="password"
            type="password"
            placeholder="Password"
            class="flex-1 w-full base-input"
            v-model="password"
          />
          <button
            class="absolute top-0 right-0 pr-4 bg-white"
            @click="togglePassword"
          >
            <IconEye v-if="!showPassword" class="w-6 h-6" />
            <IconEyeOff v-if="showPassword" class="w-6 h-6" />
          </button>
        </div>
      </div>
      <div class="flex gap-2 mb-5">
        <div class="relative flex-1">
          <input
            ref="newPassword"
            type="password"
            placeholder="Confirm new password"
            class="base-input flex-1 w-full lg:w-[344px]"
            v-model="newPassword"
          />
          <button
            class="absolute top-0 right-0 pr-4 bg-white"
            @click="toggleNewPassword"
          >
            <IconEye v-if="!showPassword" class="w-6 h-6" />
            <IconEyeOff v-if="showPassword" class="w-6 h-6" />
          </button>
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
  name: "ChangePassword",
  components: {
    Carousel,
    Slide,
    Pagination,
  },
  data() {
    return {
      password: "",
      newPassword: "",
      showPassword: false,
      showNewPassword: false,
    };
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
      this.$refs.password.type = this.showPassword ? "text" : "password";
    },
    toggleNewPassword() {
      this.showNewPassword = !this.showNewPassword;
      this.$refs.newPassword.type = this.showNewPassword ? "text" : "password";
    },
  },
});
</script>

<style>
.carousel__viewport {
  @apply !mx-0 pr-0;
}
</style>
