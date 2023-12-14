import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  mode: 'production',
  entry: './src/index.js',
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: {
      type: 'module',
    },
    chunkFormat: 'module',
  },
  experiments: {
    outputModule: true,
  },
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
