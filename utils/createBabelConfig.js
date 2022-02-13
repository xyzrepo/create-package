const formatjs = require("./formatjs");

const createBabelConfig = ({ isReact, useFlow }) => {
  // Dependencies
  const devDependencies = [];
  devDependencies.push({
    "@babel/core": "^7.7.4",
    "@babel/preset-env": "^7.7.4",
    "@babel/runtime": "^7.17.2",
    "@babel/plugin-transform-runtime": "^7.17.0",
  });

  if (isReact) {
    devDependencies.push({
      "@babel/preset-react": "^7.7.4"
    });
  }

  if (useFlow) {
    devDependencies.push({
      "@babel/preset-flow": "*",
      "@babel/cli": "*",
    })
  }

  // Config file
  const presets = [`@babel/env`];
  if (isReact) {
    presets.push(`@babel/react`);
  }
  if (useFlow) {
    presets.push(`@babel/preset-flow"`);
  }
  const plugins = [`@babel/transform-runtime`];
  const babelrc = `module.exports = {
      presets: [${presets.map(p => JSON.stringify(p)).join(",")}],
      plugins: [${plugins.map(p => JSON.stringify(p)).join(",")}],
  }`;

  return {
    devDependencies,
    babelrc: formatjs(babelrc)
  };
};

module.exports = createBabelConfig;
