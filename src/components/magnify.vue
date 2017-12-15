<template>
  <div class="vue-magnify">
    <div class="preview-box" @mousemove="move($event)"  @mouseout="out" ref="previewBox">
      <img width="100%" :src="previewImg" alt="">
      <div class="hover-box" ref="hoverBox"></div>
    </div>
    <div class="zoom-box" v-show="zoomVisiable" ref="zoomBox">
      <img :src="zoomImg" alt="" ref="bigImg">
    </div>
  </div>
</template>

<script>
import {offset} from '../dom/dom';

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
    out() {
      this.zoomVisiable = false;
    },
    move(ev) {
      this.init();
      const scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
      const scrollY = document.documentElement.scrollTop || document.body.scrollTop;
      let moveX = ev.clientX + scrollX;
      let moveY = ev.clientY + scrollY;
      let offsetLeft = offset(this.oPreviewBox).left;
      let offsetTop = offset(this.oPreviewBox).top;
      let left = moveX - offsetLeft - this.houverWidth / 2;
      let top = moveY - offsetTop - this.houverHeight / 2;
      let maxWidth = this.pWidth - this.houverWidth;
      let maxHeight = this.pWidth - this.houverHeight;

      left = left < 0 ? 0 : left > maxWidth ? maxWidth : left;
      top = top < 0 ? 0 : top > maxHeight ? maxHeight : top;
      let percentX = left / (maxWidth);
      let percentY = top / (maxHeight);

      this.oHoverBox.style.left = left + 'px';
      this.oHoverBox.style.top = top + 'px';
      this.oBigImg.style.left = percentX * (this.bWidth - this.imgWidth) + 'px';
      this.oBigImg.style.top = percentY * (this.bHeight - this.imgHeight) + 'px';
      this.$emit('move', ev);
      this.zoomVisiable = true;
    },
    init() {
      this.oHoverBox = this.$refs.hoverBox;
      this.oPreviewBox = this.$refs.previewBox;
      this.oBigImg = this.$refs.bigImg;
      this.imgBox = this.$refs.zoomBox;

      this.houverWidth = this.oHoverBox.offsetWidth;
      this.houverHeight = this.oHoverBox.offsetHeight;
      this.pWidth = this.oPreviewBox.offsetWidth;
      this.pHeight = this.oPreviewBox.offsetHeight;

      this.imgWidth = this.oBigImg.offsetWidth;
      this.imgHeight = this.oBigImg.offsetHeight;
      this.bWidth = this.imgBox.offsetWidth;
      this.bHeight = this.imgBox.offsetHeight;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .vue-magnify {
    position: relative;
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
        background: url('https://img-tmdetail.alicdn.com/tps/i4/T12pdtXaldXXXXXXXX-2-2.png') repeat 0 0;
        cursor: move;
        user-select: none;
      }
    }
    .zoom-box {
      width: 430px;
      height: 430px;
      overflow: hidden;
      position: absolute;
      left: 435px;

      border: 1px solid #dc7a7a;;
      top: 0;
      img {
        position: absolute;
        top: 0;
        left: 0;
      }
    }
  }
</style>

