import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.esm.js',
    format: 'esm',
    sourcemap: false,
  },
  plugins: [
    resolve(),
    commonjs(),
    postcss({
      extract: true,
      minimize: true,
    }),
    terser(),
  ],
};
