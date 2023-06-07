import { useDisclosure } from "@chakra-ui/react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Fixture } from "../../lib/types";
import { useSessionStore } from "../common/store/sessionStore";
import { CardGrid, FixtureListCard } from "../components/common";
import { AddFixtureModal } from "../components/common/modals";

function Fixtures() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fixtures = useSessionStore((state) => state.fixtures);

  const [isShiftDown, setIsShiftDown] = useState<boolean>(false);
  const [isControlDown, setIsControlDown] = useState<boolean>(false);

  const [selectedFixtures, setSelectedFixtures] = useState<number[]>([]);

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
        <FixtureListCard
          key={idx}
          fixtures={values}
          selectedFixtures={selectedFixtures}
          onUpdateSelectedFixtures={setSelectedFixtures}
          isShiftDown={isShiftDown}
          isControlDown={isControlDown}
        />
      );
    });
  }, [
    fixtures,
    selectedFixtures,
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
      <CardGrid cardAddAction={onOpen}>{fixtureLists}</CardGrid>
      <AddFixtureModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export default Fixtures;
