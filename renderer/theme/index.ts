import { extendTheme } from "@chakra-ui/react";
import { Button, Divider, FormLabel } from "./components";
import { modalTheme } from "./multiComponents/modal";
import { menuTheme } from "./multiComponents/menu";
import { popoverTheme } from "./multiComponents/popover";
import { inputTheme } from "./multiComponents/input";

const theme = extendTheme({
  fonts: {
    heading: "Gambetta, serif",
    body: "GeneralSans, sans-serif",
    mono: "Menlo, monospace",
  },
  semanticTokens: {
    colors: {
      primary: "#DE8449",
      secondary: "#EBB142",
      bg: {
        dark: "#2b2a33",
        mid: "#363440",
        light: "#6B6980",
      },
      text: "#C3C8D9",
      system: {
        ok: "#00C853",
        warn: "#FFD300",
        error: "#F54436",
      },
    },
  },
  styles: {
    global: () => ({
      body: {
        bg: "bg.dark",
      },
    }),
  },
  components: {
    Button,
    Modal: modalTheme,
    Input: inputTheme,
    FormLabel,
    Menu: menuTheme,
    Popover: popoverTheme,
    Divider,
  },
});

export default theme;
