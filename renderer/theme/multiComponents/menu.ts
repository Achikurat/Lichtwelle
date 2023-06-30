import { menuAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(menuAnatomy.keys);

// define the base component styles
const baseStyle = definePartsStyle({
  list: {
    py: "4",
    borderRadius: "lg",
    border: "none",
    boxShadow: "2xl",
    bg: "bg.dark",
  },
  item: {
    bg: "bg.dark",
    color: "text",
    _hover: {
      bgGradient: "linear(to-r, primary, secondary)",
      color: "bg.dark",
    },
    _active: {
      bg: "bg.dark",
      color: "primary",
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
