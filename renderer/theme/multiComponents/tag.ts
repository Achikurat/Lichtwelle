import { tagAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tagAnatomy.keys);

const baseStyle = definePartsStyle({
  container: {
    bgGradient: "linear(to-r, primary, secondary)",
    color: "bg.dark",
  },
});

export const tagTheme = defineMultiStyleConfig({ baseStyle });
