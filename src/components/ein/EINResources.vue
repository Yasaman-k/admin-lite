<template>
  <section class="container pt-40 !pb-24 2xl:mb-5 px-20 relative">
    <div class="fixed z-10 bg-white px-24" ref="warning">
      <BaseWarning
        icon="Negative"
        title="All business entities require an ein"
        message="The United States requires all business entities to file for an EIN#.  Like a social security number is to an individual, an EIN# is to a business."
      />
    </div>
    <div ref="content">
      <p class="w-2/3 mt-10 text-base font-medium text-black">
        {{ title }}
      </p>
      <BaseBusinessConfirmationFields
        :businessName="EINFields.company.data || ''"
        :addressLineOne="EINFields.business_address_street.data || ''"
        :addressLineTwo="EINFields.business_address_line2.data || ''"
        :city="EINFields.business_address_city.data || ''"
        :state="EINFields.business_address_state.data || ''"
        :zipCode="EINFields.business_address_zip.data || ''"
      />
    </div>
    <BaseResources :text="resourceTitle" :resources="resources" />
    <BaseBackNextBtns
      nextLabel="I Have A EIN Account"
      :nextDisabled="false"
      @next="goNext"
    />
  </section>
</template>

<script setup>
import { useRouter } from "vue-router";
import { onBeforeMount, onMounted, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
import BaseWarning from "../BaseWarning.vue";
import BaseBusinessConfirmationFields from "../BaseBusinessConfirmationFields.vue";
import BaseBackNextBtns from "../BaseBackNextBtns.vue";
import BaseResources from "../BaseResources.vue";

const store = useStore();
const router = useRouter();

// refs
const warning = ref(null);

// Data
const title = ref(
  "Use the copy/paste icons (below right) to paste your business name and address into EIN forms."
);
const resourceTitle = ref("Click on a resource below to get your new EIN!");

const EINFields = ref({
  company: {
    data: "",
  },
  business_address_street: {
    data: "",
  },
  business_address_line2: {
    data: "",
  },
  business_address_city: {
    data: "",
  },
  business_address_state: {
    data: "",
  },
  business_address_zip: {
    data: "",
  },
});

const resources = ref([
  {
    id: 1,
    title: "Regus Virtual Offices",
    image: "/images/regus.png",
    link: "/",
  },
  {
    id: 2,
    title: "Davinci Virtual Offices",
    image: "/images/davinci.png",
    link: "/",
  },
]);
// Hooks
onBeforeMount(async () => {
  // Get Fields
  const fields = store.state.ein.EINFields;
  if (!fields.length) {
    await store.dispatch("ein/fetchEINFields");
  }
  fields.length &&
    fields.map((field) => {
      return (EINFields.value[Object.keys(field)[0]] = Object.values(field)[0]);
    });
});

onMounted(() => {
  const header = document.getElementsByClassName("page-header")[0] || null;
  const leftNavbar = document.getElementById("left-navbar") || null;
  const rightNavbar = document.getElementById("right-navbar") || null;
  warning.value &&
    (warning.value.style.top = `${header && header.clientHeight}px`);
  warning.value &&
    (warning.value.style.left = `${
      leftNavbar && window.innerWidth > 1023 ? leftNavbar.clientWidth - 20 : 0
    }px`);
  warning.value &&
    (warning.value.style.right = `${
      rightNavbar && window.innerWidth > 1023 ? rightNavbar.clientWidth + 62 : 0
    }px`);

  //fetch aspect content
  const page = store.getters["aspectScreen/getPageContent"];
  const einResources = page.find((item) =>
    Object.prototype.hasOwnProperty.call(item, "foundation/ein/resources")
  );

  if (page.length && einResources) {
    let resourceData = einResources["foundation/ein/resources"];
    title.value = resourceData.title ? resourceData.title : title.value;
    resourceTitle.value = resourceData.resource_title
      ? resourceData.resource_title
      : resourceTitle.value;
    resources.value =
      resourceData.resources.length > 0
        ? resourceData.resources
        : resources.value;
  }

  //eoc
});
// Methods
const goNext = () => router.push("/fundability/foundation/ein/ein-form");

window.addEventListener("resize", (e) => {
  const header = document.getElementsByClassName("page-header")[0] || null;
  const leftNavbar = document.getElementById("left-navbar") || null;
  const rightNavbar = document.getElementById("right-navbar") || null;
  warning.value &&
    (warning.value.style.top = `${header && header.clientHeight}px`);
  warning.value &&
    (warning.value.style.left = `${
      leftNavbar && e.target.innerWidth > 1023 ? leftNavbar.clientWidth - 20 : 0
    }px`);
  warning.value &&
    (warning.value.style.right = `${
      rightNavbar && e.target.innerWidth > 1023
        ? rightNavbar.clientWidth + 62
        : 0
    }px`);
});
</script>
