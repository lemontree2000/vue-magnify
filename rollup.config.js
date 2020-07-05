import typescript from 'rollup-plugin-typescript'
import vue from 'rollup-plugin-vue'
import resolve from '@rollup/plugin-node-resolve'
import pkg from './package.json'
import css from 'rollup-plugin-css-only'
import CleanCSS from 'clean-css'
import { writeFileSync } from 'fs'
export default {
  input: 'src/packages/index.ts',
  external: ['ms'],
  plugins: [
    resolve({ extensions: '.vue' }),
    typescript(),
    vue({ target: 'browser' }),
    css({
      output(style) {
        // 压缩 css 写入 dist/vue-magnify.min.css
        writeFileSync(
          'dist/vue-magnify.min.css',
          new CleanCSS().minify(style).styles
        )
      }
    })
  ],
  output: [
    {
      file: pkg.main,
      format: 'umd',
      name: 'vue-magnify'
    },
    {
      file: pkg.module,
      format: 'es'
    }
  ]
}
