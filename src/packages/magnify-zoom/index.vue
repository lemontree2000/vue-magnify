<template>
  <div class="vue-magnify-zoom" ref="zoomRef">
    <!-- {{ scaleInfo }} -->
    <img :src="zoomImg" ref="imgRef" alt="zoom-img" />
  </div>
</template>

<script lang="ts">
import { inject, computed, reactive, ref, watch, onMounted, Ref } from 'vue'
import { MagnifyProvide } from '../types'
import { useElementRect } from '../../hooks/useElementRect'
export default {
  props: ['zoomImg'],
  setup() {
    const { prveiwInfo, setZoomImgInfo } = inject('magnify') as MagnifyProvide
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
    console.log(imgRef)
    onMounted(() => {
      console.log(imgRef)
      if (imgRef.value) {
        imgRef.value.addEventListener('load', function() {
          setZoomImgInfo({ w: this.width, h: this.height })
        })
      }
    })

    watch(scaleInfo, val => {
      if (zoomRef.value) {
        // 移动距离 = 比例 * 最大可移动距离
        zoomRef.value.scrollTo(
          val.scaleX * Math.abs(val.width - 800),
          val.scaleY * Math.abs(val.height - 800)
        )
      }
    })

    return {
      prveiwInfo,
      scaleInfo,
      zoomRef,
      imgRef
    }
  }
}
</script>
