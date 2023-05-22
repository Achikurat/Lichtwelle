import { extendTheme } from "@chakra-ui/react";
import { Button } from "./components";

const theme = extendTheme({
  semanticTokens: {
    colors: {
      background: "gray.700",
      darkBackground: "gray.800",
      accent: "teal.200",
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
  components: {
    Button,
  },
});

export default theme;
