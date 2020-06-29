import { Ref, ComputedRef } from 'vue'

export interface MagnifyProvide {
  isZoomVisible: Ref<boolean>
  prveiwInfo: PrveiwInfo,
  followSize: ComputedRef<ElRect>
  setZoomVisible: (val: boolean) => void
  setFollowInfo: (val: PrveiwInfo) => void
  setZoomImgInfo: (val: { w: number; h: number }) => void
}

export interface PrveiwInfo {
  followW: number
  followH: number
  followX: number
  followY: number
  followMaxX: number
  followMaxY: number
}

export interface ElRect {
  w: number,
  h: number
}
