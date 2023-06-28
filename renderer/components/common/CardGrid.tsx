import { Box, Button, HStack } from "@chakra-ui/react";
import React, { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

export default function CardGrid({ children }: Props) {
  return (
    <Box
      h="100%"
      w="100%"
      p="1"
      boxSizing="border-box"
      overflowY="auto"
      columnGap="3"
      rowGap="3"
      sx={{
        "&::-webkit-scrollbar": {
          h: "10px",
          borderRadius: "md",
        },
        "&::-webkit-scrollbar-track": {
          h: "10px",
          bg: "bg.dark",
          borderRadius: "md",
        },
        "&::-webkit-scrollbar-thumb": {
          borderRadius: "md",
          bg: "primary",
        },
      }}
    >
      {children}
    </Box>
  );
}
