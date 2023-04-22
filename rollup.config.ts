import { defineConfig } from 'rollup';
import { swc } from 'rollup-plugin-swc3';
import dts from 'rollup-plugin-dts';

import pkgJson from './package.json';
import { builtinModules } from 'module';

const externalModules = Object.keys(pkgJson.dependencies).concat(Object.keys(pkgJson.peerDependencies)).concat(builtinModules).concat('next');

const external = (id: string) => externalModules.some((name) => id === name || id.startsWith(`${name}/`));

export default defineConfig([
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'commonjs'
      },
      {
        file: 'dist/index.cjs',
        format: 'commonjs'
      },
      {
        file: 'dist/index.mjs',
        format: 'esm'
      },
      {
        file: 'dist/index.m.js',
        format: 'esm'
      }
    ],
    plugins: [swc({
      jsc: {
        target: 'es2018',
        minify: {
          compress: { passes: 3 },
          mangle: {}
        }
      },
      minify: true
    })],
    external
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.d.ts'
    },
    // @ts-expect-error -- rollup-plugin-dts type is completely bullshit
    plugins: [dts.default()]
  }
]);
