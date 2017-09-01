<template>
  <div id="app">
    <vue-magnify :previewImg="data.min" :zoomImg="data.max"></vue-magnify>
    <vue-magnify :previewImg="data.min" :zoomImg="data.max"></vue-magnify>
  </div>
</template>

<script>
import vueMagnify from './components/magnify';

export default {
  name: 'app',
  components: {
    vueMagnify
  },
  data() {
    return {
      data: {
        min: 'https://img.alicdn.com/imgextra/i3/2857774462/TB21fgcwwNlpuFjy0FfXXX3CpXa_!!2857774462.jpg_430x430q90.jpg',
        max: 'https://img.alicdn.com/imgextra/i3/2857774462/TB21fgcwwNlpuFjy0FfXXX3CpXa_!!2857774462.jpg'
      }
    };
  }
};
</script>

<style lang="less" scoped>
  #app {
    margin-left: 100px;
    margin-top: 100px;
  }
</style>

