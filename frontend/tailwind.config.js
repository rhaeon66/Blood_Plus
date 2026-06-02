/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary Red System
        primary: '#DC2626',
        'primary-dark': '#B91C1C',
        'primary-light': '#EF4444',
        'primary-lighter': '#F87171',
        
        // Secondary Colors
        secondary: '#0F172A',
        'secondary-light': '#475569',
        
        // Background
        'bg-primary': '#FAFAFA',
        'card-bg': '#FFFFFF',
        
        // Borders & Accents
        border: '#E2E8F0',
        'success': '#16A34A',
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      fontSize: {
        'display-lg': ['56px', { lineHeight: '1.1', fontWeight: '700' }],
        'display-md': ['48px', { lineHeight: '1.15', fontWeight: '700' }],
        'heading-lg': ['36px', { lineHeight: '1.2', fontWeight: '700' }],
        'heading-md': ['28px', { lineHeight: '1.25', fontWeight: '700' }],
        'heading-sm': ['24px', { lineHeight: '1.3', fontWeight: '700' }],
      },
      spacing: {
        '4xs': '2px',
        '3xs': '4px',
        '2xs': '8px',
        'xs': '16px',
        'sm': '24px',
        'md': '32px',
        'lg': '48px',
        'xl': '64px',
        '2xl': '80px',
      },
      borderRadius: {
        'card': '16px',
        'button': '12px',
        'input': '12px',
      },
      boxShadow: {
        'soft': '0 4px 6px rgba(0, 0, 0, 0.07)',
        'md': '0 8px 16px rgba(0, 0, 0, 0.1)',
        'lg': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'xl': '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
        'red-glow': '0 20px 25px -5px rgba(220, 38, 38, 0.1)',
        'red-glow-lg': '0 25px 50px -12px rgba(220, 38, 38, 0.15)',
      },
      backgroundImage: {
        'gradient-red': 'linear-gradient(135deg, #DC2626 0%, #EF4444 50%, #F87171 100%)',
        'gradient-red-light': 'linear-gradient(135deg, rgba(220, 38, 38, 0.1) 0%, rgba(239, 68, 68, 0.05) 100%)',
        'gradient-hero': 'linear-gradient(135deg, rgba(220, 38, 38, 0.05) 0%, rgba(239, 68, 68, 0.02) 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in-down': 'fadeInDown 0.6s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
        'hover-lift': 'hoverLift 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        hoverLift: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-8px)' },
        },
      },
      transitionDuration: {
        'ultra-fast': '100ms',
        'fast': '200ms',
        'base': '300ms',
        'slow': '500ms',
      },
    },
  },
  plugins: [],
};
