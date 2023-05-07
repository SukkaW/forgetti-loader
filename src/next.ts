import type { ForgettiLoaderOptions } from '.';
import type { NextConfig } from 'next/dist/server/config-shared';
import type { RuleSetRule } from 'webpack';

type RuleOptions = Omit<RuleSetRule, 'use'>;

export default function forgettiNextPlugin(pluginOptions: ForgettiLoaderOptions = { preset: 'react' }, _ruleOptions: RuleOptions = {}) {
  return (nextConfig: NextConfig = {}) => {
    const ruleOptions: RuleOptions = {
      test: /\.(mtsx|mjsx|tsx|jsx)$/,
      exclude: /node_modules/,
      ..._ruleOptions
    };

    return {
      ...nextConfig,
      webpack(config, ctx) {
        if (typeof nextConfig.webpack === 'function') {
          config = nextConfig.webpack(config, ctx);
        }

        config.module.rules.push({
          ...ruleOptions,
          use: [
            {
              loader: 'forgetti-loader',
              options: pluginOptions
            }
          ]
        });

        return config;
      }
    } as NextConfig;
  };
}
