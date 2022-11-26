<template>
  <section
    class="bg-[#E4EEF3] !pr-0 flex justify-between min-h-full overflow-hidden"
  >
    <div class="relative bg-[#F5F9FC] border-[#E1E9EF]-300 w-[2%]">
      <div
        class="border-b border-white"
        style="padding-bottom: 13px"
        @click="goBack"
      >
        <component
          :is="`IconArrowLeft`"
          class="w-4 h-4"
          style="margin-top: 7.5px"
        />
      </div>
    </div>
    <div
      class="relative pr-16 bg-gradient-to-r from-[#E4EEF3] to-[#F5F9FC] w-[40%]"
    >
      <div class="flex flex-col gap-6 pb-5">
        <div
          class="border-b border-white pb-2 w-[120%]"
          style="margin-top: 5px"
        >
          <span class="text-[#196499] font-medium text-[12px] pl-4"
            >Business Funding</span
          >
          |
          <span class="text-[#0A0F14] font-medium text-[12px]"
            >Trade Vendor Credit</span
          >
        </div>
        <div style="margin-top: -10px">
          <span class="text-[#196499] font-semibold text-[18px] pl-4"
            >Trade Vendor Credit</span
          >
        </div>
        <div
          v-for="trade in tradeVendorTiers"
          :key="trade.id"
          :class="`relative ${!trade.checked && 'mt-2'}`"
        >
          <BaseFundingTierOption
            radioName="funding-tiers"
            :title="trade.title"
            :desc="trade.description"
            :checked="trade.checked"
            bgColor="bg-gradient-to-r from-[#E4EEF3] to-[#F5F9FC]"
            :to="`${currentCategory.slug}/${trade.slug}`"
          />
        </div>
      </div>
    </div>
    <div
      class="bg-white p-6 pl-10 pr-12 flex gap-5 before:z-10 before:!left-[7rem] w-[58%]"
    >
      <div class="relative flex flex-col gap-2 pb-2 mt-5">
        <h1
          class="text-[#196499] text-[23px] font-semibold flex gap-4 items-center"
        >
          <component
            :is="`Icon${
              currentSubCategory && currentSubCategory.icon
                ? currentSubCategory.icon
                : ''
            }`"
            class="w-8 h-8"
          />
          {{
            currentSubCategory && currentSubCategory.title
              ? currentSubCategory.title
              : ""
          }}
        </h1>
        <p class="mt-4 leading-7 max-h-[250px] overflow-y-auto">
          {{
            currentSubCategory && currentSubCategory.description
              ? currentSubCategory.description
              : ""
          }}
        </p>
        <SubCategoryDetailsOptions />
        <div class="mt-2">
          <ul
            class="nav nav-tabs nav-justified flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4"
            id="tabs-tabJustify"
            role="tablist"
          >
            <li
              class="nav-item flex-grow text-center cursor-pointer"
              role="presentation"
              @click="tabSwitch"
            >
              <span
                :class="`nav-link w-full block ${
                  tabMatch ? selectedStyle : rgTabStyle
                } rounded-tl-md px-6 py-3 my-2`"
                >Match Factors</span
              >
            </li>
            <li
              class="nav-item flex-grow text-center cursor-pointer"
              role="presentation"
              @click="tabSwitch"
            >
              <span
                :class="`nav-link w-full block ${
                  tabStrngth ? selectedStyle : rgTabStyle
                } rounded-tr-md px-6 py-3 my-2 `"
                >Strengthening Factors</span
              >
            </li>
          </ul>
          <div v-if="tabMatch">
            <span
              >Seasoned business credit accounts (high credit limit, positive
              payment history) <br /><br />
              <b class="text-[#196499]">Details:</b> Each account has varying
              application processes, please use funding explorer to match with
              accounts and apply correctly. Must be fundability or business
              credit building customer in order to access most up to date trade
              vendor accounts.
            </span>
          </div>
          <div v-else>
            <div class="flex pl-4">
              <component
                :is="`IconFoundation`"
                class="w-[24px] h-[24px] text-[#196499]"
              />
              <span class="pl-4 text-[18px] text-[#196499] font-semibold"
                >Foundation</span
              >
            </div>
            <div class="flex pl-4 pt-4">
              <div class="flex flex-col gap-2 pr-10">
                <div class="flex">
                  <component :is="`IconDone`" class="w-[16px] h-[16px] mt-1" />
                  <span class="pl-1 text-[#495A67] text-[14px]"
                    >Business address</span
                  >
                </div>
              </div>
              <div class="flex flex-col gap-2">
                <div class="flex">
                  <component :is="`IconDone`" class="w-[16px] h-[16px] mt-1" />
                  <span class="pl-1 text-[#495A67] text-[14px]"
                    >Business Entity</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <router-link
          :to="`/funding/funding-explorer/${
            currentCategory ? currentCategory.slug : ''
          }/${currentSubCategory ? currentSubCategory.slug : ''}/vendor-list`"
          class="btn-primary !bg-[#0CAE87] w-3/4 text-left mt-16 drop-shadow-lg shadow-[#000000] !text-base border border-[#0CAE87] flex justify-between items-center"
        >
          View Tier 1 Vendors
          <IconRightArrow />
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onBeforeMount, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import SubCategoryDetailsOptions from "./SubCategoryDetailsOptions.vue";
import BaseFundingTierOption from "../BaseFundingTierOption.vue";
import IconRightArrow from "../Icon/IconRightArrow.vue";

const route = useRoute();
const router = useRouter();
const store = useStore();
const currentCategory = ref({});
const currentSubCategory = ref({
  id: 1,
  title: "Trade Vendors Tier 1",
  icon: "Trade",
  slug: "trade-vendors-tier-1",
  description: "",
});

const tradeVendorTiers = ref([
  {
    id: 1,
    title: "Trade Vendors Tier 1",
    slug: "trade-vendors-tier-1",
    checked: true,
    description: "More accessible, but usually requires daily payments",
  },
  {
    id: 2,
    title: "Trade Vendors Tier 2",
    slug: "trade-vendors-tier-2",
    checked: false,
    description: "More accessible, but usually requires daily payments",
  },
  {
    id: 3,
    title: "Trade Vendors Tier 3",
    slug: "trade-vendors-tier-3",
    checked: false,
    description: "More accessible, but usually requires daily payments",
  },
  {
    id: 4,
    title: "Trade Vendors Tier 4",
    slug: "trade-vendors-tier-4",
    checked: false,
    description: "More accessible, but usually requires daily payments",
  },
]);

const subCategories = ref([]);

const selectedStyle = ref("text-white font-semibold text-[16px] bg-[#707070]");

const rgTabStyle = ref(
  "text-[#196499] font-semibold text-[16px] bg-gradient-to-r from-[#E4EEF3] to-[#F5F9FC]"
);

const tabMatch = ref(true);
const tabStrngth = ref(false);

// Data
defineProps({
  creditChecked: {
    type: Boolean,
    default: false,
  },
});

const categories = computed(
  () => store.getters["funding/getFundingCategories"]
);

const goBack = () => {
  router.go(-1);
};

const tabSwitch = () => {
  tabMatch.value = !tabMatch.value;
  tabStrngth.value = !tabStrngth.value;
};

// Hooks
onBeforeMount(() => {
  // Get current sub-categories
  const category = categories.value.find(
    (cat) => cat.slug === route.params.category
  );
  currentCategory.value = category;
  currentCategory.value && currentCategory.value["sub_categories"]
    ? (subCategories.value = currentCategory.value["sub_categories"])
    : (subCategories.value = []);
  // Get checked sub category
  subCategories.value = subCategories.value.length
    ? subCategories.value.map((subCat) =>
        subCat.slug === route.params.subcategory
          ? { ...subCat, checked: true }
          : { ...subCat, checked: false }
      )
    : [];
  // Get current sub-category
  // route.params.subcategory &&
  //   subCategories.value.length &&
  //   (currentSubCategory.value = subCategories.value.find(
  //     (subCategory) => subCategory.slug === route.params.subcategory
  //   ));
});

watch(route, (newRoute) => {
  // Get current sub-category
  newRoute.params.subcategory &&
    subCategories.value.length &&
    (currentSubCategory.value = subCategories.value.find(
      (subCategory) => subCategory.slug === newRoute.params.subcategory
    ));

  // Get checked sub category
  subCategories.value = subCategories.value.length
    ? subCategories.value.map((subCat) =>
        subCat.slug === route.params.subcategory
          ? { ...subCat, checked: true }
          : { ...subCat, checked: false }
      )
    : [];
});
</script>
