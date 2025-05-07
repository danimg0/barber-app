import Colors from './constants/Colors';

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        'light-primary': Colors.light.primary,
        'light-secondary': Colors.light.secondary,
        'light-tertiary': Colors.light.tertiary,
        'light-background': Colors.light.background,
        'light-text': Colors.light.text,
        'dark-primary': Colors.dark.primary,
        'dark-secondary': Colors.dark.secondary,
        'dark-tertiary': Colors.dark.tertiary,
        'dark-background': Colors.dark.background,
        'dark-text': Colors.dark.text,
      },
      fontFamily: {
        'rye': ['Rye', 'sans-serif'],
        'merriweather': ['Merriweather', 'sans-serif'],
      }
      // fontFamily: {
      //   'works-light': ['WorkSans-Light', 'sans-serif'],
      //   'works-medium': ['WorkSans-Medium', 'sans-serif'],
      //   'works-black': ['WorkSans-Black', 'sans-serif']
      // }
    },
  },
  plugins: [],
}