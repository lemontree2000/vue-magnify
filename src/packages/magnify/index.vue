<template>
  <section class="vue-magnify" :style="previewStyle">
    <!-- 处理边距造成的移动不准 -->
    <!-- {{ followSize }}
    <p>1</p>
    <p>1</p> -->
    <magnify-preview :preview-img="previewImg" />
    <magnify-zoom :zoom-img="zoomImg" />
  </section>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  provide,
  reactive,
  onMounted,
  computed
} from 'vue'
import MagnifyPreview from '../magnify-preview/index.vue'
import MagnifyZoom from '../magnify-zoom/index.vue'
import { PrveiwInfo } from '../types'

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
    },
    defaultPrevSize: {
      type: Object,
      default: () => ({
        width: 450,
        height: 450
      })
    },
    defaultZoomSize: {
      type: Object,
      default: () => null
    }
  },
  components: {
    MagnifyPreview,
    MagnifyZoom
  },
  setup(ctx) {
    const isZoomVisible = ref(false)
    const prveiwInfo = reactive({
      followX: 0,
      followY: 0,
      followW: 0,
      followH: 0,
      followMaxX: 0,
      followMaxY: 0
    })
    const zoomImgSize = reactive({
      w: 0,
      h: 0
    })

    const zoomSize = reactive({
      w: 0,
      h: 0
    })

    const prevSize = reactive({
      w: 0,
      h: 0
    })

    const setZoomVisible = (v: boolean) => {
      isZoomVisible.value = v
    }
    /**
     * TODO 优化下面代码
     */
    const setFollowInfo = (v: PrveiwInfo) => {
      prveiwInfo.followX = v.followX
      prveiwInfo.followY = v.followY
      prveiwInfo.followW = v.followW
      prveiwInfo.followH = v.followH
      prveiwInfo.followMaxX = v.followMaxX
      prveiwInfo.followMaxY = v.followMaxY
    }

    const setZoomImgInfo = (v: { h: number; w: number }) => {
      zoomImgSize.w = v.w
      zoomImgSize.h = v.h
    }

    const followSize = computed(() => {
      return {
        w: prevSize.w * (zoomSize.w / zoomImgSize.w),
        h: prevSize.h * (zoomSize.h / zoomImgSize.h)
      }
    })

    const previewStyle = computed(() => {
      return {
        width: prevSize.w + 'px',
        height: prevSize.h + 'px'
      }
    })

    function initZoomSize() {
      if (ctx.defaultZoomSize) {
        zoomSize.w = ctx.defaultZoomSize.width
        zoomSize.h = ctx.defaultZoomSize.height
      } else {
        zoomSize.w = prevSize.w
        zoomSize.h = prevSize.h
      }
    }

    function initPrevSize() {
      prevSize.w = ctx.defaultPrevSize.width
      prevSize.h = ctx.defaultPrevSize.height
    }

    function init() {
      initPrevSize()
      initZoomSize()
    }

    onMounted(() => {
      init()
    })
    provide('magnify', {
      isZoomVisible,
      setZoomVisible,
      setFollowInfo,
      prveiwInfo,
      setZoomImgInfo,
      followSize,
      zoomSize
    })

    return {
      isZoomVisible,
      prveiwInfo,
      zoomImgSize,
      followSize,
      zoomSize,
      prevSize,
      previewStyle
    }
  }
})
</script>

<style lang="less" src="../index.less"></style>
