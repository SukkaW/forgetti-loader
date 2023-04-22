import chai from 'chai';
import { jestSnapshotPlugin } from 'mocha-chai-jest-snapshot';

import getCompiler from './utils/get-compiler';
import compile from './utils/compile';
import getModuleSource from './utils/get-module-source';

chai.should();
chai.use(jestSnapshotPlugin());

describe('forgetti-loader', () => {
  it('should work', async () => {
    const compiler = getCompiler('./simple.jsx');
    const stats = await compile(compiler);

    getModuleSource('./simple.jsx', stats)?.should.toMatchSnapshot('simple.jsx');
  });

  it('should work with tsx', async () => {
    const compiler = getCompiler('./simple.tsx');
    const stats = await compile(compiler);

    getModuleSource('./simple.tsx', stats)?.should.toMatchSnapshot('simple.tsx');
  });

  it('should optimize complex component', async () => {
    const compiler = getCompiler('./complex.tsx');
    const stats = await compile(compiler);

    getModuleSource('./complex.tsx', stats)?.should.toMatchSnapshot('complex.tsx');
  });

  it('should accept loader option', async () => {
    const compiler = getCompiler('./preact.tsx', { preset: 'preact' });
    const stats = await compile(compiler);

    getModuleSource('./preact.tsx', stats)?.should.toMatchSnapshot('preact.tsx');
  });
});
