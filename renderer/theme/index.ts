import { extendTheme } from "@chakra-ui/react";
import { Button, Divider, FormLabel, Input } from "./components";
import { modalTheme } from "./multiComponents/modal";
import { menuTheme } from "./multiComponents/menu";

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
    Modal: modalTheme,
    Input,
    FormLabel,
    Menu: menuTheme,
    Divider,
  },
});

export default theme;
