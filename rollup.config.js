import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';

const createConfig = (inputFile, format, outputFile, cssFile) => ({
  input: inputFile,
  output: {
    file: `dist/${outputFile}`,
    format: format,
    sourcemap: false,
  },
  plugins: [
    resolve(),
    commonjs(),
    postcss({
      extract: `${cssFile}`,
      minimize: true,
    }),
    terser(),
  ],
});

export default [
  createConfig('src/index-light.js', 'esm', 'index.esm.js', 'index.esm.light.css'),
  createConfig('src/index-dark.js', 'esm', 'index.esm.js', 'index.esm.dark.css'),
  createConfig('src/index-light.js', 'cjs', 'index.cjs', 'index.cjs.light.css'),
  createConfig('src/index-dark.js', 'cjs', 'index.cjs', 'index.cjs.dark.css'),
];
