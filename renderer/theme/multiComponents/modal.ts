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
    color: "primary",
  },
  closeButton: {
    borderRadius: "md",
    padding: "3",
    backgroundColor: "bg.mid !important",
    color: "primary",
    fontSize: "md",
    boxSizing: "border-box !important",
    border: "3px solid transparent",
    _active: { color: "bg.dark", backgroundColor: "primary !important" },
    _hover: { color: "secondary" },
  },
});

export const modalTheme = defineMultiStyleConfig({
  baseStyle,
});
