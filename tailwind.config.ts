import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0F172A',
        green: '#059669',
        cream: '#F8FAFC',
      },
      boxShadow: {
        soft: '0 20px 45px rgba(15, 23, 42, 0.12)',
      },
    },
  },
  plugins: [],
} satisfies Config;
