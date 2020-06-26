<template>
  <div class="home">
    <vue-magnify :preview-img="previewImg" :zoom-img="zoomImg"></vue-magnify>
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
  }
})
</script>
