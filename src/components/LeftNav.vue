<template>
  <div
    id="left-navbar"
    class="bg-[#F8FDFF] border-r border-[#D6E4EF] w-[294px] h-full overflow-y-auto fixed left-[-294px] lg:left-0 z-40"
  >
    <div class="px-6 py-7 pb-9">
      <router-link to="/fundability/foundation">
        <MainLogo />
      </router-link>
    </div>
    <div class="flex flex-col gap-6">
      <BaseMenuItem
        text="Fundability™"
        supportingText="Business"
        icon="BusinessFundability"
        @click="$router.push('/fundability/foundation')"
        :dropdowns="[
          { text: 'Foundation', to: '/fundability/foundation' },
          { text: 'Financials', to: '/fundability/financials' },
          {
            text: 'Business Credit Report',
            to: '/fundability/business-credit-report',
          },
          { text: 'Personal', to: '/fundability/personal' },
          {
            text: 'Application Process',
            to: '/fundability/application-process',
          },
        ]"
      />
      <BaseMenuItem
        text="Funding"
        supportingText="Business"
        icon="Funding"
        @click="$router.push('/funding/funding-explorer')"
        :dropdowns="[
          { text: 'Funding Explorer', to: '/funding/funding-explorer' },
          {
            text: 'Business Credit Financing',
            to: '/funding/credit-financing',
          },
          { text: 'Cash Flow Financing', to: '/funding/flow-financing' },
          { text: 'Collateral Financing', to: '/funding/collateral-financing' },
          { text: 'Personal', to: '/funding/personal' },
          { text: 'Application Process', to: '/funding/application-process' },
        ]"
      />
      <BaseMenuItem
        text="Funding"
        supportingText="Manager"
        icon="TradeLineMonitoring"
        @click="$router.push('/funding-manager')"
        :dropdowns="[
          {
            text: 'Funding Dashboard',
            to: '/funding-manager',
          },
          {
            text: 'Add Existing Accounts',
            to: '/funding-manager/add-existing-account',
          },
          {
            text: 'Accounts Not Approved',
            to: '/funding-manager/accounts-not-approved',
          },
        ]"
      />
    </div>
    <div
      class="absolute bottom-0 left-0 right-0 bg-[#f8fdff] border-t border-[#E1E9EF] p-5 mx-3"
    >
      <router-link
        to="/marketplace"
        class="text-[#196499] flex gap-2 items-center justify-center"
      >
        <IconResourceMarket />
        Resource Market
      </router-link>
    </div>
  </div>
</template>
<script setup>
import BaseMenuItem from "./BaseMenuItem.vue";
import IconResourceMarket from "./Icon/IconResourceMarket.vue";
</script>
