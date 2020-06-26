import { computed, Ref, ref, watch } from 'vue'

export function useElementRect(target: Ref<HTMLElement | null>) {
  const width = ref(0)
  const height = ref(0)
  const eleX = ref(0)
  const eleY = ref(0)

  watch(
    target,
    (el, preEl) => {
      if (el) {
        const rect = el.getBoundingClientRect()
        eleX.value = rect.x
        eleY.value = rect.x
        width.value = rect.width
        height.value = rect.height
      }
    },
    { immediate: true }
  )
  return {
    width,
    height,
    eleX,
    eleY
  }
}
