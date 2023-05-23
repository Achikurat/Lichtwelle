import { menuAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(menuAnatomy.keys);

// define the base component styles
const baseStyle = definePartsStyle({
  list: {
    py: "4",
    borderRadius: "md",
    border: "none",
    bg: "darkBackground",
    width: "400px !important",
    mx: "auto !important",
  },
  item: {
    bg: "darkBackground",
    color: "text",
    _hover: {
      color: "accent",
    },
    _focus: {
      color: "accent",
    },
  },
  groupTitle: {
    textTransform: "uppercase",
    color: "white",
    textAlign: "center",
    letterSpacing: "wider",
    opacity: "0.7",
  },
});
export const menuTheme = defineMultiStyleConfig({ baseStyle });
