const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;
  const deps = require("./package.json").dependencies;

module.exports = {
  publicPath: "http://localhost:8080/",
  configureWebpack: {
    plugins: [
      new ModuleFederationPlugin({
        name: "consumer",
        filename: "remoteEntry.js",
        remotes: {
          core: "core@http://localhost:9000/remoteEntry.js",
          other : 'other@http://localhost:9001/remoteEntry.js'
        },
        shared: require("./package.json").dependencies,
      }),
      new ModuleFederationPlugin({
        name: "store",
        filename: "store.js",
        exposes: {
          "./state": "./src/store/index.js",
        },
        // sharing code based on the installed version, to allow for multiple vendors with different versions
        shared: [
          {
            ...deps,
            vue: {
              // eager: true,
              singleton: true,
              requiredVersion: deps.vue,
            },
          }
          ,
        ],
      }),
    ],
  },
};
