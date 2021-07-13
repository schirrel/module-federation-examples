const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;
  const deps = require("./package.json").dependencies;

module.exports = {
  publicPath: "http://localhost:9001/",
  configureWebpack: {
    plugins: [
      new ModuleFederationPlugin({
        name: "other",
        filename: "remoteEntry.js",
        exposes: {
          "./MainComponent": "./src/components/MainComponent",
        },remotes: {
          store: "store@http://localhost:8080/store.js",
        },
        shared: [
          {
            ...deps,
            vue: {
              // eager: true,
              singleton: true,
              requiredVersion: deps.vue,
            },
          }
        ],    
        }),
    ],
  },
  devServer: {
    port: 9001,
  },
};
