import typescript from '@rollup/plugin-typescript'
import svelte from 'rollup-plugin-svelte'
import css from 'rollup-plugin-css-only'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import {terser} from 'rollup-plugin-terser'

const svelteConfig = require("./svelte.config.js")
const production = true

const plugins = [
  typescript(),
  svelte({
    ...svelteConfig,
    compilerOptions: {
      // enable run-time checks when not in production
      dev: !production
    }
  }),
  // we'll extract any component CSS out into
  // a separate file - better for performance
  css({output: 'bundle.css'}),

  // If you have external dependencies installed from
  // npm, you'll most likely need these plugins. In
  // some cases you'll need additional configuration -
  // consult the documentation for details:
  // https://github.com/rollup/plugins/tree/master/packages/commonjs
  resolve({
    browser: true,
    dedupe: ['svelte']
  }),
  commonjs(),
  terser(),
]

export default [
  {
    input: 'src/index.ts',
    output: {
      sourcemap: true,
      format: 'iife',
      name: 'app',
      file: 'docs/build/index.js'
    },
    plugins
  },

  {
    input: 'src/components.ts',
    output: {
      sourcemap: true,
      format: 'iife',
      name: 'app',
      file: 'docs/build/components.js'
    },
    plugins
  },
]