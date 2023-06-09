import { popoverAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);
const baseStyle = definePartsStyle({
  body: {
    bg: "bg.dark",
    p: "6",
    borderColor: "bg.mid !important",
  },
  content: {
    bg: "bg.dark !imporant",
    boxShadow: "xl",
    scrollbars: "none",
  },
  arrow: {
    color: "primary",
  },
  popper: { color: "bg.mid", border: "none !important" },
});
export const popoverTheme = defineMultiStyleConfig({ baseStyle });
