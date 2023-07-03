import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useSessionStore } from "../../../common/store/sessionStore";
import { PersistentSettings } from "../../../../lib/types";
import { reloadFixtureDefinitions } from "../../../common/fixture";
import { usePersistentStore } from "../../../common/store/persistentStore";
import { BsFolder, BsX } from "react-icons/bs";
import electron, { OpenDialogReturnValue } from "electron";
import { IpcMessageType } from "../../../../lib/enums";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const ipcRenderer = electron.ipcRenderer || false;

export default function SettingsModal({ isOpen, onClose }: Props) {
  const toast = useToast();
  const fixtureDefinitions = useSessionStore(
    (state) => state.fixtureDefinitions
  );
  const [localPersistentSettings, setLocalPersistentSettings] =
    useState<PersistentSettings>(usePersistentStore.getState());

  function updateSettings() {
    usePersistentStore.setState(localPersistentSettings);

    reloadFixtureDefinitions((fixtureDefintions) => {
      useSessionStore.setState({ fixtureDefinitions: fixtureDefintions });

      toast({
        title: "Settings updated.",
        description: "Save and reload successfull!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    });
  }

  function selectDirectory() {
    if (ipcRenderer) {
      ipcRenderer
        .invoke(IpcMessageType.OpenDirectoryPrompt)
        .then((result: OpenDialogReturnValue) => {
          setLocalPersistentSettings({
            ...localPersistentSettings,
            fixtureDefinitionsLocation: result.filePaths[0],
          });
        });
    }
  }

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay backdropBlur="2px" />
      <ModalContent>
        <ModalHeader w="100%">
          <HStack justifyContent="space-between" w="100%">
            <Text>Application Settings</Text>
            <Button onClick={onClose} variant="custom" w="50px" h="50px">
              <BsX />
            </Button>
          </HStack>
        </ModalHeader>
        <ModalBody>
          <FormControl spellCheck="false">
            <FormLabel>Fixture Definition Location</FormLabel>
            <HStack height="55px">
              <Input
                variant="custom"
                height="100%"
                onChange={(e) =>
                  setLocalPersistentSettings({
                    ...localPersistentSettings,
                    fixtureDefinitionsLocation: e.target.value,
                  })
                }
                value={localPersistentSettings.fixtureDefinitionsLocation}
              />
              <Button
                width="50px"
                height="50px"
                variant="custom"
                onClick={selectDirectory}
              >
                <BsFolder />
              </Button>
            </HStack>
            <FormLabel>
              Fixture Defintion Count:{" "}
              {fixtureDefinitions && fixtureDefinitions.length}
            </FormLabel>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button variant="custom" w="100%" onClick={updateSettings}>
            Save & Reload
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
