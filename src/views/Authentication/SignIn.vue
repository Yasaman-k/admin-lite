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
    <!-- Start Form -->
    <form
      class="lg:px-[128px] px-5 flex flex-col justify-center relative"
      @submit.prevent="nextStep"
    >
      <button
        v-if="step === 2"
        @click="prevStep"
        type="button"
        class="lg:absolute lg:top-10 lg:left-[44px] text-[#1A497C60] flex items-center gap-2.5 mb-10"
      >
        <IconNext class="rotate-180" />
        <span class="font-medium">go back</span>
      </button>
      <router-link
        :to="{ name: 'signin' }"
        class="mb-10 lg:mb-[162px] w-full flex justify-center hidden lg:block"
      >
        <img src="/images/logo.png" alt="logo" />
      </router-link>
      <div v-if="step == 1 && emailError">
        <h3 class="text-error text-[20px] font-semibold">
          Entered email does not match our record
        </h3>
        <p class="mb-4 text-base font-light text-error">
          Please check entered email
        </p>
      </div>
      <div v-if="step == 2 && passwordError">
        <p class="mb-4 text-base font-light text-error">
          Incorrect email and password. Please try again.
        </p>
      </div>
      <div class="flex gap-2 flex-wrap mb-5">
        <h3 class="w-full text-lg font-semibold capitalize text-gray-500">
          Sign In
        </h3>
        <div class="relative flex-1">
          <input
            v-if="step == 1"
            ref="email"
            type="email"
            placeholder="Email in use"
            class="base-input flex-1 w-full lg:w-[344px]"
            :class="{
              'text-error': emailError,
            }"
            v-model="signin.email"
          />
          <input
            ref="password"
            type="password"
            placeholder="Password"
            class="base-input flex-1 w-full lg:w-[344px]"
            v-model="signin.password"
            v-if="step == 2"
          />
          <button
            type="button"
            class="absolute top-0 right-0 pr-4 bg-white"
            @click="togglePassword"
            v-if="step == 2"
          >
            <IconEye v-if="!showPassword" class="w-6 h-6" />
            <IconEyeOff v-if="showPassword" class="w-6 h-6" />
          </button>
        </div>
        <button
          type="submit"
          class="flex items-center justify-center w-8 h-8 rounded-full text-sunglow bg-sunglow-blue"
        >
          <IconNext />
        </button>
      </div>
      <div
        v-if="step == 1 && emailError"
        class="lg:w-[376px] text-sunglow-blue"
      >
        Sometimes login email can be either personal Or company email address
      </div>
      <div
        v-if="step == 2 && passwordError"
        class="lg:w-[376px] text-sunglow-blue mb-2"
      >
        Click on forget password to reset password
      </div>
      <router-link
        v-if="!emailError"
        :to="{ name: 'forgot-password' }"
        class="text-base font-semibold text-light-blue"
        >* forgot email or password</router-link
      >
    </form>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { Carousel, Pagination, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

export default defineComponent({
  name: "SignIn",
  components: {
    Carousel,
    Slide,
    Pagination,
  },
  data() {
    return {
      step: 1,
      signin: {
        email: "",
        password: "",
      },
      showPassword: false,
      emailError: false,
      passwordError: false,
    };
  },
  methods: {
    async nextStep() {
      if (this.step == 1) {
        this.step = 2;
        return await this.$store.dispatch("auth/setEmail", this.signin.email);
      }
      this.$store.dispatch("auth/setPass", this.signin.password);
      await this.$store.dispatch("auth/logIn");
      this.passwordError = this.$store.state.auth.authErrorMessage.length
        ? true
        : false;
      if (!this.passwordError) {
        this.$router.push("/");
      }
    },
    prevStep() {
      if (this.step == 2) {
        this.step = 1;
        this.passwordError = false;
      }
    },
    togglePassword() {
      this.showPassword = !this.showPassword;
      this.$refs.password.type = this.showPassword ? "text" : "password";
    },
  },
  updated() {
    this.$refs.password && this.$refs.password.focus();
    this.$refs.email && this.$refs.email.focus();
  },
});
</script>

<style>
.carousel__viewport {
  @apply !mx-0 pr-0;
}
</style>
