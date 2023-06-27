import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
import { modalAnatomy as modalParts } from "@chakra-ui/anatomy";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(modalParts.keys);

const baseStyle = definePartsStyle({
  dialog: {
    bg: "bg.dark",
    color: "text",
  },
  header: {
    color: "text",
  },
  closeButton: {
    borderRadius: "25px",
    padding: "6",
    color: "text",
    fontSize: "sm",
    boxSizing: "border-box !important",
    border: "1px solid",
    borderColor: "bg.mid",
    _active: {
      bgGradient: "linear(to-r, primary, secondary)",
      color: "bg.dark",
      borderColor: "transparent",
    },
    _hover: { color: "primary", borderColor: "primary" },
  },
});

export const modalTheme = defineMultiStyleConfig({
  baseStyle,
});
