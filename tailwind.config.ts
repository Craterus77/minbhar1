import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bone: "#F5F0E8",
        travertine: "#E8E0D4",
        walnut: "#5C4033",
        charcoal: "#2A2A28",
        bronze: "#8B7355",
        olive: "#4A5240",
        ink: "#1C1C1A",
        mist: "#D4CEC4",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        hero: ["var(--font-hero)"],
      },
      fontSize: {
        "display-hero": [
          "clamp(3.25rem, 11vw, 10.5rem)",
          { lineHeight: "0.9", letterSpacing: "-0.03em" },
        ],
        "display-xl": ["clamp(3.5rem,8vw,7.5rem)", { lineHeight: "0.95", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.5rem,5vw,5rem)", { lineHeight: "1", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(1.75rem,3vw,3rem)", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
      },
      spacing: {
        section: "clamp(5rem,12vh,10rem)",
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      animation: {
        "fade-in": "fadeIn 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "slide-up": "slideUp 1s cubic-bezier(0.22, 1, 0.36, 1) forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
