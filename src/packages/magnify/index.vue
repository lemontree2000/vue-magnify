<template>
  <section class="vue-magnify">
    {{ isZoomVisible }}
    <magnify-preview :preview-img="previewImg" />
    <magnify-zoom :zoom-img="zoomImg" />
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, provide } from 'vue'
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
  },
  setup() {
    // console.log(ctx)
    const isZoomVisible = ref(false)
    const setZoomVisible = (v: boolean) => {
      isZoomVisible.value = v
    }

    provide('magnify', {
      isZoomVisible,
      setZoomVisible
    })

    return {
      isZoomVisible
    }
  }
})
</script>

<style lang="less" src="../index.less"></style>
