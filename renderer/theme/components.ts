import { defineStyleConfig } from "@chakra-ui/react";

export const Button = defineStyleConfig({
  baseStyle: {
    borderRadius: "lg",
    padding: "6",
    color: "text",
    fontSize: "md",
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

export const FormLabel = defineStyleConfig({
  baseStyle: {
    color: "text",
  },
});

export const Divider = defineStyleConfig({
  baseStyle: {
    borderColor: "text",
  },
});
