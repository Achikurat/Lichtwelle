import { Button, Heading, HStack, Tag, Text, VStack } from "@chakra-ui/react";
import React, { ReactElement, ReactNode, useMemo } from "react";
import { Fixture } from "../../../lib/types";
import FixtureCard from "./FixtureCard";

type Props = {
  fixtures: Fixture[];
  selectedFixtures: number[];
  onUpdateSelectedFixtures: (uidKeys: number[]) => void;
  onShowFixtureType: (fixtureCards: ReactElement[]) => void;
  isShiftDown?: boolean;
  isControlDown?: boolean;
};

export default function FixtureTypeCard({
  fixtures,
  selectedFixtures,
  onUpdateSelectedFixtures,
  onShowFixtureType,
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

  const fixtureItems = useMemo(() => {
    return fixtures.map((fixture, key) => {
      return (
        <FixtureCard key={key} fixture={fixture} />
        /*  <HStack
          key={key}
          w="100%"
          h="40px"
          p="2"
          bg="bg.dark"
          outline={
            selectedFixtures.indexOf(fixture.uid.key) != -1
              ? "1px solid #03A9F4"
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
        </HStack> */
      );
    });
  }, [fixtures, onClickFixtureItem, selectedFixtures]);

  return (
    <Button
      variant="custom"
      onClick={() => onShowFixtureType(fixtureItems)}
      h="100px"
      w="100%"
    >
      <VStack alignItems="flex-start">
        <HStack alignItems="baseline" spacing="0" justifyContent="space-around">
          <Text size="sm" color="text">{`${definition.manufacturer}/`}</Text>
          <Text size="sm" color="text">
            {mode}
          </Text>
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
    </Button>
  );
}
