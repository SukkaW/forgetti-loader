# forgetti-loader

A webpack loader, a [rspack](https://www.rspack.dev) loader and a Next.js plugin that brings an auto-memoization compiler to solve your hook spaghetti. Powered by [Forgetti](https://github.com/lxsmnsyc/forgetti) which is inspired by React Forget.

## What is Forgetti?

[Forgetti](https://github.com/lxsmnsyc/forgetti) is an auto-memoization Babel plugin made by [Alexis H. Munsayac](https://github.com/lxsmnsyc). It was inspired by React Forget and can be used for optimizing a hook-based flow like React hooks.

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

### Webpack / Rspack

```js
// webpack.config.js / rspack.config.js

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
            // If you are using rspack, the rspack's buiilt-in react transformation is sufficient.
            // { loader: 'swc-loader' },
            // Now add forgetti-loader
            {
              loader: 'forgetti-loader',
              options: defineForgettiLoaderOptions({
                // Forgetti options. See https://github.com/lxsmnsyc/forgetti/blob/main/docs/configuration.md for more details.
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

### Next.js

```js
// next.config.js
const withForgetti = require('forgetti-loader/next');

module.exports = withForgetti({
  // Forgetti options. See https://github.com/lxsmnsyc/forgetti/blob/main/docs/configuration.md for more details.
  preset: 'react',
  // preset: 'preact',
  // preset: {}
})({
  // Your Next.js config goes here.
});
```

## Author

**forgetti-loader** © [Sukka](https://github.com/SukkaW), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by Sukka with help from contributors ([list](https://github.com/SukkaW/forgetti-loader/graphs/contributors)).

> [Personal Website](https://skk.moe) · [Blog](https://blog.skk.moe) · GitHub [@SukkaW](https://github.com/SukkaW) · Telegram Channel [@SukkaChannel](https://t.me/SukkaChannel) · Twitter [@isukkaw](https://twitter.com/isukkaw) · Mastodon [@sukka@acg.mn](https://acg.mn/@sukka) · Keybase [@sukka](https://keybase.io/sukka)
