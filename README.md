# forgetti-loader

A Webpack loader that solves your hook spaghetti. Inspired by React Forget. Powered by Alexis H. Munsayac's [Forgetti](https://github.com/lxsmnsyc/forgetti).

## What is Forgetti?

Forgetti is an auto-memoization Babel plugin made by Alexis H. Munsayac. It was inspired by React Forget and can be used for optimizing a hook-based flow like React hooks.

[![React without memo](https://img.youtube.com/vi/lGEMwh32soc/0.jpg)](https://youtu.be/lGEMwh32soc "React without memo")

## Installation

```bash
# npm
npm i forgetti
npm i -D forgetti-loader
# yarn
yarn add forgetti
yarn add -D forgetti-loader
# pnpm
pnpm add forgetti
pnpm add -D forgetti-loader
```

## Usage

```js
// webpack.config.js

// You can leverage your IDE's Intellisense (autocompletion, type check, etc.) with the helper function:
const { defineForgettiLoaderOptions } = require('forgetti-loader');

module.exports = {
  module: {
    rules: [
      rules: [
        {
          test: /\.[mc]?jsx$/i,
          exclude: /node_modules/,
          use: [
            // babel-loader, swc-loader, esbuild-loader, or anything you like to transpile JSX should go here.
            // { loader: 'swc-loader' },
            // Now add forgetti-loader
            {
              loader: 'forgetti-loader',
              options: defineForgettiLoaderOptions({
                // Forgetti options. See https://github.com/lxsmnsyc/forgetti/tree/main#configuration for more details.
                preset: 'react',
                // preset: 'preact',
                // preset: {}
              })
            }
          ]
        }
      ]
    ]
  }
};
```

## Author

**forgetti-loader** © [Sukka](https://github.com/SukkaW), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by Sukka with help from contributors ([list](https://github.com/SukkaW/forgetti-loader/graphs/contributors)).

> [Personal Website](https://skk.moe) · [Blog](https://blog.skk.moe) · GitHub [@SukkaW](https://github.com/SukkaW) · Telegram Channel [@SukkaChannel](https://t.me/SukkaChannel) · Twitter [@isukkaw](https://twitter.com/isukkaw) · Mastodon [@sukka@acg.mn](https://acg.mn/@sukka) · Keybase [@sukka](https://keybase.io/sukka)
 