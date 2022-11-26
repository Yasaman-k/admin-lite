<template>
  <section class="relative h-full bg-white" v-if="!experimenter">
    <SpinnerLoader v-if="loading" />
    <div class="h-full">
      <FilterCarousel :filterItems="filters" />
      <div class="flex w-full" ref="vendorView">
        <div class="relative w-full px-5" ref="vendorCards">
          <div
            class="absolute top-0 bottom-0 -left-5 right-0 z-50 bg-[#00000030] hidden"
            ref="overflow"
          ></div>
          <VendorFilterNav v-model="filteredVendors" :vendors="vendors" />
          <p class="my-4 text-sunglow-blue">
            Showing {{ vendors.length }} matched out of
            {{ vendorsCount }} accounts
          </p>
          <VendorCards
            :vendors="vendors"
            @openVendor="(vendor) => openVendorDetails(vendor)"
            class="pb-3"
          />
        </div>
        <transition name="score-slide-fade">
          <div v-if="!showVendorDetails">
            <BaseScoreSidebar
              approvedFunding="58,000"
              :listedAccounts="7"
              :scoreLoaders="scoreLoaders"
              extraClasses="!w-full"
            />
          </div>
        </transition>
        <transition name="slide-fade">
          <div v-if="showVendorDetails" class="w-1/2">
            <VendorDetailsView
              v-if="openedVendor && openedVendor.title"
              @close="closeVendorDetails"
              image="/images/uline.png"
              :name="openedVendor.title"
              :type="openedVendor.type"
              :slug="openedVendor.slug"
              :reportsTo="openedVendor.reports_to"
              :terms="openedVendor.terms"
              :description="openedVendor.overview"
              :lenderRequirements="openedVendor.requirements"
              :applyingSteps="openedVendor.steps"
            />
          </div>
        </transition>
      </div>
      <button class="btn-primary block w-72 mt-5 mb-10 mx-auto text-center">
        Match More Accounts
      </button>
    </div>
  </section>
  <ExperimenterComponent :filterItems="filters" v-if="experimenter" />
</template>

