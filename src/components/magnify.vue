<template>
  <div class="vue-magnify">
    <div class="preview-box" @mousemove="move($event)">
      <img width="100%" :src="previewImg" alt="">
      <div class="hover-box" ></div>
    </div>
    <div class="zoom-box" v-show="zoomVisiable">
      <img :src="zoomImg" alt="">
    </div>
  </div>
</template>

<script>
import {$, offset} from '../dom/dom';

export default {
  name: 'vue-magnify',
  props: {
    previewImg: {
      type: String,
      default: ''
    },
    zoomImg: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      zoomVisiable: false,
      hoverVisiable: false
    };
  },
  methods: {
    move(ev) {
      this.moveX = ev.clientX;
      this.moveY = ev.clientY;
      let oHoverBox = $('.hover-box');
      let oPreviewBox = $('.preview-box');
      let offsetLeft = offset(oPreviewBox).left;
      let offsetTop = offset(oPreviewBox).top;
      let houverWidth = oHoverBox.clientWidth;
      let houverHeight = oHoverBox.clientHeight;
      oHoverBox.style.left = `${this.moveX - offsetLeft - houverWidth / 2}px`;
      oHoverBox.style.top = `${this.moveY - offsetTop - houverHeight / 2}px`;
      let houverLeft = offset(oHoverBox).left;
      let houverTop = offset(oHoverBox).top;
      if (houverLeft <= offsetLeft) {
        oHoverBox.style.left = 0;
      }
      if (houverTop <= offsetTop) {
        oHoverBox.style.top = 0;
      }
      if (houverTop >= oPreviewBox.clientHeight) {
        oHoverBox.style.top = oPreviewBox.clientHeight - houverHeight + 'px';
      }
      if (houverLeft >= oPreviewBox.clientWidth) {
        oHoverBox.style.left = oPreviewBox.clientWidth - houverHeight + 'px';
      }
    }
  },
  created() {
    this.moveX = 0;
    this.moveY = 0;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .vue-magnify {
    .preview-box {
      width: 430px;
      height: 430px;
      border: 1px solid #dededd;
      position: relative;
      &:hover .hover-box{
        display: block;
      }
      .hover-box {
        position: absolute;
        display: none;
        left: 0;
        top: 0;
        width: 100px;
        height: 100px;
        border: 1px solid #545454;
        background: rgba(199, 49, 49, 0.5);
        cursor: move;
        user-select: none;
      }
    }
  }
</style>

