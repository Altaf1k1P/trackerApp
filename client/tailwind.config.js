const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwindcss-filters'), // optional but helpful
    plugin(function({ addUtilities }) {
      addUtilities({
        '.backdrop-ios': {
          'backdrop-filter': 'blur(8px)',
          '-webkit-backdrop-filter': 'blur(8px)',
          'background-color': 'rgba(0,0,0,0.4)',
        },
      });
    }),
  ],
}
