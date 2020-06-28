<template>
  <section class="vue-magnify">
    <magnify-preview :preview-img="previewImg" />
    <magnify-zoom :zoom-img="zoomImg" />
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, provide, reactive } from 'vue'
import MagnifyPreview from '../magnify-preview/index.vue'
import MagnifyZoom from '../magnify-zoom/index.vue'
import { FollowInfo } from '../types'

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
    const followElRect = reactive({
      x: 0,
      y: 0,
      height: 0,
      width: 0
    })
    const setZoomVisible = (v: boolean) => {
      isZoomVisible.value = v
    }

    const setFollowInfo = (v: FollowInfo) => {
      followElRect.x = v.x
      followElRect.y = v.y
      followElRect.width = v.width
      followElRect.height = v.height
    }

    provide('magnify', {
      isZoomVisible,
      setZoomVisible,
      setFollowInfo,
      followElRect
    })

    return {
      isZoomVisible,
      followElRect
    }
  }
})
</script>

<style lang="less" src="../index.less"></style>
