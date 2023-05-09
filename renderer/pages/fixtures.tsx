import { useDisclosure } from "@chakra-ui/react";
import React from "react";
import { CardGrid } from "../components/common";
import { AddFixtureModal } from "../components/common/modals";

function Fixtures() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <CardGrid cardAddAction={onOpen}></CardGrid>
      <AddFixtureModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export default Fixtures;
