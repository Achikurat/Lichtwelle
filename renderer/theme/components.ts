import { defineStyleConfig } from "@chakra-ui/react";

export const Button = defineStyleConfig({
  baseStyle: {
    borderRadius: "md",
    padding: "6",
    backgroundColor: "bg.mid !important",
    color: "primary",
    fontSize: "md",
    boxSizing: "border-box !important",
    border: "3px solid transparent",
    _active: { color: "bg.dark", backgroundColor: "primary !important" },
    _hover: { color: "secondary" },
  },
});

export const FormLabel = defineStyleConfig({
  baseStyle: {
    color: "text",
  },
});

export const Input = defineStyleConfig({
  baseStyle: {
    borderColor: "primary",
  },
});

export const Divider = defineStyleConfig({
  baseStyle: {
    borderColor: "primary",
  },
});
