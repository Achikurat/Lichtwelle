import {
  Button,
  Code,
  Collapse,
  Divider,
  FormControl,
  FormHelperText,
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
  Select,
  useDisclosure,
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

  const values: string[] = fixtureDefinitions.map(
    (fx: FixtureDefinition): string => fx.name.toLocaleLowerCase()
  );

  const fixtureDefinitionOptions = useMemo(() => {
    return fixtureDefinitions.map((fixtureDefinition, idx) => {
      return (
        <MenuItem
          key={idx}
          onClick={() => {
            setSelectedFixtureDefinition(fixtureDefinition);
            setSelectedFixtureMode(undefined);
          }}
        >
          {fixtureDefinition.name}
        </MenuItem>
      );
    });
  }, [fixtureDefinitions]);

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
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay backdropBlur="2px" />
      <ModalContent>
        <ModalHeader>Add Fixture</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl spellCheck="false">
            <AutoCompleteInput
              w="100% !important"
              entries={values}
              onSelectEntry={(idx: number) => {
                setSelectedFixtureDefinition(fixtureDefinitions[idx]);
                setSelectedFixtureMode(undefined);
              }}
            />
            {selectedFixtureDefintion && (
              <>
                <br />
                <br />
                <Menu>
                  <MenuButton as={Button} w="100%">
                    {selectedFixtureMode
                      ? "Mode - " + selectedFixtureMode
                      : "Select a Mode."}
                  </MenuButton>
                  <MenuList>{fixtureModeOptions}</MenuList>
                </Menu>
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
        <ModalFooter>asdasdasd</ModalFooter>
      </ModalContent>
    </Modal>
  );
}
