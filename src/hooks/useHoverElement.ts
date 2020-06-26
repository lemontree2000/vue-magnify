import { Ref, ref, watch } from 'vue'

export function useHoverElement(target: Ref<HTMLElement | null>) {
  const isInside = ref(false)

  const x = ref(0)
  const y = ref(0)
  
  watch(
    target,
    (el, _preEL, onCleanup) => {
      const moveHandler = (event: MouseEvent) => {
        x.value = event.pageX
        y.value = event.pageY
        isInside.value =  true
      }
      const leavehandler = (event: MouseEvent) => {
        isInside.value =  false
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
    isInside
  }
}
