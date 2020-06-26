<template>
  <div class="vue-magnify-preview">
    {{ x }}
    {{ y }}
    {{ followStyle }}
    <img :src="previewImg" alt="preview-img" ref="previewRef" />
    <span
      class="follow-unit"
      :style="followStyle"
      v-show="isFollowVisible"
      ref="followRef"
    >
    </span>
    <button @click="stop">click</button>
  </div>
</template>

<script lang="ts">
import { useHoverElement } from '@/hooks/useHoverElement'
import { useElementRect } from '@/hooks/useElementRect'
import { ref, computed } from 'vue'

// const defStyle = {
//   left: 0,
//   top: 0
// }

export default {
  props: ['previewImg'],
  setup() {
    const previewRef = ref(null)
    const followRef = ref(null)
    const { x, y, isInside } = useHoverElement(previewRef)
    const { width, height } = useElementRect(previewRef)
    console.log(width.value, height.value)
    const followStyle = computed(() => {
      return {
        left: x.value + 'px',
        top: y.value + 'px'
      }
    })

    const isFollowVisible = computed(() => isInside.value)
    return {
      x,
      y,
      isFollowVisible,
      isInside,
      previewRef,
      followRef,
      followStyle
    }
  }
}
</script>
