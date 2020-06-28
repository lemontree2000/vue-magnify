import { Ref } from 'vue';

export interface MagnifyProvide {
  isZoomVisible: Ref<boolean>
  followElRect: FollowInfo
  setZoomVisible: (val: boolean) => void
  setFollowInfo:(val: FollowInfo) => void
}

export interface FollowInfo {
  width: number,
  height: number,
  x: number,
  y: number
}
