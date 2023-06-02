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
        flexShrink="0"
        background="transparent"
        border="2px dashed"
        borderColor="bg.dark"
        color="bg.dark"
        w="300px"
        h="150px"
        _hover={{
          borderColor: "primary",
          color: "primary",
        }}
        _active={{
          color: "bg.dark",
          backgroundColor: "primary !important",
        }}
      >
        <BsPlusLg size="30px" />
      </Button>
    </HStack>
  );
}
