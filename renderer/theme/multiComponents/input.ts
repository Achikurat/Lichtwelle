import { inputAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

const baseStyle = definePartsStyle({
  field: {
    p: "6",
    bg: "bg.mid",
    color: "text",
  },
});

export const inputTheme = defineMultiStyleConfig({ baseStyle });
