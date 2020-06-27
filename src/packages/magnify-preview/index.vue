<template>
  <div class="vue-magnify-preview" ref="previewWarrperRef">
    {{ x }},{{ y }}{{ followStyle }}
    <img :src="previewImg" width="400" alt="preview-img" ref="previewRef" />
    <span
      class="follow-unit"
      :style="followStyle"
      v-show="isInside"
      ref="followRef"
    >
    </span>
  </div>
</template>

<script lang="ts">
import { useHoverElement } from '@/hooks/useHoverElement'
import { useElementRect } from '@/hooks/useElementRect'
import { ref, computed, onMounted, reactive, watch, nextTick } from 'vue'

export default {
  props: ['previewImg'],
  components: {},
  setup() {
    const previewRef = ref(null)
    const followRef = ref(null)
    const previewWarrperRef = ref(null)
    const { x, y, isInside, width, height } = useHoverElement(previewWarrperRef)

    const followStyle = computed(() => {
      const { width: fWidth, height: fHeight } = useElementRect(followRef)

      let left = x.value - fWidth.value / 2
      let top = y.value - fHeight.value / 2

      if (left > width.value - fWidth.value) {
        left = width.value - fWidth.value
      } else if (left < 0) {
        left = 0
      }

      if (top > height.value - fHeight.value) {
        top = height.value - fHeight.value
      } else if (top < 0) {
        top = 0
      }

      return {
        left: left + 'px',
        top: top + 'px'
      }
    })

    return {
      x,
      y,
      isInside,
      previewRef,
      followRef,
      followStyle,
      previewWarrperRef
    }
  }
}
</script>
