<template>
  <section class="vue-magnify">
    <magnify-preview :preview-img="previewImg" />
    <magnify-zoom :zoom-img="zoomImg" />
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MagnifyPreview from '../magnify-preview/index.vue'
import MagnifyZoom from '../magnify-zoom/index.vue'

export default defineComponent({
  name: 'vue-magnify',
  props: {
    /**
     * 展示时的图片
     */
    previewImg: {
      type: String,
      required: true
    },
    /**
     * 放大后的图片
     */
    zoomImg: {
      type: String,
      required: true
    }
  },
  components: {
    MagnifyPreview,
    MagnifyZoom
  }
  // setup() {

  // }
})
</script>

<style lang="less" src="../index.less"></style>
