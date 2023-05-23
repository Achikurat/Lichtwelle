import { extendTheme } from "@chakra-ui/react";
import { Button, Divider, FormLabel, Input } from "./components";
import { modalTheme } from "./multiComponents/modal";
import { menuTheme } from "./multiComponents/menu";
import { MiddlewareNotFoundError } from "next/dist/shared/lib/utils";

const theme = extendTheme({
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
    Input,
    FormLabel,
    Menu: menuTheme,
    Divider,
  },
});

export default theme;
