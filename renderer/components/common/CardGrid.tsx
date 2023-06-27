import { Button, HStack } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { BsPlusLg } from "react-icons/bs";

type Props = {
  children?: ReactNode;
  cardAddAction: () => void;
};

export default function CardGrid({ children, cardAddAction }: Props) {
  return (
    <HStack
      p="5"
      justifyContent="flex-start"
      alignItems="flex-start"
      overflowX="auto"
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
      <Button
        onClick={cardAddAction}
        variant="custom"
        position="absolute"
        flexShrink="0"
        background="transparent"
        top="100px"
        right="20px"
        h="50px"
      >
        <BsPlusLg /> Add Fixtures
      </Button>
    </HStack>
  );
}
