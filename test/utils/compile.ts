import type webpack from 'webpack';

export default function compile(compiler: webpack.Compiler): Promise<webpack.Stats> {
  return new Promise((resolve, reject) => {
    compiler.run((error, stats) => {
      if (error) {
        return reject(error);
      }

      if (!stats) {
        return reject(new TypeError('stats from compiler is null'));
      }

      return resolve(stats);
    });
  });
}
