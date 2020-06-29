<template>
  <div class="vue-magnify-preview" ref="previewWarrperRef">
    <img :src="previewImg" alt="preview-img" />
    <span
      class="follow-unit"
      :style="followStyle"
      v-show="isInside"
      ref="followRef"
    >
      <i></i>
    </span>
  </div>
</template>

<script lang="ts">
import { useHoverElement } from '@/hooks/useHoverElement'
import { useElementRect } from '@/hooks/useElementRect'
import { ref, computed, watch, inject } from 'vue'
import { MagnifyProvide } from '../types'
export default {
  props: ['previewImg'],
  components: {},
  setup() {
    const followRef = ref(null)
    const previewWarrperRef = ref(null)
    const {
      offsetLeft,
      offsetTop,
      isInside,
      width,
      height,
      x,
      y
    } = useHoverElement(previewWarrperRef)
    const { setZoomVisible, setFollowInfo, followSize } = inject(
      'magnify'
    ) as MagnifyProvide

    const followStyle = computed(() => {
      const { width: fWidth, height: fHeight, eleX, eleY } = useElementRect(
        followRef
      )

      const maxLeft = width.value - fWidth.value
      const maxTop = height.value - fHeight.value

      let left = x.value - offsetLeft.value - fWidth.value / 2
      let top = y.value - offsetTop.value - fHeight.value / 2

      left = left > 0 ? Math.min(left, maxLeft) : 0
      top = top > 0 ? Math.min(top, maxTop) : 0

      setFollowInfo({
        followX: eleX.value,
        followY: eleY.value,
        followW: fWidth.value,
        followH: fHeight.value,
        followMaxX: maxLeft,
        followMaxY: maxTop
      })

      return {
        width: followSize.value.w + 'px',
        height: followSize.value.w + 'px',
        left: left + 'px',
        top: top + 'px'
      }
    })

    watch(isInside, setZoomVisible)

    return {
      offsetLeft,
      offsetTop,
      x,
      y,
      isInside,
      followRef,
      followStyle,
      previewWarrperRef
    }
  }
}
</script>
