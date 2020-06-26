<template>
  <div class="vue-magnify-zoom">
    <img :src="zoomImg" alt="zoom-img" />
  </div>
</template>

<script lang="ts">
export default {
  props: ['zoomImg']
}
</script>
