<template>
  <div class="fixed right-0 z-30 bg-white" id="not-found-header">
    <PageHeader />
  </div>
  <section
    class="min-h-screen overflow-hidden relative pt-20 flex gap-10 justify-between"
  >
    <h1
      class="text-3xl text-sunglow-blue absolute text-center"
      id="not-found-content"
    >
      404 | Page Not Found
    </h1>
    <base-foundation-right-bar
      nodeLink="null"
      activeNode=""
      pageHeaderId="not-found-header"
      pageContentId="not-found-content"
      aspectTitle="Not Found"
    >
    </base-foundation-right-bar>
  </section>
</template>
