import { HStack, Tag, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { Fixture } from "../../../lib/types";

type Props = {
  fixture: Fixture;
};

export default function FixtureCard({ fixture }: Props) {
  return (
    <VStack
      w="200px"
      h="150px"
      border="1px solid"
      borderColor="bg.mid"
      borderRadius="50px"
      display="inline-flex"
      m="2"
    >
      <HStack>
        <Tag>{`#F${fixture.uid.key}`}</Tag>
        <Text color="text" size="sm" w="70px">{`${fixture.name}`}</Text>
      </HStack>
    </VStack>
  );
}
