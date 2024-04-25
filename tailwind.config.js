/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      textColor: {
        skin: {
          base: "var(--text-color)",
          selectText: "var(--select-text)",
        },
      },
      backgroundColor: {
        skin: {
          fill: "var(--fill-color)",
          dateSelectBackground: "var(--date-select-background)",
          mainSelectBackground: "var(--main-select-background)",
        },
      },
      gradientColorStops: {
        skin: {
          hue: "var(--fill-color)",
        },
      },

      colors: {
        backg: "var(--backg)",
        activeNav: "var(--activeNav)",
        activeNavText: "var(--activeNavText)",
        nonActiveNav: "var(--nonActiveNav)",
        nonActiveNavText: "var(--nonActiveNavText)",
        filter: "var(--filter)",
        filterBorder: "var(--filterBorder)",
        compareBg: "var(--compareBg)",
        mainText: "var(--mainText)",
        icon : "var(--icon)",
        mainBorder : "var(--mainBorder)",
        chartBg : "var(--chartBg)",
        chartBorder : "var(--chartBorder)",

        //
        current: "var(--fill-color)",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        backgroundDefault: " #FFFFFF",
        backgroundGreen: "linear-gradient(180deg, #163329 0%, #2B4D46 133.01%)",
        backgroundBlue: " linear-gradient(180deg, #091635 0%, #00416C 88.17%, #0066A0 134.57%)",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