<script setup>
import { onBeforeMount, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import VendorCards from "./VendorCards.vue";
import VendorFilterNav from "./VendorFilterNav.vue";
import SpinnerLoader from "../SpinnerLoader.vue";
import FilterCarousel from "./FilterCarousel.vue";
import ExperimenterComponent from "./ExperimenterComponent.vue";
import BaseScoreSidebar from "../BaseScoreSidebar.vue";
import VendorDetailsView from "./VendorDetailsView.vue";

const store = useStore();
const router = useRouter();
const route = useRoute();

// Refs
const overflow = ref(null);
const vendorView = ref(null);
const vendorCards = ref(null);

// Data
const loading = ref(true);
const experimenter = ref(false);
const scoreLoaders = ref([
  {
    title: "Equifax",
    currentScore: "2",
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
const showVendorDetails = ref(false);
const filteredVendors = ref([]);
const filters = ref([]);
const vendorsCount = ref(0);
const vendors = ref([]);
const openedVendor = ref({});

// Hooks
onBeforeMount(async () => {
  await store.dispatch("funding/fetchFundingAccounts");
  const catSlug = route.params.category;
  const subCatSlug = route.params.subcategory;
  if (catSlug || subCatSlug) {
    await store.dispatch(
      "funding/fetchFundingProviders",
      subCatSlug != "vendor-list" && subCatSlug != "experimenter"
        ? subCatSlug
        : catSlug
    );
    await store.dispatch(
      "funding/fetchTotalVendorsCount",
      subCatSlug != "vendor-list" && subCatSlug != "experimenter"
        ? subCatSlug
        : catSlug
    );
  }

  const allCats = store.getters["funding/getFundingCategories"];
  filters.value = [];
  allCats.map((cat) => {
    if (cat.sub_categories.length) {
      filters.value.push(cat);
      return filters.value.push(...cat.sub_categories);
    }
    return filters.value.push(cat);
  });

  // Determine vendor status
  vendors.value = [];
  const rawVendors = store.getters["funding/getVendors"];
  const accounts = store.getters["funding/getFundingAccounts"];

  accounts.length
    ? rawVendors.map((vendor) => {
        const hasAccount = accounts.find(
          (account) => account.funding_provider_id === vendor.id
        );
        if (hasAccount) {
          return vendors.value.push({ ...vendor, status: "applied" });
        }
        return vendors.value.push(vendor);
      })
    : (vendors.value = rawVendors);

  vendorsCount.value = store.getters["funding/getTotalVendorsCount"];

  // Check if there're no match
  if ((catSlug || subCatSlug) && !vendors.value.length) {
    experimenter.value = true;
    router.push(
      `/funding/funding-explorer/${catSlug}${
        subCatSlug &&
        subCatSlug != "vendor-list" &&
        subCatSlug != "experimenter"
          ? `/${subCatSlug}`
          : ""
      }/experimenter`
    );
  }

  loading.value = false;
});

onMounted(() => {
  vendorView.value.parentElement.parentElement.parentElement.parentElement.classList.add(
    "!bg-white"
  );
});

watch(route, async (newRoute) => {
  const catSlug = newRoute.params.category ? newRoute.params.category : "";
  const subCatSlug = newRoute.params.subcategory
    ? newRoute.params.subcategory
    : "";

  if (catSlug.length || subCatSlug.length) {
    await store.dispatch(
      "funding/fetchFundingProviders",
      subCatSlug != "vendor-list" && subCatSlug != "experimenter"
        ? subCatSlug
        : catSlug
    );
    await store.dispatch(
      "funding/fetchTotalVendorsCount",
      subCatSlug != "vendor-list" && subCatSlug != "experimenter"
        ? subCatSlug
        : catSlug
    );

    vendors.value = [];
    const rawVendors = store.getters["funding/getVendors"];
    const accounts = store.getters["funding/getFundingAccounts"];

    if (accounts.length) {
      rawVendors.map((vendor) => {
        const hasAccount = accounts.find(
          (account) => account.funding_provider_id === vendor.id
        );
        if (hasAccount) {
          return vendors.value.push({ ...vendor, status: "applied" });
        }
        return vendors.value.push(vendor);
      });
    } else {
      vendors.value = rawVendors;
    }
    vendorsCount.value = store.getters["funding/getTotalVendorsCount"];

    if (!vendors.value.length) {
      experimenter.value = true;
      return router.push(
        `/funding/funding-explorer/${catSlug}${
          subCatSlug &&
          subCatSlug != "vendor-list" &&
          subCatSlug != "experimenter"
            ? `/${subCatSlug}`
            : ""
        }/experimenter`
      );
    }
    experimenter.value = false;
    router.push(
      `/funding/funding-explorer/${catSlug}${
        subCatSlug &&
        subCatSlug != "vendor-list" &&
        subCatSlug != "experimenter"
          ? `/${subCatSlug}`
          : ""
      }/vendor-list`
    );
  }
});

// Methods
const closeVendorDetails = () => {
  showVendorDetails.value = false;
  overflow.value.classList.toggle("hidden");
};

const openVendorDetails = (vendor) => {
  showVendorDetails.value = true;
  openedVendor.value = vendor;
  setTimeout(() => {
    overflow.value.classList.toggle("hidden");
  }, 500);
};
</script>

<style>
.filter-item {
  @apply !flex items-center gap-2 text-sm font-normal bg-transparent px-4 py-2 rounded-md border border-[#E8E8E8] cursor-pointer hover:text-sunglow-blue hover:bg-[#E7EEF4] whitespace-nowrap;
}

.filter-item.selected {
  @apply bg-[#E7EEF4] border border-sunglow-blue text-sunglow-blue;
}

/*
  Enter and leave animations
*/
.score-slide-fade-enter-active {
  transition: all 0.3s ease-in-out 0.2s;
}

.score-slide-fade-leave-active {
  transition: all 0.3s ease-in-out;
}

.score-slide-fade-enter-from,
.score-slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all 0.5s ease-in-out;
}

.slide-fade-leave-active {
  transition: all 0.2s ease-in-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
