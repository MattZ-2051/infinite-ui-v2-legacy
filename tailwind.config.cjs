module.exports = {
  mode: 'aot', // jit
  purge: ['./src/**/*.{html,js,svelte,ts}'],
  corePlugins: {
    container: false,
  },
  theme: {
    extend: {},
  },
  plugins: [],
};
