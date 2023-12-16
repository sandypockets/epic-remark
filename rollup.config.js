import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.js', // Your entry point
  output: {
    file: 'dist/index.esm.js',
    format: 'esm', // ES Module format
    sourcemap: true,
  },
  plugins: [
    resolve(), // Resolves node modules
    commonjs(), // Converts CommonJS modules to ES6
    postcss({
      extract: true, // Extracts CSS to a separate file
      minimize: true, // Minifies the CSS
    }),
    terser(), // Minifies the bundle
  ],
};
