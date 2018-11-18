# vue-magnify / vue放大镜组件

> 这是一个vue 放大镜组件，主要用于电商网站展示图片


![vue](https://github.com/lemontree2000/vue-magnify/raw/master/static/image/pre.png)

## How use / 怎么使用


```bash
npm i vue-magnify
```

```javascript
// main.js
import vueMagnify from 'vue-magnify';
Vue.use(vueMagnify);
```
```html
<!-- *.vue -->
<vue-magnify
  @move="handleMove"
  :previewImg="data.min"
  :zoomImg="data.max">
</vue-magnify>
```

> 欢迎fork一起开发改进

## preview / 预览


``` bash

#  clone git repository   克隆项目
git clone https://github.com/lemontree2000/vue-magnify.git

# install dependencies  安装依赖
npm install

# serve with hot reload at localhost:8080 运行开发预览
npm run dev

# build for production with minification  打包构建 -- 可以忽略
npm run build

```

