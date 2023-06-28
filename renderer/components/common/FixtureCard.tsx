import { HStack, Tag, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { Fixture } from "../../../lib/types";

type Props = {
  fixture: Fixture;
  onClickFixtureItem: (uidKey: number) => void;
  selected: boolean;
  isShiftDown: boolean;
  isControlDown: boolean;
};

export default function FixtureCard({
  fixture,
  onClickFixtureItem,
  selected,
  isShiftDown,
  isControlDown,
}: Props) {
  return (
    <VStack
      w="150px"
      h="120px"
      border="1px solid"
      borderColor="bg.mid"
      borderRadius="md"
      display="inline-flex"
      m="2"
      p="3"
      outline={selected ? "1px solid #03A9F4" : "undefined"}
      onClick={() => onClickFixtureItem(fixture.uid.key)}
      flexShrink="0"
      justifyContent="space-between"
      userSelect={isShiftDown || isControlDown ? "none" : "auto"}
    >
      <HStack>
        <Tag>{`#F${fixture.uid.key}`}</Tag>
        <Text color="text" size="sm" w="70px">{`${fixture.name}`}</Text>
      </HStack>
    </VStack>
  );
}
