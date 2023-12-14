import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const commonConfig = {
  mode: 'production',
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, 'src')],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/env',
                  {
                    targets: '> 0.25%, not dead',
                  },
                ],
              ],
            },
          },
        ],
      },
    ],
  },
};

const esmConfig = {
  ...commonConfig,
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.esm.js',
    library: {
      type: 'module',
    },
    chunkFormat: 'module',
  },
  experiments: {
    outputModule: true,
  },
};

const cjsConfig = {
  ...commonConfig,
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
  },
};

export default [esmConfig, cjsConfig];
