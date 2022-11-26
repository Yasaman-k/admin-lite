<template>
  <div class="fixed right-0 z-30 bg-white" id="financial-statement-header">
    <PageHeader />
  </div>
  <section
    class="min-h-screen overflow-hidden relative flex gap-10 justify-between"
  >
    <SpinnerLoader
      v-if="!checkPointExist"
      pageHeaderId="financial-statement-header"
    />
    <div id="financial-statement-content" class="content">
      <router-view></router-view>
    </div>
    <base-foundation-right-bar
      activeNode="financial_statement"
      :nodeLink="financialStatementLink"
      pageHeaderId="financial-statement-header"
      pageContentId="financial-statement-content"
      aspectTitle="Financials"
      :aspectStatuses="financialNodes"
      :aspectStatusesDb="financialStatuses"
    >
    </base-foundation-right-bar>
  </section>
</template>

<script setup>
import { onBeforeMount, onUpdated, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import SpinnerLoader from "../components/SpinnerLoader.vue";
import PageHeader from "../components/PageHeader.vue";
import BaseFoundationRightBar from "../components/BaseFoundationRightBar.vue";
import { financialNodes } from "../constants";
import moment from "moment";

const store = useStore();
const router = useRouter();
const route = useRoute();
const checkPointExist = ref(false);
const financialStatementLink = ref("");
const financialStatuses = ref(store.getters["aspects/getFinancialsStatuses"]);

onBeforeMount(async () => {
  await store.dispatch(
    "financialStatement/fetchFinancialStatementConfirmation"
  );
  await store.dispatch("financialStatement/fetchFinancialStatementsTerms");

  // Check Confirmation
  const confirmation =
    store.getters["financialStatement/getFinancialStatementConfirmation"];
  let statementConfirmation;
  confirmation.length &&
  confirmation[0].has_financial_statements &&
  (confirmation[0].has_financial_statements.value === false ||
    confirmation[0].has_financial_statements.value === true)
    ? (statementConfirmation = confirmation[0].has_financial_statements.value)
    : (statementConfirmation = null);
  // Check Statements Terms
  let statementsTerms = store.getters["financialStatement/getStatementsTerms"];

  statementsTerms.length
    ? (statementsTerms =
        statementsTerms[0].financial_statements_terms.data.const)
    : (statementsTerms = "");
  // Check File Uploaded
  const fileData = store.getters["financialStatement/getFileData"];
  let fileDateUploaded = null;
  if (fileData) {
    fileDateUploaded = moment(fileData.created_at).format("MMM Do, Y");
  }

  // Determine The Checkpoint
  if (statementConfirmation && !statementsTerms.length) {
    checkPointExist.value = true;
    return router.push(
      "/fundability/financials/financial-statements/statements-terms"
    );
  } else if (
    statementConfirmation &&
    statementsTerms.length &&
    !fileDateUploaded
  ) {
    checkPointExist.value = true;
    return router.push(
      "/fundability/financials/financial-statements/upload-statement"
    );
  } else if (
    statementConfirmation &&
    statementsTerms.length &&
    fileDateUploaded
  ) {
    checkPointExist.value = true;
    return router.push("/fundability/financials/financial-statements/complete");
  } else if (!statementConfirmation && statementConfirmation != null) {
    checkPointExist.value = true;
    return router.push(
      "/fundability/financials/financial-statements/resources"
    );
  }
  checkPointExist.value = true;
  return router.push("/fundability/financials/financial-statements");
});

onUpdated(() => {
  financialStatementLink.value = route.fullPath;
});
</script>
