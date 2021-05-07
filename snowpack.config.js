/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    "docs": '/',
    "src": '/build',
  },
  plugins: [
    '@snowpack/plugin-svelte',
    '@snowpack/plugin-dotenv',
    '@snowpack/plugin-typescript',
    './snowpack-plugin-atomizer.js',
    './snowpack-plugin-lookbook.js',
    // './snowpack-plugin-stories.js',
  ],
  devOptions: {
    port: 5000,
  },
  buildOptions: {
    out: "build",
    clean: true,
    sourcemap: true,
  },
  alias: {
    /* ... */
  },
}