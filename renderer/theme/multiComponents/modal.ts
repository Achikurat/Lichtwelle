import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
import { modalAnatomy as modalParts } from "@chakra-ui/anatomy";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(modalParts.keys);

const baseStyle = definePartsStyle({
  dialog: {
    bg: "background", //change the background
    color: "text",
  },
  header: {
    color: "accent",
  },
  closeButton: {
    borderRadius: "md",
    padding: "3",
    backgroundColor: "darkBackground !important",
    color: "accent",
    fontSize: "md",
    boxSizing: "border-box !important",
    border: "3px solid transparent",
    _active: { color: "darkBackground", backgroundColor: "accent !important" },
    _hover: { borderTopColor: "accent" },
  },
});

export const modalTheme = defineMultiStyleConfig({
  baseStyle,
});
