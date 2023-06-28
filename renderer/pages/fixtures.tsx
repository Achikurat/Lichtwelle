import { Button, HStack, useDisclosure, VStack } from "@chakra-ui/react";
import { type } from "os";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { useSessionStore } from "../common/store/sessionStore";
import { CardGrid, FixtureCard } from "../components/common";
import FixtureTypeCard from "../components/common/FixtureTypeCard";
import { AddFixtureModal } from "../components/common/modals";

function Fixtures() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fixtures = useSessionStore((state) => state.fixtures);

  const [isShiftDown, setIsShiftDown] = useState<boolean>(false);
  const [isControlDown, setIsControlDown] = useState<boolean>(false);

  const [selectedFixtures, setSelectedFixtures] = useState<number[]>([]);
  const [selectedFixtureTypes, setSelectedFixtureTypes] = useState<string[]>(
    []
  );

  const onSelectFixtureType = useCallback(
    (typeKey: string) => {
      if (selectedFixtureTypes.indexOf(typeKey) !== -1) {
        if (isControlDown) {
          setSelectedFixtureTypes([
            ...selectedFixtureTypes.slice(
              0,
              selectedFixtureTypes.indexOf(typeKey)
            ),
            ...selectedFixtureTypes.slice(
              selectedFixtureTypes.indexOf(typeKey) + 1
            ),
          ]);
        } else {
          if (selectedFixtureTypes.length > 1) {
            setSelectedFixtureTypes([typeKey]);
          } else {
            setSelectedFixtureTypes([]);
          }
        }
      } else {
        if (isControlDown) {
          setSelectedFixtureTypes(selectedFixtureTypes.concat(typeKey));
        } else {
          setSelectedFixtureTypes([typeKey]);
        }
      }
    },
    [selectedFixtureTypes, setSelectedFixtureTypes, isControlDown]
  );

  const onClickFixtureItem = (uidKey: number) => {
    if (!isShiftDown && !isControlDown) {
      setSelectedFixtures([uidKey]);
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
            setSelectedFixtures(fixturesInBetween);
          }
        }
      }
    } else if (isControlDown) {
      if (selectedFixtures.indexOf(uidKey) !== -1) {
        setSelectedFixtures([
          ...selectedFixtures.slice(0, selectedFixtures.indexOf(uidKey)),
          ...selectedFixtures.slice(selectedFixtures.indexOf(uidKey) + 1),
        ]);
      } else {
        setSelectedFixtures(selectedFixtures.concat([uidKey]));
      }
    }
  };

  const fixturesByDefinition = {};
  const fixtureLists = useMemo(() => {
    fixtures.forEach((fx) => {
      const key = fx.definition.manufacturer + fx.definition.name + fx.mode;
      fixturesByDefinition[key]
        ? fixturesByDefinition[key].push(fx)
        : (fixturesByDefinition[key] = [fx]);
    });

    return Object.keys(fixturesByDefinition).map((typeKey: string, idx) => {
      return (
        <FixtureTypeCard
          key={idx}
          fixtures={fixturesByDefinition[typeKey]}
          selected={selectedFixtureTypes.indexOf(typeKey) !== -1}
          typeKey={typeKey}
          onSelectFixtureType={onSelectFixtureType}
        />
      );
    });
  }, [
    fixtures,
    selectedFixtures,
    fixturesByDefinition,
    selectedFixtureTypes,
    onSelectFixtureType,
    setSelectedFixtures,
    isShiftDown,
    isControlDown,
  ]);

  const fixtureItems = useMemo(() => {
    return selectedFixtureTypes.map((typeKey) => {
      if (fixturesByDefinition[typeKey] !== undefined)
        return fixturesByDefinition[typeKey].map((fixture, idx) => {
          return (
            <FixtureCard
              key={idx}
              fixture={fixture}
              selected={selectedFixtures.indexOf(fixture.uid.key) !== -1}
              onClickFixtureItem={onClickFixtureItem}
              isControlDown={isControlDown}
              isShiftDown={isShiftDown}
            />
          );
        });
    });
  }, [
    fixturesByDefinition,
    fixtures,
    selectedFixtures,
    onClickFixtureItem,
    selectedFixtureTypes,
    isControlDown,
    isShiftDown,
  ]);

  const onKeyEvent = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Shift" || e.key === "Control" || e.key === "Meta") {
        setIsShiftDown(e.shiftKey);
        setIsControlDown(e.ctrlKey || e.metaKey);
      }
    },
    [setIsShiftDown, setIsControlDown]
  );

  useEffect(() => {
    window.addEventListener("keydown", onKeyEvent);
    window.addEventListener("keyup", onKeyEvent);
    return () => {
      window.removeEventListener("keydown", onKeyEvent);
      window.removeEventListener("keyup", onKeyEvent);
    };
  }, [onKeyEvent]);

  return (
    <>
      <HStack w="100%" h="100%" spacing="0">
        <VStack
          p="3"
          w="300px"
          h="100%"
          borderRight="1px solid"
          borderColor="bg.mid"
          alignItems="flex-start"
        >
          {fixtureLists}
          <Button
            onClick={onOpen}
            variant="custom"
            flexShrink="0"
            background="transparent"
            w="100%"
            h="50px"
          >
            <BsPlusLg /> Add Fixtures
          </Button>
        </VStack>
        <CardGrid>{fixtureItems}</CardGrid>
      </HStack>
      <AddFixtureModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export default Fixtures;
