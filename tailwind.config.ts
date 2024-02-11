import { type Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

export default {
  darkMode: ['class'],
  content: ['./**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        lg: '4rem',
      },
      screens: {
        '2xl': '1980px',
      },
    },
    colors: {
      border: 'hsl(var(--border))',
      input: 'hsl(var(--input))',
      ring: 'hsl(var(--ring))',
      background: 'hsl(var(--background))',
      foreground: 'hsl(var(--foreground))',
      primary: {
        DEFAULT: 'hsl(var(--primary))',
        foreground: 'hsl(var(--primary-foreground))',
      },
      secondary: {
        DEFAULT: 'hsl(var(--secondary))',
        foreground: 'hsl(var(--secondary-foreground))',
      },
      destructive: {
        DEFAULT: 'hsl(var(--destructive))',
        foreground: 'hsl(var(--destructive-foreground))',
      },
      muted: {
        DEFAULT: 'hsl(var(--muted))',
        foreground: 'hsl(var(--muted-foreground))',
      },
      accent: {
        DEFAULT: 'hsl(var(--accent))',
        foreground: 'hsl(var(--accent-foreground))',
      },
      popover: {
        DEFAULT: 'hsl(var(--popover))',
        foreground: 'hsl(var(--popover-foreground))',
      },
      card: {
        DEFAULT: 'hsl(var(--card))',
        foreground: 'hsl(var(--card-foreground))',
      },
      white: {
        DEFAULT: 'hsl(var(--white))',
      },
      black: {
        DEFAULT: 'hsl(var(--black))',
      },
      bgAccent: {
        DEFAULT: 'hsl(var(--bgAccent))',
      },
      gray100: {
        DEFAULT: 'hsl(var(--gray100))',
      },
      gray200: {
        DEFAULT: 'hsl(var(--gray200))',
      },
      gray300: {
        DEFAULT: 'hsl(var(--gray300))',
      },
      gray400: {
        DEFAULT: 'hsl(var(--gray400))',
      },
      gray500: {
        DEFAULT: 'hsl(var(--gray500))',
      },
      gray600: {
        DEFAULT: 'hsl(var(--gray600))',
      },
      gray700: {
        DEFAULT: 'hsl(var(--gray700))',
      },
      gray900: {
        DEFAULT: 'hsl(var(--gray900))',
      },
      blue100: {
        DEFAULT: 'hsl(var(--blue100))',
      },
      blue300: {
        DEFAULT: 'hsl(var(--blue300))',
      },
      blue500: {
        DEFAULT: 'hsl(var(--blue500))',
      },
      blue700: {
        DEFAULT: 'hsl(var(--blue700))',
      },
      blue900: {
        DEFAULT: 'hsl(var(--blue900))',
      },
      orange100: {
        DEFAULT: 'hsl(var(--orange100))',
      },
      orange300: {
        DEFAULT: 'hsl(var(--orange300))',
      },
      orange500: {
        DEFAULT: 'hsl(var(--orange500))',
      },
      orange700: {
        DEFAULT: 'hsl(var(--orange700))',
      },
      orange900: {
        DEFAULT: 'hsl(var(--orange900))',
      },
      green100: {
        DEFAULT: 'hsl(var(--green100))',
      },
      green300: {
        DEFAULT: 'hsl(var(--green300))',
      },
      green500: {
        DEFAULT: 'hsl(var(--green500))',
      },
      green700: {
        DEFAULT: 'hsl(var(--green700))',
      },
      green900: {
        DEFAULT: 'hsl(var(--green900))',
      },
      yellow100: {
        DEFAULT: 'hsl(var(--yellow100))',
      },
      yellow300: {
        DEFAULT: 'hsl(var(--yellow300))',
      },
      yellow500: {
        DEFAULT: 'hsl(var(--yellow500))',
      },
      yellow700: {
        DEFAULT: 'hsl(var(--yellow700))',
      },
      yellow900: {
        DEFAULT: 'hsl(var(--yellow900))',
      },
      red100: {
        DEFAULT: 'hsl(var(--red100))',
      },
      red300: {
        DEFAULT: 'hsl(var(--red300))',
      },
      red500: {
        DEFAULT: 'hsl(var(--red500))',
      },
      red700: {
        DEFAULT: 'hsl(var(--red700))',
      },
      red900: {
        DEFAULT: 'hsl(var(--red900))',
      },
      warning: {
        DEFAULT: 'hsl(var(--warning))',
        foreground: 'hsl(var(--black))',
      },
      success: {
        DEFAULT: 'hsl(var(--success))',
        foreground: 'hsl(var(--black))',
      },
      info: {
        DEFAULT: 'hsl(var(--info))',
        foreground: 'hsl(var(--black))',
      },
      alert: {
        DEFAULT: 'hsl(var(--alert))',
        foreground: 'hsl(var(--black))',
      },
      error: {
        DEFAULT: 'hsl(var(--error))',
        foreground: 'hsl(var(--black))',
      },
    },
    extend: {
      boxShadow: {
        default: 'var(--shadow)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'tabContent-right': {
          from: { translate: '-500', opacity: '0' },
          to: { translate: '0', opacity: '100' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'tabContent-right': 'tabContent-right 0.5s ease-in-out',
      },
    },
    letterSpacing: {
      xs: '0.4px',
      sm: '0.25px',
      md: '0.5px',
      lg: '0.15px',
      xl: '0px',
      '2xl': '0.25px',
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
  ],
} satisfies Config
