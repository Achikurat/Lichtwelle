import { extendTheme } from "@chakra-ui/react";
import { Button, Divider, FormLabel } from "./components";
import { modalTheme } from "./multiComponents/modal";
import { menuTheme } from "./multiComponents/menu";
import { popoverTheme } from "./multiComponents/popover";
import { inputTheme } from "./multiComponents/input";
import { tagTheme } from "./multiComponents/tag";

const theme = extendTheme({
  fonts: {
    heading: "GeneralSans, sans-serif",
    body: "GeneralSans, sans-serif",
    mono: "Menlo, monospace",
  },
  semanticTokens: {
    colors: {
      primary: "#03A9F4",
      secondary: "#0288D1",
      bg: {
        dark: "#2e2e3e",
        mid: "#49495f",
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
        w: "100vw",
        h: "100vh",
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
    Tag: tagTheme,
    Divider,
  },
});

export default theme;
