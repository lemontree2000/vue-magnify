import { Ref, ref, watch } from 'vue'

export function useHoverElement(target: Ref<HTMLElement | null>) {
  const isInside = ref(false)

  const x = ref(0)
  const y = ref(0)
  const eleX = ref(0)
  const eleY = ref(0)
  const width = ref(0)
  const height = ref(0)
  const eleRightX = ref(0)
  const eleRightY = ref(0)
  
  watch(
    target,
    (el, _preEL, onCleanup) => {
      const moveHandler = (event: MouseEvent) => {
        const {
          width: rectWidth,
          height: rectHeight,
          x: rectX,
          y: rectY
        } = el!.getBoundingClientRect()

        x.value = event.pageX
        y.value = event.pageY
        width.value = rectWidth
        height.value = rectHeight
        isInside.value = false

        eleX.value = rectX
        eleY.value = rectY

        eleRightX.value = eleX.value + rectWidth
        eleRightY.value = eleY.value + rectHeight

        if (
          x.value > eleX.value &&
          y.value > eleY.value &&
          x.value < eleRightX.value &&
          y.value < eleRightY.value
        ) {
          isInside.value = true
        }
      }

      const leavehandler = (event: MouseEvent) => {
        isInside.value = false
      }

      el?.addEventListener('mousemove', moveHandler)
      el?.addEventListener('mouseleave', leavehandler)

      onCleanup(() => {
        el?.removeEventListener('mousemove', moveHandler)
        el?.removeEventListener('mouseleave', leavehandler)
      })
    },
    { immediate: true }
  )

  return {
    x,
    y,
    eleX,
    eleY,
    width,
    height,
    eleRightX,
    eleRightY,
    isInside
  }
}
