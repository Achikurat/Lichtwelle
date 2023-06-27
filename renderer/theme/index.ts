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
      psg: "linear-gradient(45deg, rgba(3,169,244,1) 0%, rgba(2,136,209,1) 100%);",
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
      tag: {
        purple: "#553E57",
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
    Tag: tagTheme,
    Divider,
  },
});

export default theme;
