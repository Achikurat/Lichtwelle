import { Box, Button, HStack } from "@chakra-ui/react";
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
      flexWrap="wrap"
      justifyContent="flexStart"
      alignItems="flex-start"
      alignContent="flex-start"
    >
      {children}
      <Button
        onClick={cardAddAction}
        background="transparent"
        border="2px dashed"
        borderColor="background"
        color="background"
        w="300px"
        h="150px"
        _hover={{
          borderColor: "accent",
          color: "accent",
        }}
        _active={{
          color: "darkBackground",
          backgroundColor: "accent !important",
        }}
      >
        <BsPlusLg size="30px" />
      </Button>
    </HStack>
  );
}
