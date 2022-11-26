<template>
  <div>
    <button
      @click.prevent="dropdownActive = !dropdownActive"
      class="flex items-center justify-between w-full gap-4 left-nav-item"
      :class="{
        'router-link-active': isCurrent && dropdownActive,
      }"
    >
      <div class="flex items-center gap-3">
        <component v-if="icon" :is="`Icon${icon}`" />
        <div class="text-base text-left uppercase">
          {{ supportingText }}
          <div class="text-lg font-semibold">{{ text }}</div>
        </div>
      </div>
      <div class="z-10 flex items-center justify-center w-7 h-7 text-main-gray">
        <IconNext
          class="w-3 h-3 transition-all ease-in-out"
          :class="{
            'rotate-90': isCurrent && dropdownActive,
          }"
        />
      </div>
    </button>
    <div
      @click.stop
      v-if="isCurrent && dropdownActive"
      class="flex flex-col gap-5 p-7 dropdown-menu bg-[#ECF5FB] bg-opacity-40 -mt-0.5"
    >
      <div v-for="(dropdown, i) in dropdowns" :key="i">
        <router-link
          :to="dropdown.to"
          class="text-base dropdown-item"
          exact-active-class=""
          :class="
            $route.fullPath.includes(dropdown.to) ? 'router-link-active' : ''
          "
        >
          {{ dropdown.text }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dropdownActive: false,
      current: false,
    };
  },
  props: {
    text: {
      type: String,
      default: "",
    },
    supportingText: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "",
    },
    dropdowns: {
      type: Array,
      default: () => [
        {
          text: "Foundation",
          to: "/address-screen",
        },
        {
          text: "Financials",
          to: "/entity",
        },
        {
          text: "Business Credit Report",
          to: "/entity",
        },
        {
          text: "Personal",
          to: "/entity",
        },
        {
          text: "Application Process",
          to: "/entity",
        },
      ],
    },
  },
  computed: {
    isCurrent() {
      let current = false;
      this.dropdowns.forEach((dropdown) => {
        if (this.$route.fullPath.includes(dropdown.to)) {
          this.current = true;
          current = true;
          this.dropdownActive = true;
        }
      });
      return current;
    },
  },
};
</script>
