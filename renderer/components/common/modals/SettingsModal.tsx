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
import Store from "electron-store";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SettingsModal({ isOpen, onClose }: Props) {
  const toast = useToast();
  const store = new Store();
  const [persistentSettings, updateSessionState] = useSessionStore((state) => [
    state.persistentSettings,
    state.updateSessionState,
  ]);
  const [localPersistentSettings, setLocalPersistentSettings] =
    useState<PersistentSettings>(persistentSettings);

  function updateSettings() {
    reloadFixtureDefinitions((fixtureDefintions) => {
      //store to File
      store.set("persistentSettings", {
        ...localPersistentSettings,
        fixtureDefintions: fixtureDefintions,
      });
      //Update Session State
      updateSessionState({
        persistentSettings: localPersistentSettings,
        fixtureDefinitions: fixtureDefintions,
      });
      console.log("Updated Settings");
      toast({
        title: "Settings updated.",
        description: "Save and reload successfull!",
        status: "success",
        duration: 100,
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
