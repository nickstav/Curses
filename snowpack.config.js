/** @type {import("snowpack").SnowpackUserConfig } */

module.exports = {
  mount: {
    public: '/',
    src: '/_dist_',
  },
  plugins: [
    '@snowpack/plugin-svelte',
    '@snowpack/plugin-dotenv',
    ["@snowpack/plugin-build-script", {"cmd": "postcss", "input": [".css"], "output": [".css"]}],
    "@snowpack/plugin-webpack"
  ],
  install: [
    /* ... */
  ],
  installOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
  proxy: {
    /* ... */
  },
  alias: {
    /* ... */
  },
};
