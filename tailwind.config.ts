import type { Config } from "tailwindcss";
/** @type {import('tailwindcss').Config} */

const config = {
  mode: "jit",
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    colors: {
      primary: {
        100: "#CAEFFD",
        200: "#96DBFB",
        300: "#61BEF4",
        400: "#3AA0EA",
        500: "#0074DC",
        600: "#0059BD",
        700: "#00429E",
        800: "#002F7F",
        900: "#002169",
      },
      secondary: {
        100: "#EDFDDE",
        200: "#D6FBBE",
        300: "#B8F59B",
        400: "#9AEC7F",
        500: "#6EE057", // Success
        600: "#4BC03F",
        700: "#2DA12B",
        800: "#1B8122",
        900: "#106B1D",
      },
      neutral: {
        100: "#FAFAFA",
        200: "#F4F4F4",
        300: "#EBEBEB",
        400: "#D4D4D4",
        500: "#919191",
        600: "#5F5F5F",
        700: "#484848",
        800: "#373737",
        900: "#070707",
      },
      positive: {
        100: "#F1FBD7",
        200: "#DFF8B1",
        300: "#C3EC86",
        400: "#A5D964",
        500: "#7CC136",
        600: "#60A527",
        700: "#488A1B",
        800: "#326F11",
        900: "#235C0A",
      },
      warning: {
        100: "#FEFBD7",
        200: "#FDF7B0",
        300: "#F9EF88",
        400: "#F3E569",
        500: "#ECD83A",
        600: "#CAB72A",
        700: "#A9961D",
        800: "#887712",
        900: "#71610B",
      },
      info: {
        100: "#DEE2FE",
        200: "#BDC6FE",
        300: "#9CA8FE",
        400: "#8391FD",
        500: "#5A6BFC",
        600: "#414FD8",
        700: "#2D38B5",
        800: "#1C2592",
        900: "#111778",
      },
      danger: {
        100: "#FCE2CC",
        200: "#FABF9B",
        300: "#F09168",
        400: "#E16642",
        500: "#CE290C",
        600: "#B11408",
        700: "#940606",
        800: "#77030D",
        900: "#620211",
      },
      support: {
        1: "#ED7BCD",
        2: "#E9B971",
        3: "#7AD4E0",
        4: "#7E9AE5",
        5: "#AE78E3",
      },
      white: "#FFFFFF",
      black: "#000000",
    },
    fontSize: {
      heading: ["40px", { lineHeight: "60px", fontWeight: "600" }],
      display: ["48px", { lineHeight: "56px", fontWeight: "700" }],
      "extra-large": ["40px", { lineHeight: "48px", fontWeight: "700" }],
      large: ["32px", { lineHeight: "40px", fontWeight: "700" }],
      medium: ["24px", { lineHeight: "32px", fontWeight: "700" }],
      small: ["20px", { lineHeight: "28px", fontWeight: "700" }],

      // TITLE (32px, 24px, 20px)
      "title-large": ["32px", { lineHeight: "40px", fontWeight: "500" }],
      "title-medium": ["24px", { lineHeight: "32px", fontWeight: "600" }],
      "title-small": ["20px", { lineHeight: "28px", fontWeight: "600" }],

      // SUBTITLE (24px, 20px, 16px)
      "subtitle-large": ["24px", { lineHeight: "32px", fontWeight: "500" }],
      "subtitle-medium": ["20px", { lineHeight: "28px", fontWeight: "500" }],
      "subtitle-small": ["16px", { lineHeight: "24px", fontWeight: "500" }],

      // BODY (16px, 14px)
      "body-medium-regular": [
        "16px",
        { lineHeight: "24px", fontWeight: "400" },
      ],
      "body-medium-semibold": [
        "16px",
        { lineHeight: "24px", fontWeight: "600" },
      ],
      "body-small-regular": ["14px", { lineHeight: "20px", fontWeight: "400" }],
      "body-small-semibold": [
        "14px",
        { lineHeight: "20px", fontWeight: "600" },
      ],

      // LINK (24px, 16px, 14px)
      "link-large": ["24px", { lineHeight: "32px", fontWeight: "500" }],
      "link-medium": ["16px", { lineHeight: "24px", fontWeight: "500" }],
      "link-small": ["14px", { lineHeight: "20px", fontWeight: "500" }],

      // CAPTION (12px)
      "caption-regular": ["12px", { lineHeight: "16px", fontWeight: "400" }],
      "caption-bold": ["12px", { lineHeight: "16px", fontWeight: "700" }],
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        spotlight: {
          "0%": {
            opacity: "0",
            transform: "translate(-72%, -62%) scale(0.5)",
          },
          "100%": {
            opacity: "1",
            transform: "translate(-50%,-40%) scale(1)",
          },
        },
        shimmer: {
          from: {
            backgroundPosition: "0 0",
          },
          to: {
            backgroundPosition: "-200% 0",
          },
        },
        moveHorizontal: {
          "0%": {
            transform: "translateX(-50%) translateY(-10%)",
          },
          "50%": {
            transform: "translateX(50%) translateY(10%)",
          },
          "100%": {
            transform: "translateX(-50%) translateY(-10%)",
          },
        },
        moveInCircle: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "50%": {
            transform: "rotate(180deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        moveVertical: {
          "0%": {
            transform: "translateY(-50%)",
          },
          "50%": {
            transform: "translateY(50%)",
          },
          "100%": {
            transform: "translateY(-50%)",
          },
        },
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        spotlight: "spotlight 2s ease .75s 1 forwards",
        shimmer: "shimmer 2s linear infinite",
        first: "moveVertical 30s ease infinite",
        second: "moveInCircle 20s reverse infinite",
        third: "moveInCircle 40s linear infinite",
        fourth: "moveHorizontal 40s ease infinite",
        fifth: "moveInCircle 20s ease infinite",
        scroll:
          "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
