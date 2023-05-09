import { defineStyleConfig } from '@chakra-ui/react'

export const Button = defineStyleConfig({
  baseStyle: {
    borderRadius: 'md',
    padding: "6",
    backgroundColor: "darkBackground !important",
    color: "accent",
    fontSize: "md",
    boxSizing: "border-box !important",
    border: "3px solid transparent",
    _active: {color: "darkBackground", backgroundColor: "accent !important"},
    _hover: { borderTopColor: "accent" },
  },
})