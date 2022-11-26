<template>
  <section class="relative flex overflow-hidden px-0 mx-0">
    <section class="h-screen relative w-[60%] overflow-hidden">
      <div class="bg-[#D9E1E7] py-1 px-10">
        <span
          class="flex items-center gap-2 text-sunglow-blue text-xl cursor-pointer"
          @click="goBack"
        >
          <IconLeftArrow />
          Back
        </span>
      </div>
      <div class="px-8">
        <h2 class="text-xl text-sunglow-blue my-5">Accounts not approved</h2>
        <div class="flex items-center gap-5 flex-wrap" v-if="accounts.length">
          <BaseVendorCard
            v-for="account in accounts"
            :key="account.funding_provider.id"
            :name="account.funding_provider.title"
            :type="account.funding_provider.type"
            :image="account.funding_provider.logo"
            :to="account.funding_provider.url"
            status=""
            @onClick="
              () =>
                router.push(
                  `/funding/provider/${account.funding_provider.slug}`
                )
            "
          />
        </div>
      </div>
    </section>
    <BaseScoreSidebar
      approvedFunding="58,000"
      :listedAccounts="7"
      :scoreLoaders="scoreLoaders"
    />
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import IconLeftArrow from "../Icon/IconLeftArrow.vue";
import BaseVendorCard from "../BaseVendorCard.vue";
import BaseScoreSidebar from "../BaseScoreSidebar.vue";

const store = useStore();
const router = useRouter();

const accounts = ref([]);
const scoreLoaders = ref([
  {
    title: "Equifax",
    currentScore: "1",
    totalScore: "3",
    scorePercent: "",
    color: "#FFBE24",
  },
  {
    title: "Experian",
    currentScore: "3",
    totalScore: "3",
    scorePercent: "",
    color: "#0CAE87",
  },
  {
    title: "DnB",
    currentScore: "1",
    totalScore: "3",
    scorePercent: "",
    color: "#FFBE24",
  },
  {
    title: "Revenue",
    currentScore: "",
    totalScore: "",
    scorePercent: "11%",
    color: "#0CAE87",
  },
]);

// Hooks
onMounted(async () => {
  accounts.value = store.getters["funding/getFundingAccounts"];
  if (!accounts.value.length) {
    await store.dispatch("funding/fetchFundingAccounts");
    accounts.value = store.getters["funding/getFundingAccounts"];
  }
  accounts.value = accounts.value.filter(
    (account) => account.approved_at == null
  );
});

// Methods
const goBack = () => router.back();
</script>
