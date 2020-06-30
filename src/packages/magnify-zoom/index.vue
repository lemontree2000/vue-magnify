<template>
  <div
    class="vue-magnify-zoom"
    ref="zoomRef"
    :style="{ width: zoomSize.w + 'px', height: zoomSize.h + 'px' }"
  >
    <!-- {{ scaleInfo }} -->
    <img :src="zoomImg" ref="imgRef" />
  </div>
</template>

<script lang="ts">
import { inject, computed, reactive, ref, watch, onMounted, Ref } from 'vue'
import { MagnifyProvide } from '../types'
import { useElementRect } from '../../hooks/useElementRect'
export default {
  props: ['zoomImg'],
  setup() {
    const { prveiwInfo, setZoomImgInfo, zoomSize } = inject(
      'magnify'
    ) as MagnifyProvide
    const zoomRef = ref(null) as Ref<HTMLImageElement | null>
    const imgRef = ref(null) as Ref<HTMLImageElement | null>
    const scaleInfo = computed(() => {
      const { width, height } = useElementRect(zoomRef)
      // 比例 = 移动距离 / 最大可移动距离
      const scaleX = prveiwInfo.followX / prveiwInfo.followMaxX
      const scaleY = prveiwInfo.followY / prveiwInfo.followMaxY
      return reactive({
        scaleX,
        scaleY,
        width,
        height
      })
    })
    onMounted(() => {
      if (imgRef.value) {
        imgRef.value.addEventListener('load', function() {
          setZoomImgInfo({ w: this.width, h: this.height })
        })
      }
    })

    watch(scaleInfo, val => {
      if (zoomRef.value && imgRef.value) {
        // 移动距离 = 比例 * 最大可移动距离
        zoomRef.value.scrollTo(
          val.scaleX * Math.abs(zoomSize.w - imgRef.value.width),
          val.scaleY * Math.abs(zoomSize.h - imgRef.value.height)
        )
      }
    })

    return {
      prveiwInfo,
      scaleInfo,
      zoomRef,
      imgRef,
      zoomSize
    }
  }
}
</script>
