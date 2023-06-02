import { useDisclosure } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { Fixture } from "../../lib/types";
import { useSessionStore } from "../common/store/sessionStore";
import { CardGrid, CardList } from "../components/common";
import { AddFixtureModal } from "../components/common/modals";

function Fixtures() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fixtures = useSessionStore((state) => state.fixtures);

  const fixtureLists = useMemo(() => {
    const fixturesByDefinition = {};
    fixtures.forEach((fx) => {
      const key = fx.definition.manufacturer + fx.definition.name + fx.mode;
      fixturesByDefinition[key]
        ? fixturesByDefinition[key].push(fx)
        : (fixturesByDefinition[key] = [fx]);
    });

    return Object.values(fixturesByDefinition).map((values: Fixture[], idx) => {
      return <CardList key={idx} fixtures={values} />;
    });
  }, [fixtures]);

  return (
    <>
      <CardGrid cardAddAction={onOpen}>{fixtureLists}</CardGrid>
      <AddFixtureModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export default Fixtures;
