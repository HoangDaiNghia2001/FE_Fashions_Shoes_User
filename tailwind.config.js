/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    'bg-BLACK',
    'bg-BLUE',
    'bg-BROWN',
    'bg-GREEN',
    'bg-GREY',
    'bg-ORANGE',
    'bg-PINK',
    'bg-PURPLE',
    'bg-RED',
    'bg-WHITE',
    'bg-YELLOW',
  ],
  theme: {
    extend: {
      colors: {
        'gray': '#293341',
        'red-custom': '#c91f28',
        'gray-custom': '#333',
        'blue-custom': '#2f9ee2',
        'white-rgba': 'rgba(255,255,255,0.95)',
        'gray98': '#fafafa',
        'eclipse': '#3a3a3a',
        'grey': '#7e7e7e',
        'honeydew': '#f3f6f3',
        'light-gray': '#dddddd',
        'gray15': '#262626',
        'BLACK': '#000',
        'WHITE': '#fff',
        'BLUE': '#1790c8',
        'BROWN': '#825d41',
        'GREEN': '#7bba3c',
        'GREY': '#808080',
        'ORANGE': '#f36b26',
        'PINK': '#f0728f',
        'PURPLE': '#8d429f',
        'RED': '#e7352b',
        'YELLOW': '#fed533'
      },
      flexGrow: {
        1: '1',
        2: '2'
      },
    },
  },
  plugins: [],
}

