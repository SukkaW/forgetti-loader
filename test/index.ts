import chai from 'chai';
import { jestSnapshotPlugin } from 'mocha-chai-jest-snapshot';

import { defineForgettiLoaderOptions } from '../dist';

import getWebpackCompiler from './utils/get-webpack-compiler';
import getRspackCompiler from './utils/get-rspack-compiler';

import compile from './utils/compile';
import getModuleSource from './utils/get-module-source';

chai.should();
chai.use(jestSnapshotPlugin());

([
  ['forgetti-loader (webpack)', getWebpackCompiler],
  ['forgetti-loader (rspack)', getRspackCompiler]
] as const).forEach(([name, getCompiler]) => {
  describe(name, () => {
    it('defineForgettiLoaderOptions', () => {
      const opt = { preset: 'react', babel: {} };
      const definedOpt = defineForgettiLoaderOptions({ preset: 'react', babel: {} });

      definedOpt.should.eql(opt);
    });

    it('should work', async () => {
      const [compiler, fs] = getCompiler('./simple.jsx');
      const stats = await compile(compiler);

      getModuleSource('./simple.jsx', stats, fs)?.should.toMatchSnapshot('simple.jsx');
    });

    it('should work with tsx', async () => {
      const [compiler, fs] = getCompiler('./simple.tsx');
      const stats = await compile(compiler);

      getModuleSource('./simple.tsx', stats, fs)?.should.toMatchSnapshot('simple.tsx');
    });

    it('should optimize complex component', async () => {
      const [compiler, fs] = getCompiler('./complex.tsx');
      const stats = await compile(compiler);

      getModuleSource('./complex.tsx', stats, fs)?.should.toMatchSnapshot('complex.tsx');
    });

    it('should accept loader option', async () => {
      const [compiler, fs] = getCompiler('./preact.tsx', { preset: 'preact' });
      const stats = await compile(compiler);

      getModuleSource('./preact.tsx', stats, fs)?.should.toMatchSnapshot('preact.tsx');
    });
  });
});
