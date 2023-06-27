import { Box, Button, HStack } from "@chakra-ui/react";
import React, { ReactNode, useMemo } from "react";
import { BsPlusLg } from "react-icons/bs";
import { useSessionStore } from "../../common/store/sessionStore";

type Props = {
  children?: ReactNode;
  cardAddAction: () => void;
};

export default function CardGrid({ children, cardAddAction }: Props) {
  return (
    <HStack
      p="5"
      justifyContent="flexStart"
      alignItems="flex-start"
      alignContent="flex-start"
      overflowX="auto"
      sx={{
        "&::-webkit-scrollbar": {
          h: "10px",
          borderRadius: "md",
        },
        "&::-webkit-scrollbar-track": {
          h: "10px",
          bg: "bg.mid",
          borderRadius: "md",
        },
        "&::-webkit-scrollbar-thumb": {
          borderRadius: "md",
          bg: "bg.dark",
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
