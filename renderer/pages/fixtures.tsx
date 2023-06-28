import { Button, HStack, useDisclosure, VStack } from "@chakra-ui/react";
import React, {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { BsPlusLg } from "react-icons/bs";
import { Fixture } from "../../lib/types";
import { useSessionStore } from "../common/store/sessionStore";
import { CardGrid } from "../components/common";
import FixtureTypeCard from "../components/common/FixtureTypeCard";
import { AddFixtureModal } from "../components/common/modals";

function Fixtures() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fixtures = useSessionStore((state) => state.fixtures);

  const [isShiftDown, setIsShiftDown] = useState<boolean>(false);
  const [isControlDown, setIsControlDown] = useState<boolean>(false);

  const [selectedFixtures, setSelectedFixtures] = useState<number[]>([]);
  const [shownFixtures, setShownFixtures] = useState<ReactElement[]>([]);

  const onShowFixtureType = useCallback(
    (fixutreItems: ReactElement[]) => {
      if (isShiftDown) {
        setShownFixtures(fixutreItems.concat(shownFixtures));
      } else {
        setShownFixtures(fixutreItems);
      }
    },
    [shownFixtures, setShownFixtures, isShiftDown]
  );

  const fixtureLists = useMemo(() => {
    const fixturesByDefinition = {};
    fixtures.forEach((fx) => {
      const key = fx.definition.manufacturer + fx.definition.name + fx.mode;
      fixturesByDefinition[key]
        ? fixturesByDefinition[key].push(fx)
        : (fixturesByDefinition[key] = [fx]);
    });

    return Object.values(fixturesByDefinition).map((values: Fixture[], idx) => {
      return (
        <FixtureTypeCard
          key={idx}
          fixtures={values}
          selectedFixtures={selectedFixtures}
          onShowFixtureType={onShowFixtureType}
          onUpdateSelectedFixtures={setSelectedFixtures}
          isShiftDown={isShiftDown}
          isControlDown={isControlDown}
        />
      );
    });
  }, [
    fixtures,
    selectedFixtures,
    onShowFixtureType,
    setSelectedFixtures,
    isShiftDown,
    isControlDown,
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
        <CardGrid>{shownFixtures}</CardGrid>
      </HStack>
      <AddFixtureModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export default Fixtures;
