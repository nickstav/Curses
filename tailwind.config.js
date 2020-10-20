const { claim_component } = require("svelte/internal");

module.exports = {
  theme: {
    extend: {
      height: theme => ({
        "canvasHeight": "calc(100% - 50px);",
      }),
    },
    variants: {},
    plugins: []
  }
}
