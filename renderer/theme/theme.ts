import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  semanticTokens: {
    colors: {
      background: "gray.700",
      accent: "green.200",
      text: "gray.50",
    },
  },
  styles: {
    global: () => ({
      body: {
        bg: "background",
      },
    }),
  },
});
