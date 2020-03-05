module.exports = {
  theme: {
    screens: {
      mobile: '360px',
      tablet: '1024px',
      laptop: '1280px',
    },
    fontFamily: {
      display: ["Playfair Display", "serif"],
      body: ["Source Sans Pro", "sans-serif"],
    },
    borderWidth: {
      default: '1px',
      '0': '0',
      '2': '2px',
      '4': '4px',
    },
    textSizes: ['tablet', 'hover', 'focus', 'active', 'group-hover'],
    extend: {
      colors: {
        cyan: '#9cdbff',
      },
      spacing: {
        '96': '24rem',
        '128': '32rem',
      }
    }
  }
}