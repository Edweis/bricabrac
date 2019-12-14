module.exports = {
  presets: ['@babel/preset-flow', 'babel-preset-expo'],
  plugins: [
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    [
      'module-resolver',
      {
        cwd: 'babelrc',
        root: ['./src'],
        extensions: ['.js', '.ios.js', '.android.js'],
        alias: {
          _assets: './src/assets',
          _components: './src/components',
          _constants: './src/constants',
          _hooks: './src/hooks',
        },
      },
    ],
  ],
};
