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
  Tag,
  Text,
} from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import { Addressing, FixtureDefinition } from "../../../../lib/types/app";
import { useSessionStore } from "../../../common/store/sessionStore";
import AutoCompleteInput from "../AutoCompleteInput";
import AddressingEdit from "../AddressingEdit";

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
  const [localAddressings, setLocalAddressings] = useState<Addressing[]>([]);

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
                  <Text>Addressing</Text>
                  <Tag>
                    {selectedFixtureDefintion.modes[selectedFixtureMode].length}{" "}
                    Channels
                  </Tag>
                </HStack>
                <br />
                <HStack gap="10px">
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
                    placeholder="Offset"
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
                  <Button w="300px">Auto Map</Button>
                </HStack>
                <br />
                <AddressingEdit
                  addressings={localAddressings}
                  onEdit={(newAddressing) => {
                    setLocalAddressings(newAddressing);
                  }}
                  width="625px"
                  height="400px"
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
