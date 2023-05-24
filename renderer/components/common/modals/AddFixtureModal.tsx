import {
  Button,
  Divider,
  FormControl,
  FormLabel,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import { FixtureDefinition } from "../../../../lib/types/app";
import { useSessionStore } from "../../../common/store/sessionStore";
import AutoCompleteInput from "../AutoCompleteInput";

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

  const fixtureModeOptions = useMemo(() => {
    if (selectedFixtureDefintion !== undefined) {
      return Object.keys(selectedFixtureDefintion.modes).map((mode, idx) => {
        return (
          <MenuItem key={idx} onClick={() => setSelectedFixtureMode(mode)}>
            {mode}
          </MenuItem>
        );
      });
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
                <FormLabel>Address Options</FormLabel>
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
