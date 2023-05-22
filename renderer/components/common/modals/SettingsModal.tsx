import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useSessionStore } from "../../../common/store/sessionStore";
import { PersistentSettings } from "../../../../lib/types";
import { reloadFixtureDefinitions } from "../../../common/fixture";
import { usePersistentStore } from "../../../common/store/persistentStore";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SettingsModal({ isOpen, onClose }: Props) {
  const toast = useToast();
  const [localPersistentSettings, setLocalPersistentSettings] =
    useState<PersistentSettings>(usePersistentStore.getState());

  function updateSettings() {
    usePersistentStore.setState(localPersistentSettings);

    console.log(usePersistentStore.getState());

    reloadFixtureDefinitions((fixtureDefintions) => {
      useSessionStore.setState({ fixtureDefinitions: fixtureDefintions });
      console.log("Updated Settings", fixtureDefintions);
      toast({
        title: "Settings updated.",
        description: "Save and reload successfull!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    });
  }

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay backdropBlur="2px" />
      <ModalContent>
        <ModalHeader>Application Settings</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Fixture Definition Location</FormLabel>
            <Input
              onChange={(e) =>
                setLocalPersistentSettings({
                  ...localPersistentSettings,
                  fixtureDefinitionsLocation: e.target.value,
                })
              }
              value={localPersistentSettings.fixtureDefinitionsLocation}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button onClick={updateSettings}>Save & Reload</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
