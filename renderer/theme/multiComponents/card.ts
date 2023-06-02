import { cardAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys);

const baseStyle = definePartsStyle({
  // define the part you're going to style
  container: {
    bg: "bg.dark",
    p: "3",
    border: "none",
    borderRadius: "20px !important",
  },
  header: {
    color: "primary",
  },
});

const sizes = {
  md: definePartsStyle({
    container: {
      borderRadius: "0px",
    },
  }),
};

export const cardTheme = defineMultiStyleConfig({ baseStyle, sizes });
