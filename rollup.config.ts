import path from 'path';

import { defineConfig } from 'rollup';
import { swc } from 'rollup-plugin-swc3';
import dts from 'rollup-plugin-dts';

import pkgJson from './package.json';
import { builtinModules } from 'module';

const externalModules = Object.keys(pkgJson.dependencies).concat(Object.keys(pkgJson.peerDependencies)).concat(builtinModules).concat('next');

const external = (id: string) => externalModules.some((name) => id === name || id.startsWith(`${name}/`));

const buildMatrix = (inputName: string) => {
  const baseName = path.basename(inputName, path.extname(inputName));
  return defineConfig([
    {
      input: `src/${inputName}`,
      output: [
        {
          file: `dist/${baseName}.js`,
          format: 'commonjs'
        },
        {
          file: `dist/${baseName}.cjs`,
          format: 'commonjs'
        },
        {
          file: `dist/${baseName}.mjs`,
          format: 'esm'
        },
        {
          file: `dist/${baseName}.m.js`,
          format: 'esm'
        }
      ],
      plugins: [swc({
        jsc: {
          target: 'es2018',
          minify: {
            compress: { passes: 3 },
            mangle: {},
            module: true,
            keep_fnames: false
          }
        },
        minify: true
      })],
      external
    },
    {
      input: `src/${inputName}`,
      output: {
        file: `dist/${baseName}.d.ts`
      },
      // @ts-expect-error -- rollup-plugin-dts type is completely bullshit
      plugins: [dts.default()]
    }
  ]);
};

export default defineConfig([
  ...buildMatrix('index.ts'),
  ...buildMatrix('next.ts')
]);
