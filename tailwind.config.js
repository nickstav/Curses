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
    extend: {
      colors: {
        'mainBackground' : 'rgba(243, 244, 246)',
        'header': '#bf360c',
        'header-border': '#870000',
        'header-font': '#fafafa',
        'sidebar': '#f5f5f5',
        'sidebar-lighter': '#ffffff',
        'sidebar-border': '#c2c2c2',
        'toolbar': '#f9683a',
        'toolbar-border': '#ff5722',
        'toolbar-lighter': '#ffbb93',
        'toolbar-hover': '#ffa270',
        'footer': '#f5f5f5',
        'footer-border': '#c2c2c2'
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
  },
  variants: {
    extend: {
     stroke: ['hover', 'focus'],
    }
  }
}
