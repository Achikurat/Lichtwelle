import {
  Code,
  Collapse,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
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

  const fixtureDefinitionOptions = useMemo(() => {
    return fixtureDefinitions.map((fixtureDefinition, idx) => {
      return (
        <option key={idx} value={idx}>
          {fixtureDefinition.name}
        </option>
      );
    });
  }, []);

  const fixtureModeOptions = useMemo(() => {
    if (selectedFixtureDefintion !== undefined) {
      return Object.keys(selectedFixtureDefintion.modes).map((mode, idx) => {
        return (
          <option key={idx} value={mode}>
            {mode}
          </option>
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
          <FormControl>
            <FormLabel>Fixture Definition</FormLabel>
            <Select
              onChange={(e) => {
                if (e.target.value !== "-1") {
                  setSelectedFixtureDefinition(
                    fixtureDefinitions[e.target.value]
                  );
                } else setSelectedFixtureDefinition(undefined);
              }}
            >
              <option value={-1}>Select a Fixture.</option>
              {fixtureDefinitionOptions}
            </Select>
            <Divider />
            <FormHelperText>Select a fixture definition.</FormHelperText>
            {selectedFixtureDefintion && (
              <>
                <FormLabel>Fixture Mode</FormLabel>
                <Select
                  onChange={(e) => {
                    if (e.target.value !== "-1") {
                      setSelectedFixtureMode(e.target.value);
                    } else setSelectedFixtureMode(undefined);
                  }}
                >
                  <option value={-1}>Select a Mode.</option>
                  {fixtureModeOptions}
                </Select>
              </>
            )}
            <Divider />
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
