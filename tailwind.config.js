module.exports = {
    purge: {
        content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
        // Safelist any necessary classes that should not be purged
        safelist: [],
      },
    theme: {
      extend: {
        animation: {
          spin: 'spin 1s linear infinite',
        },
        colors: {
          'custom-blue': '#3490dc',
        },
      },
    },
    plugins: [],
  };
 
  