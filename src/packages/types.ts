import { Ref } from 'vue';

export interface MagnifyProvide {
  isZoomVisible: Ref<boolean>
  setZoomVisible: (val: boolean) => void
}
