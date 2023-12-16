import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';

const createConfig = (format, outputFile, cssFile) => ({
  input: 'src/index.js',
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
  // ESM build for light mode
  createConfig('esm', 'index.esm.js', 'index.esm.light.css'),
  // ESM build for dark mode
  createConfig('esm', 'index.esm.js', 'index.esm.dark.css'),
  // CommonJS build for light mode
  createConfig('cjs', 'index.cjs', 'index.cjs.light.css'),
  // CommonJS build for dark mode
  createConfig('cjs', 'index.cjs', 'index.cjs.dark.css'),
];
