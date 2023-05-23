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
