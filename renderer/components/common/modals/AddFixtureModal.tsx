import {
  Button,
  Divider,
  HStack,
  Heading,
  IconButton,
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
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Addressing, FixtureDefinition } from "../../../../lib/types/app";
import { useSessionStore } from "../../../common/store/sessionStore";
import AutoCompleteInput from "../AutoCompleteInput";
import AddressingEdit from "../AddressingEdit";
import { useInputState } from "../../../common/useInputState";
import { createAutoAddressing, createFixtures } from "../../../common/fixture";
import { BsTrash, BsX } from "react-icons/bs";

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
    (fx: FixtureDefinition): string => getSearchString(fx)
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

  const [inputProps, inputState, setInputState] = useInputState({
    start: 1,
    offset: 1,
    count: 5,
    name: "",
  });

  const resetModal = useCallback(() => {
    setSelectedFixtureDefinition(undefined);
    setSelectedFixtureMode(undefined);
    setLocalAddressings([]);
  }, [
    setSelectedFixtureDefinition,
    setSelectedFixtureMode,
    setInputState,
    setLocalAddressings,
  ]);

  useEffect(() => {
    setInputState({ ...inputState, offset: channelCount });
  }, [selectedFixtureMode, setInputState]);

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay backdropBlur="2px" />
      <ModalContent>
        <ModalHeader w="100%">
          <HStack justifyContent="space-between" w="100%">
            <Text>Add Fixtures</Text>
            <HStack justifyContent="space-between" w="120px">
              <Button onClick={resetModal} variant="custom" w="50px" h="50px">
                <BsTrash />
              </Button>
              <Button onClick={onClose} variant="custom" w="50px" h="50px">
                <BsX />
              </Button>
            </HStack>
          </HStack>
        </ModalHeader>
        <ModalBody>
          <AutoCompleteInput
            placeholder="Search for fixtures..."
            w="100% !important"
            selectedEntry={getSearchString(selectedFixtureDefintion)}
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
                selectedEntry={selectedFixtureMode || ""}
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
                  min={1}
                  max={511}
                  {...inputProps["start"]}
                />
                <Input
                  variant="custom"
                  placeholder="Offset"
                  min={-200}
                  {...inputProps["offset"]}
                />
                <Input
                  variant="custom"
                  placeholder="Fixture count"
                  min={1}
                  {...inputProps["count"]}
                />
                <Button
                  variant="custom"
                  w="300px"
                  onClick={() => {
                    setLocalAddressings(
                      createAutoAddressing(
                        Number(inputState["start"]),
                        Number(inputState["offset"]),
                        Number(inputState["count"]),
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

              <Divider my="3" />
              <Input
                variant="custom"
                placeholder="Display name"
                max={6}
                {...inputProps["name"]}
              />
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            variant="custom"
            w="100%"
            isDisabled={
              inputState["name"] === "" || localAddressings.length === 0
            }
            onClick={() => {
              createFixtures(
                localAddressings,
                selectedFixtureDefintion,
                selectedFixtureMode,
                inputState["name"].toString()
              );
              resetModal();
              onClose();
            }}
          >
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

function getSearchString(fixture: FixtureDefinition | undefined): string {
  if (fixture !== undefined) {
    return fixture.manufacturer + "/" + fixture.name;
  } else return "";
}
