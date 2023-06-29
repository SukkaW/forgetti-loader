import path from 'path';

import { rspack } from '@rspack/core';
import { createFsFromVolume, Volume } from 'memfs';

import type { RspackOptions } from '@rspack/core';
import { externalModules } from './get-webpack-compiler';

import type { ForgettiLoaderOptions } from '../../src';

export default (fixture: string, loaderOptions: ForgettiLoaderOptions = { preset: 'react' }, config: RspackOptions = {}) => {
  process.env.RSPACK_CONFIG_VALIDATE = 'loose';
  const fullConfig: RspackOptions = {
    mode: 'development',
    target: 'web',
    devtool: config.devtool || false,
    context: path.resolve(__dirname, '../fixtures'),
    entry: Array.isArray(fixture)
      ? fixture
      : path.resolve(__dirname, '../fixtures', fixture),
    output: {
      path: '/',
      filename: '[name].bundle.js',
      chunkFilename: '[name].chunk.js',
      publicPath: '/webpack/public/path/',
      assetModuleFilename: '[name][ext]'
    },
    builtins: {
      react: {
        runtime: 'automatic',
        development: false,
        refresh: false
      }
    },
    module: {
      rules: [{
        test: /\.[mc]?[jt]sx$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: path.resolve(__dirname, '../../dist/index.js'),
            options: loaderOptions
          }
        ]
      }]
    },
    optimization: { minimize: false },
    externals: externalModules,
    plugins: [],
    stats: {
      preset: 'verbose',
      all: true,
      modules: true,
      chunks: true
    },
    ...config
  };

  const compiler = rspack(fullConfig);
  const fs = createFsFromVolume(new Volume()) as unknown as typeof import('fs');

  compiler.outputFileSystem = fs;

  return [compiler, fs] as const;
};
