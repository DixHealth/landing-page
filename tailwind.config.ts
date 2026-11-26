import type { Config } from "tailwindcss";

/**
 * Tokens do design system Omni (DIXHealth).
 * Fonte: artefato "Omni" (project/tokens.json), marca padrão `omni`.
 *
 * - Escalas fixas (`primary-*`, `secondary-*`, `neutral-*`, status): valores do Omni.
 * - Cores semânticas (`bg`, `surface`, `fg`, `accent`, `cta`…): variáveis CSS
 *   definidas em `globals.css`. O tema claro é a Opção 1 (Omni puro) e o
 *   escuro é a Opção 3 (híbrido). Componentes usam só as semânticas, então
 *   a troca de tema não exige mudar nenhum componente.
 */
const semantic = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config = {
  // `dark:` vale para os dois temas escuros: híbrido (.dark) e vídeos (.video)
  darkMode: ["variant", [".dark &", ".video &"]],
  content: ["./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1280px" },
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#FFFFFF",
      black: "#000000",

      primary: {
        100: "#CCF9F5",
        200: "#9BF4F1",
        300: "#65D8DE",
        400: "#3CADBD",
        500: "#0E7791",
        600: "#0A5D7C",
        700: "#074668",
        800: "#043254",
        900: "#022445",
      },
      secondary: {
        100: "#D1FDDF",
        200: "#A5FCC8",
        300: "#76F6B7",
        400: "#53ECB0",
        500: "#1FE1A7",
        600: "#16C19F",
        700: "#0FA292",
        800: "#098281",
        900: "#05626C",
      },
      neutral: {
        50: "#FCFCFC",
        100: "#F8F8F8",
        200: "#EEF0F0",
        300: "#E3E5E5",
        400: "#BFBFBF",
        500: "#999D9F",
        600: "#6C7477",
        700: "#585F64",
        800: "#40464A",
        900: "#292A2B",
      },
      dark: { 400: "#42424A", 500: "#344767", 600: "#191919" },
      positive: {
        100: "#F1FBD7", 200: "#DFF8B1", 300: "#C3EC86", 400: "#A5D964", 500: "#7CC136",
        600: "#60A527", 700: "#488A1B", 800: "#326F11", 900: "#235C0A",
      },
      warning: {
        100: "#FEFBD7", 200: "#FDF7B0", 300: "#F9EF88", 400: "#F3E569", 500: "#ECD83A",
        600: "#CAB72A", 700: "#A9961D", 800: "#887712", 900: "#71610B",
      },
      info: {
        100: "#DEE2FE", 200: "#BDC6FE", 300: "#9CA8FE", 400: "#8391FD", 500: "#5A6BFC",
        600: "#414FD8", 700: "#2D38B5", 800: "#1C2592", 900: "#111778",
      },
      danger: {
        100: "#FCE2CC", 200: "#FABF9B", 300: "#F09168", 400: "#E16642", 500: "#CE290C",
        600: "#B11408", 700: "#940606", 800: "#77030D", 900: "#620211",
      },
      support: { 1: "#ED7BCD", 2: "#E9B971", 3: "#7AD4E0", 4: "#7E9AE5", 5: "#AE78E3" },

      // Semânticas (trocam com o tema)
      bg: { DEFAULT: semantic("bg"), subtle: semantic("bg-subtle") },
      surface: { DEFAULT: semantic("surface"), raised: semantic("surface-raised") },
      fg: {
        DEFAULT: semantic("fg"),
        muted: semantic("fg-muted"),
        subtle: semantic("fg-subtle"),
      },
      border: { DEFAULT: semantic("border"), strong: semantic("border-strong") },
      accent: { DEFAULT: semantic("accent"), soft: semantic("accent-soft") },
      cta: {
        DEFAULT: semantic("cta"),
        hover: semantic("cta-hover"),
        fg: semantic("cta-fg"),
      },
      ring: semantic("ring"),
      field: semantic("field"),
    },
    fontFamily: {
      sans: ["var(--font-lato)", "Lato", "sans-serif"],
      // Títulos dos vídeos da DIX / OMNIX
      display: ["var(--font-figtree)", "Figtree", "sans-serif"],
    },
    fontSize: {
      // HEADING (Bold 700)
      heading: ["56px", { lineHeight: "64px", fontWeight: "700" }],
      display: ["48px", { lineHeight: "56px", fontWeight: "700" }],
      "extra-large": ["40px", { lineHeight: "48px", fontWeight: "700" }],
      large: ["32px", { lineHeight: "40px", fontWeight: "700" }],
      medium: ["24px", { lineHeight: "32px", fontWeight: "700" }],
      small: ["20px", { lineHeight: "28px", fontWeight: "700" }],
      // TITLE (SemiBold 600)
      "title-large": ["32px", { lineHeight: "40px", fontWeight: "600" }],
      "title-medium": ["24px", { lineHeight: "32px", fontWeight: "600" }],
      "title-small": ["20px", { lineHeight: "28px", fontWeight: "600" }],
      // SUBTITLE (Medium 500)
      "subtitle-large": ["24px", { lineHeight: "32px", fontWeight: "500" }],
      "subtitle-medium": ["20px", { lineHeight: "28px", fontWeight: "500" }],
      "subtitle-small": ["16px", { lineHeight: "24px", fontWeight: "500" }],
      // BODY
      "body-medium-regular": ["16px", { lineHeight: "24px", fontWeight: "400" }],
      "body-medium-semibold": ["16px", { lineHeight: "24px", fontWeight: "600" }],
      "body-small-regular": ["14px", { lineHeight: "20px", fontWeight: "400" }],
      "body-small-semibold": ["14px", { lineHeight: "20px", fontWeight: "600" }],
      // LINK (Medium 500)
      "link-large": ["24px", { lineHeight: "32px", fontWeight: "500" }],
      "link-medium": ["16px", { lineHeight: "24px", fontWeight: "500" }],
      "link-small": ["14px", { lineHeight: "20px", fontWeight: "500" }],
      // CAPTION
      "caption-regular": ["12px", { lineHeight: "16px", fontWeight: "400" }],
      "caption-bold": ["12px", { lineHeight: "16px", fontWeight: "700" }],
      // Escala utilitária (shadcn usa text-sm / text-base)
      xs: ["12px", "16px"],
      sm: ["14px", "20px"],
      base: ["16px", "24px"],
      lg: ["18px", "28px"],
      // Destaque de marketing (hero) — fora da escala do produto
      hero: ["72px", { lineHeight: "80px", fontWeight: "700", letterSpacing: "-0.02em" }],
    },
    borderRadius: {
      none: "0",
      sm: "calc(var(--radius) - 4px)",
      md: "calc(var(--radius) - 2px)",
      lg: "var(--radius)",
      xl: "calc(var(--radius) + 4px)",
      full: "9999px",
    },
    extend: {
      boxShadow: {
        omni: "0 2px 5px rgba(0,0,0,0.1)",
        menu: "0px 2px 10px rgba(0,0,0,0.08)",
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
} satisfies Config;

export default config;
