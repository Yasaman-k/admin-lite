<template>
  <div class="flex">
    <div class="flex-1 page-content">
      <div class="header">
        <h1 class="page-title">
          What ‘type’ of Business Address do you use for your documentation?
        </h1>
        <p class="page-description">
          You will be required to use the same business address across all
          business documentation and applications. Select which ‘type’ of
          address you use for your business.
        </p>
      </div>
      <div class="grid gap-5 lg:grid-cols-2">
        <BaseRadioButton
          radioName="boxes"
          text="Commercial Address"
          icon="CommercialAddress"
          value="1"
          @select="test"
        />
        <BaseRadioButton
          radioName="boxes"
          text="Home Address"
          icon="HomeAddress"
          value="2"
          @select="test"
        />
        <BaseRadioButton
          radioName="boxes"
          text="PO Box Number"
          icon="BoxAddress"
          value="3"
          @select="test"
        />
        <BaseRadioButton
          radioName="boxes"
          text="Virtual Address"
          icon="VirtualAddress"
          value="4"
          @select="test"
        />
      </div>
      <div class="flex items-center justify-end gap-8 mt-10 actions">
        <button class="btn-secondary">Go Back</button>
        <button class="btn-primary">Save</button>
      </div>
    </div>
    <RightNav />
  </div>
</template>

<script>
export default {};
</script>
