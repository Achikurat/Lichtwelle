import {
  Heading,
  HStack,
  StackDivider,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import { Fixture } from "../../../lib/types";

type Props = {
  fixtures: Fixture[];
};

export default function CardList({ fixtures }: Props) {
  const definition = fixtures[0].definition;
  const channels = fixtures[0].channels;
  const mode = fixtures[0].mode;

  const fixtureItem = useMemo(() => {
    return fixtures.map((fixture, key) => {
      return (
        <HStack
          key={key}
          w="100%"
          h="40px"
          p="2"
          bg="bg.mid"
          borderRadius="md"
          flexShrink="0"
          justifyContent="space-between"
          divider={<StackDivider borderColor="bg.dark" />}
        >
          <Tag>{`#F${fixture.uid.key}`}</Tag>
          <Text color="text" size="sm" w="50px">{`${fixture.name}`}</Text>
          <HStack
            w="80px"
            color="text"
            fontSize="sm"
            justifyContent="space-between"
          >
            <Text>{fixture.addressing.firstChannel}</Text>
            <Text>–</Text>
            <Text>{fixture.addressing.lastChannel}</Text>
          </HStack>
        </HStack>
      );
    });
  }, [fixtures]);

  return (
    <VStack w="300px" bg="bg.dark" borderRadius="md" p="3">
      <HStack
        w="100%"
        borderBottom="1px solid"
        borderColor="primary"
        justifyContent="space-between"
      >
        <VStack alignItems="flex-start">
          <HStack alignItems="baseline" spacing="0">
            <Text
              size="sm"
              color="secondary"
            >{`${definition.manufacturer}/`}</Text>
            <Text size="sm" color="secondary">
              {mode}
            </Text>
          </HStack>
          <Heading size="md" color="primary">
            {definition.name}
          </Heading>
        </VStack>
        <VStack h="100%" alignItems="flex-start" justifyContent="flex-start">
          <HStack spacing="1">
            <VStack>
              <Text size="sm" color="secondary">
                ch
              </Text>
              <Heading size="md" color="primary">
                {channels.length}
              </Heading>
            </VStack>
            <VStack>
              <Text size="lg" color="secondary" m="0">
                /
              </Text>
              <Text size="lg" color="text" m="0">
                /
              </Text>
            </VStack>
            <VStack>
              <Text size="sm" color="secondary">
                fx
              </Text>
              <Heading size="md" color="secondary">
                {fixtures.length}
              </Heading>
            </VStack>
          </HStack>
        </VStack>
      </HStack>
      {/* Body */}
      <VStack
        w="100%"
        h="600px"
        p="2"
        overflowY="auto"
        sx={{
          "&::-webkit-scrollbar": {
            w: "10px",
            borderRadius: "md",
          },
          "&::-webkit-scrollbar-track": {
            w: "10px",
            bg: "bg.dark",
            borderRadius: "md",
          },
          "&::-webkit-scrollbar-thumb": {
            borderRadius: "md",
            bg: "primary",
          },
        }}
        overflowX="hidden"
      >
        {fixtureItem}
      </VStack>
    </VStack>
  );
}
