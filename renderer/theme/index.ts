import { extendTheme } from "@chakra-ui/react";
import { Button } from "./components";

const theme = extendTheme({
  semanticTokens: {
    colors: {
      background: "#323232",
      darkBackground: "#212121",
      accent: "#ECA869",
      text: "#EEEEEE",
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
