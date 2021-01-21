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
        'mainBackground' : 'rgba(243, 244, 246)',
        'header': '#bf360c', //'rgba(107, 114, 128)', // ##ff9800
        'header-border': '#870000', // 'rgba(75, 85, 99)', // #c66900
        'header-font': '#fafafa',
        'sidebar': '#f5f5f5', //'rgba(156, 163, 175)', // #ffc947
        'sidebar-lighter': '#ffffff',
        'sidebar-border': '#ff5722', //'rgba(229, 231, 235)', // #ffffff
        'toolbar': '#f9683a', //'rgba(209, 213, 219)', // #f5f5f5
        'toolbar-border': '#ff5722', //'rgba(156, 163, 175)' // #c2c2c2
        'toolbar-lighter': '#ffbb93',
        'toolbar-hover': '#ffa270',
        'footer': '#f5f5f5',
        'footer-border': '#e0e0e0'
        // https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=FF9800&secondary.color=f5f5f5
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
