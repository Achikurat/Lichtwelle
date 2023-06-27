import { inputAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

const baseStyle = definePartsStyle({
  field: {
    p: "6",
    bg: "bg.dark",
    border: "1px solid",
    borderColor: "bg.mid",
    color: "text",
    outline: "none !important",
    _focus: {
      outline: "1px solid !important",
      outlineColor: "primary !important",
    },
  },
});

export const inputTheme = defineMultiStyleConfig({ baseStyle });
