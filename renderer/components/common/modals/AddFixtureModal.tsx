import {
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
import React, { useState } from "react";
import { FixtureDefinition } from "../../../../lib/types/app";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AddFixtureModal({ isOpen, onClose }: Props) {
  const { isOpen: isChannelOpen, onToggle: onChannelToggle } = useDisclosure();
  const [fixtureDefintion, setFixtureDefintion] = useState<FixtureDefinition>();

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay backdropBlur="2px" />
      <ModalContent>
        <ModalHeader>Add Fixture</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Fixture Definition</FormLabel>
            <Select onChange={(e) => console.log(e.target.value)}>
              <option>Fixture #1</option>
              <option>Fixture #2</option>
              <option>Fixture #3</option>
              <option>Fixture #4</option>
              <option>Fixture #5</option>
            </Select>
            <FormHelperText>Select a fixture definition.</FormHelperText>
            <Divider />
            <Collapse in={isChannelOpen}></Collapse>
          </FormControl>
        </ModalBody>
        <ModalFooter>asdasdasd</ModalFooter>
      </ModalContent>
    </Modal>
  );
}
