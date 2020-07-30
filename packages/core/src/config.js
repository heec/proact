const babelConfig = {
  presets: [
    [
      '@babel/preset-react',
      {
        pragma: 'Proact.h',
        pragmaFrag: 'Proact.f',
        throwIfNamespace: false,
      },
    ],
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
}

module.exports = {
  babelConfig,
}
