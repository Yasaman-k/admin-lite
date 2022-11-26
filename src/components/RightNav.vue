<template>
  <div class="w-[261px] hidden lg:block h-screen px-3 py-8">
    <div class="flex gap-3 side-header">
      <div
        class="z-10 flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-lg"
      >
        <IconMap />
      </div>
      <div
        class="relative mt-1.5 flex-1 before:w-[1px] before:absolute before:bottom-10 before:left-[-32px] before:bg-[#D0DBE3] before:z-0"
      >
        <h3 class="text-sunglow-blue font-bold text-xl mb-4">Foundation</h3>
        <div class="flex flex-col gap-2">
          <RightNavItem text="Business Address" to="/address-screen" />
          <RightNavItem text="Business Entity" />
          <RightNavItem text="Foreign Filing" />
          <RightNavItem text="Address Verify" />
          <RightNavItem text="Ownership" />
          <RightNavItem text="EIN" />
          <RightNavItem text="Business Phone" />
          <!-- <RightNavItem text="411" /> -->
          <RightNavItem text="Website and Email" />
          <RightNavItem text="Bank Account" />
          <RightNavItem text="Merchant Account" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import RightNavItem from "./RightNavItem.vue";
import IconMap from "./Icon/IconMap.vue";
</script>

<style></style>
