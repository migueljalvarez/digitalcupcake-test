'use strict'

module.exports = {
  plugins: ['@babel/plugin-proposal-optional-chaining'],
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: '12.13',
        },
      },
    ],
  ],
  ignore: [
    (filename) => {
      if (!/\/node_modules\//.test(filename)) {
        return false // if not in node_modules, we want to compile it
      } else {
        // console.log({ filename })
        return true
      }
    },
  ],
}
