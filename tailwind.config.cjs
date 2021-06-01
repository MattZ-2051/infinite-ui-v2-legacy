module.exports = {
  mode: 'aot', // jit
  purge: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
      },
    },
    extend: {},
  },
  plugins: [],
};
