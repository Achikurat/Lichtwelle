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
  selectedFixtures: number[];
  onUpdateSelectedFixtures: (uidKeys: number[]) => void;
  isShiftDown?: boolean;
  isControlDown?: boolean;
};

export default function FixtureListCard({
  fixtures,
  selectedFixtures,
  onUpdateSelectedFixtures,
  isShiftDown = false,
  isControlDown = false,
}: Props) {
  const definition = fixtures[0].definition;
  const channels = fixtures[0].channels;
  const mode = fixtures[0].mode;

  const onClickFixtureItem = (uidKey: number) => {
    if (!isShiftDown && !isControlDown) {
      onUpdateSelectedFixtures([uidKey]);
    } else if (isShiftDown) {
      window.getSelection().removeAllRanges();
      const fixtureUidKeys = fixtures.map((fixture) => fixture.uid.key);
      if (selectedFixtures.length !== 0) {
        const indexOfSelection = fixtureUidKeys.indexOf(selectedFixtures[0]);
        if (indexOfSelection !== -1) {
          const indexOfClicked = fixtureUidKeys.indexOf(uidKey);
          if (indexOfClicked !== -1) {
            const fixturesInBetween = fixtureUidKeys.slice(
              Math.min(indexOfSelection, indexOfClicked),
              Math.max(indexOfSelection, indexOfClicked) + 1
            );
            onUpdateSelectedFixtures(fixturesInBetween);
          }
        }
      }
    } else if (isControlDown) {
      if (selectedFixtures.indexOf(uidKey) !== -1) {
        onUpdateSelectedFixtures([
          ...selectedFixtures.slice(0, selectedFixtures.indexOf(uidKey)),
          ...selectedFixtures.slice(selectedFixtures.indexOf(uidKey) + 1),
        ]);
      } else {
        onUpdateSelectedFixtures(selectedFixtures.concat([uidKey]));
      }
    }
  };

  const fixtureItem = useMemo(() => {
    return fixtures.map((fixture, key) => {
      return (
        <HStack
          key={key}
          w="100%"
          h="40px"
          p="2"
          bg="bg.dark"
          outline={
            selectedFixtures.indexOf(fixture.uid.key) != -1
              ? "1px solid white"
              : "undefined"
          }
          onClick={() => onClickFixtureItem(fixture.uid.key)}
          borderRadius="md"
          flexShrink="0"
          justifyContent="space-between"
          userSelect={isShiftDown || isControlDown ? "none" : "auto"}
        >
          <Tag>{`#F${fixture.uid.key}`}</Tag>
          <Text color="text" size="sm" w="70px">{`${fixture.name}`}</Text>
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
  }, [fixtures, onClickFixtureItem, selectedFixtures]);

  return (
    <VStack borderRadius="md" p="3" border="1px solid" borderColor="bg.mid">
      <HStack
        w="300px"
        pb="3"
        borderBottom="1px solid"
        borderColor="text"
        justifyContent="space-between"
      >
        <VStack alignItems="flex-start">
          <HStack
            alignItems="baseline"
            spacing="0"
            justifyContent="space-around"
          >
            <Text size="sm" color="text">{`${definition.manufacturer}/`}</Text>
            <Text size="sm" color="text">
              {mode}
            </Text>
            <Tag marginLeft="10px !important">{channels.length} Channel</Tag>
          </HStack>
          <HStack>
            <Heading size="md" color="primary">
              {definition.name}
            </Heading>
            <Heading size="sm" color="secondary">
              x {fixtures.length}
            </Heading>
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
