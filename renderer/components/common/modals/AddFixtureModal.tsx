import {
  Button,
  Divider,
  FormControl,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import { FixtureDefinition } from "../../../../lib/types/app";
import { useSessionStore } from "../../../common/store/sessionStore";
import AutoCompleteInput from "../AutoCompleteInput";
import AddressingMatrix from "../AddressingMatrix";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AddFixtureModal({ isOpen, onClose }: Props) {
  const fixtureDefinitions = useSessionStore(
    (state) => state.fixtureDefinitions
  );

  const [selectedFixtureDefintion, setSelectedFixtureDefinition] =
    useState<FixtureDefinition>();
  const [selectedFixtureMode, setSelectedFixtureMode] = useState<string>();

  const fixtureDefinitionsEntires: string[] = fixtureDefinitions.map(
    (fx: FixtureDefinition): string => fx.manufacturer + "/" + fx.name
  );

  const fixtureModeEntries: string[] = useMemo(() => {
    if (selectedFixtureDefintion !== undefined) {
      return Object.keys(selectedFixtureDefintion.modes);
    }
  }, [selectedFixtureDefintion]);

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay backdropBlur="2px" />
      <ModalContent>
        <ModalHeader>Add Fixture</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl spellCheck="false">
            <AutoCompleteInput
              placeholder="Search for fixtures..."
              w="100% !important"
              entries={fixtureDefinitionsEntires}
              onSelectEntry={(idx: number) => {
                if (idx === -1) {
                  setSelectedFixtureDefinition(undefined);
                } else {
                  setSelectedFixtureDefinition(fixtureDefinitions[idx]);
                }
                setSelectedFixtureMode(undefined);
              }}
            />
            {selectedFixtureDefintion && (
              <>
                <br />
                <br />
                <AutoCompleteInput
                  placeholder="Search for modes..."
                  w="100% !important"
                  entries={fixtureModeEntries}
                  onSelectEntry={(idx: number) => {
                    if (idx !== -1) {
                      setSelectedFixtureMode(fixtureModeEntries[idx]);
                    }
                  }}
                />
              </>
            )}

            <br />
            <br />
            <Divider />
            <br />
            {selectedFixtureMode && (
              <>
                <HStack alignContent="flex-start">
                  <Text>Address Options</Text>
                  <Tag>
                    {selectedFixtureDefintion.modes[selectedFixtureMode].length}{" "}
                    Channels
                  </Tag>
                </HStack>
                <br />
                <HStack gap="50px">
                  <Input
                    type="number"
                    variant="custom"
                    placeholder="Start address"
                    min={0}
                    max={255}
                  />
                  <Input
                    type="number"
                    variant="custom"
                    placeholder="Address Gap"
                    min={0}
                    max={255}
                  />
                  <Input
                    type="number"
                    variant="custom"
                    placeholder="Fixture count"
                    min={0}
                    max={255}
                  />
                </HStack>
                <AddressingMatrix
                  addressings={[]}
                  onEdit={() => {}}
                  matrixSize={[625, 600]}
                  initMatrixZoom={0.7}
                  w="625px"
                  h="400px"
                />
              </>
            )}
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button w="100%">Create</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
