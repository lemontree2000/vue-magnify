<template>
  <section class="vue-magnify" :style="previewStyle">
    <magnify-preview :preview-img="previewImg" @click="handleClick">
      <template class="preview-slot" v-slot:preview-slot>
        <slot name="preview-slot" />
      </template>
    </magnify-preview>
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
  },
  methods: {
    handleClick(event: MouseEvent) {
      this.$emit('on-preview-click', event)
    }
  }
})
</script>

<style>
.vue-magnify {
  cursor: move;
  position: relative;
}
.vue-magnify-preview {
  overflow: hidden;
  position: relative;
  border: 1px solid grey;
}
.vue-magnify-preview > img {
  width: 100%;
}
.vue-magnify-preview .follow-unit {
  position: absolute;
  /* 视口宽（小图的显示容器） = 大视口宽（大图的显示容器）/大展品宽（大图） * 小展品（小图） */
  /* width: 253.125px; */
  /* height: 253.125px; */
  left: 0;
  top: 0;
  user-select: none;
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAMAAABFaP0WAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAGUExURT1uzv///62t27cAAAACdFJOU/8A5bcwSgAAABBJREFUeNpiYGBkYGQECDAAAA0ABMZIs2EAAAAASUVORK5CYII=')
    repeat;
}
.vue-magnify-preview .follow-unit i {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 2px;
  height: 2px;
  background: red;
}
.vue-magnify-zoom {
  border: 1px solid #eee;
  overflow: hidden;
  position: absolute;
  top: 0;
}
</style>
