module.exports = {
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      "./src/**/*.svelte",
      "./src/**/*.html",
    ]
  },
  darkMode: false, // or 'media' or 'class',
  theme: {
    colors: {
      theme : {
        'font': '#222', // #000000
        'mainBackground' : 'rgba(243, 244, 246)',
        'primary-dark': 'rgba(75, 85, 99)', // #b99500
        'primary': 'rgba(107, 114, 128)', // #f0c526
        'primary-light': 'rgba(156, 163, 175)',
        'secondary-light': 'rgba(229, 231, 235)',
        'secondary': 'rgba(209, 213, 219)', // #f5f5f5
        'secondary-dark': 'rgba(156, 163, 175)' // #c2c2c2
        // https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=FF9800&secondary.color=f5f5f5
      }
    },
    fontSize: {
      '2xs': '.5rem',
      'xs': '.75rem',
      'sm': '.875rem',
      'lg': '1.125rem',
      'xl': '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
    }
  }
}
