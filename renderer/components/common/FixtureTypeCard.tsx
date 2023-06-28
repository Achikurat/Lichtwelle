import { Button, Heading, HStack, Tag, Text, VStack } from "@chakra-ui/react";
import React, { ReactElement, ReactNode, useMemo } from "react";
import { Fixture } from "../../../lib/types";
import FixtureCard from "./FixtureCard";

type Props = {
  fixtures: Fixture[];
  typeKey: string;
  selected: boolean;
  onSelectFixtureType: (typeKey: string) => void;
};

export default function FixtureTypeCard({
  fixtures,
  typeKey,
  selected,
  onSelectFixtureType,
}: Props) {
  const definition = fixtures[0].definition;
  const mode = fixtures[0].mode;

  return (
    <Button
      variant="custom"
      h="80px"
      w="100%"
      onClick={() => onSelectFixtureType(typeKey)}
      isActive={selected}
    >
      <VStack alignItems="flex-start">
        <HStack alignItems="baseline" spacing="0" justifyContent="space-around">
          <Text size="sm">{`${definition.manufacturer}/`}</Text>
          <Text size="sm">{mode}</Text>
        </HStack>
        <HStack>
          <Heading size="md">{definition.name}</Heading>
        </HStack>
      </VStack>
    </Button>
  );
}
