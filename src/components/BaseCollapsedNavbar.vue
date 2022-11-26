<template>
  <div
    id="collapsed-left-navbar"
    class="bg-[#F8FDFF] border-r border-[#D6E4EF] w-[65px] h-full overflow-y-auto fixed lg:left-0 z-40"
  >
    <div class="px-3 py-7 pb-9">
      <router-link to="/fundability/foundation">
        <SmallLogo />
      </router-link>
    </div>
    <div class="flex flex-col gap-10 justify-center align-middle px-3">
      <router-link to="/fundability/foundation">
        <IconBusinessFundability />
      </router-link>
      <router-link
        to="/funding/funding-explorer"
        class="left-nav-item router-link-active"
      >
        <IconFunding />
      </router-link>
      <router-link to="/funding-manager">
        <IconTradeLineMonitoring />
      </router-link>
    </div>
  </div>
</template>

<script setup>
import IconFunding from "./Icon/IconFunding.vue";
import IconTradeLineMonitoring from "./Icon/IconTradeLineMonitoring.vue";
import IconBusinessFundability from "./Icon/IconBusinessFundability.vue";
import SmallLogo from "./SmallLogo.vue";
</script>

<style scoped>
.left-nav-item.router-link-active {
  @apply px-0 bg-none before:-left-3;
}
</style>
