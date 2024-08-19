/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      borderImage: {
        'gradient': 'linear-gradient(to right, #add8e6, #4b0082) 1',
      },
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

