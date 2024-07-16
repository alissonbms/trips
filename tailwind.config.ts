import type { Config } from "tailwindcss";
const flowbite = require("flowbite-react/tailwind");

const config: Config = {
  content: [
    flowbite.content(),
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: { "search-background": "url(/world-map.png)" },
      colors: {
        primary: "rgb(0, 177, 106)",
        primaryLighter: "#DDD5EA",
        primaryDarker: "#312A4F",
        grayPrimary: "#717171",
        grayLighter: "#BBBFBF",
        walterWhite: "#F5F5F5",
        greenSecond: "rgb(30, 130, 76)",
      },
      textColor: {
        dark: "#717171",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
export default config;
