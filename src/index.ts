import babel from '@babel/core';
import forgettiBabel from 'forgetti';

import type webpack from 'webpack';
import type { Options as ForgettiOptions } from 'forgetti';

export interface ForgettiLoaderOptions extends ForgettiOptions {
  babel?: babel.TransformOptions
}

export const defineForgettiLoaderOptions = (options: ForgettiLoaderOptions) => options;

const defaultBabelParsePlugins: NonNullable<NonNullable<babel.TransformOptions['parserOpts']>['plugins']> = ['jsx', 'typescript'];

export default async function forgettiLoader(this: webpack.LoaderContext<ForgettiLoaderOptions>, input: string, _inputSourceMap: any) {
  const callback = this.async();

  // TODO: is it possible to bail out early if the input doesn't contain a react component?
  try {
    const options = this.getOptions();

    const result = await babel.transformAsync(input, {
      // user configured babel option
      ...options.babel,
      // override babel plugins
      plugins: [
        [forgettiBabel, { preset: options.preset }],
        ...(options.babel?.plugins || [])
      ],
      // override babel parserOpts
      parserOpts: {
        ...(options.babel?.parserOpts || {}),
        // override babel parserOpts plugins and add jsx
        plugins: [
          ...(options.babel?.parserOpts?.plugins || []),
          ...defaultBabelParsePlugins
        ]
      },
      ast: false,
      sourceMaps: true,
      configFile: false,
      babelrc: false
    });

    if (!result) {
      throw new TypeError('babel.transformAsync with forgetti plugin returns null');
    }

    const { code, map } = result;
    callback(null, code ?? undefined, map ?? undefined);
  } catch (e) {
    callback(e as Error);
  }
}
