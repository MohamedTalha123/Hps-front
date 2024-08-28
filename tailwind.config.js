/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-border': 'linear-gradient(to right, #add8e6, #4b0082)',      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.border-gradient-to-r': {
          'border-image': 'linear-gradient(to right, #add8e6, #4b0082) 1',
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    }
  ],
}

