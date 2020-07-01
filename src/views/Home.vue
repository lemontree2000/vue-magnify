<template>
  <div class="home">
    <vue-magnify
      :preview-img="previewImg"
      :zoom-img="zoomImg"
      @on-preview-click="handleClick"
    >
      <template v-slot:preview-slot>
        <div class="preview-btn">
          <span class="video-icon" @click="playVideo"></span>
        </div>
      </template>
    </vue-magnify>
    <!-- 设置放大区域的尺寸 -->
    <vue-magnify
      :preview-img="previewImg"
      :zoom-img="zoomImg"
      :default-prev-size="{ width: 400, height: 450 }"
      :default-zoom-size="{ width: 500, height: 600 }"
    ></vue-magnify>
  </div>
</template>

<script>
// @ is an alias to /src
import { defineComponent } from 'vue'
import previewImg from '@/assets/product/onepuls8-pro.jpg'
import zoomImg from '@/assets/product/onepuls8-pro-zoom.jpg'

export default defineComponent({
  name: 'Home',
  components: {},
  data() {
    return {
      previewImg,
      zoomImg
    }
  },
  methods: {
    handleClick(e) {
      console.log(e)
    },
    playVideo(e) {
      e.stopPropagation()
      console.log('play video handler')
    }
  }
})
</script>

<style lang="less" scoped>
.preview-btn {
  position: absolute;
  bottom: 30px;
  text-align: center;
  width: 100%;
  z-index: 2;
  .video-icon {
    cursor: pointer;
    display: inline-block;
    width: 50px;
    height: 50px;
    background: url(//static.360buyimg.com/item/unite/1.0.101/components/default/preview/i/main-circles.png) 0 -55px no-repeat;
  }
}
</style>
