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
        'font': '#222',
        'border': 'rgba(75, 85, 99)',
        'dark': 'rgba(107, 114, 128)',
        'medium': 'rgba(249, 250, 251)',
        'light': 'rgba(209, 213, 219)',
        'footer': 'rgba(229, 231, 235)'
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
