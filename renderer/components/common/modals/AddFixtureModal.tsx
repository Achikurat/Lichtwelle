import {
  Button,
  Divider,
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
import React, { useEffect, useMemo, useState } from "react";
import { Addressing, FixtureDefinition } from "../../../../lib/types/app";
import { useSessionStore } from "../../../common/store/sessionStore";
import AutoCompleteInput from "../AutoCompleteInput";
import AddressingEdit from "../AddressingEdit";
import { useInputState } from "../../../common/useInputState";
import { createAutoAddressing } from "../../../common/fixture";

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

  const channelCount =
    selectedFixtureMode !== undefined
      ? selectedFixtureDefintion.modes[selectedFixtureMode].length
      : 0;

  const [addressingProps, addressingState, setAddressingState] = useInputState({
    start: 1,
    offset: 1,
    count: 5,
  });

  useEffect(() => {
    setAddressingState({ ...addressingState, offset: channelCount });
  }, [selectedFixtureMode, setAddressingState]);

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay backdropBlur="2px" />
      <ModalContent>
        <ModalHeader>Add Fixture</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
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
          <Divider my="6" />
          {selectedFixtureMode && (
            <>
              <HStack alignContent="flex-start">
                <Text>Addressing</Text>
                <Tag>{channelCount} Channels</Tag>
              </HStack>
              <Divider my="3" borderColor="transparent" />

              <HStack gap="10px">
                <Input
                  variant="custom"
                  placeholder="Start address"
                  name="startAddress"
                  min={1}
                  max={511}
                  {...addressingProps["start"]}
                />
                <Input
                  variant="custom"
                  placeholder="Offset"
                  name="offset"
                  {...addressingProps["offset"]}
                />
                <Input
                  variant="custom"
                  placeholder="Fixture count"
                  name="fxCount"
                  min={1}
                  {...addressingProps["count"]}
                />
                <Button
                  w="300px"
                  onClick={() => {
                    setLocalAddressings(
                      createAutoAddressing(
                        Number(addressingState["start"]),
                        Number(addressingState["offset"]),
                        Number(addressingState["count"]),
                        channelCount
                      )
                    );
                  }}
                >
                  Auto Map
                </Button>
              </HStack>
              <Divider my="3" borderColor="transparent" />
              <AddressingEdit
                channelCount={channelCount}
                addressings={localAddressings}
                onEdit={(newAddressing) => {
                  setLocalAddressings(newAddressing);
                }}
                width="625px"
                height="400px"
              />
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Button w="100%">Create</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
