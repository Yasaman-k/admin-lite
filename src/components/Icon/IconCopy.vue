<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="19.155"
    height="22.18"
    viewBox="0 0 19.155 22.18"
  >
    <path
      id="Icon_material-content-copy"
      data-name="Icon material-content-copy"
      d="M17.115,1.5H5.016A2.022,2.022,0,0,0,3,3.516V17.631H5.016V3.516h12.1Zm3.025,4.033H9.049A2.022,2.022,0,0,0,7.033,7.549V21.664A2.022,2.022,0,0,0,9.049,23.68h11.09a2.022,2.022,0,0,0,2.016-2.016V7.549A2.022,2.022,0,0,0,20.139,5.533Zm0,16.131H9.049V7.549h11.09Z"
      transform="translate(-3 -1.5)"
      :fill="fill"
    />
  </svg>
</template>

<script setup>
defineProps({
  fill: {
    type: String,
    default: "#495a67",
  },
});
</script>
