import {
  Input,
  InputProps,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  VStack,
  Button,
} from "@chakra-ui/react";
import React, { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  entries: string[];
  selectedEntry: string;
  onSelectEntry: (idx: number) => void;
} & InputProps;

export default function AutoCompleteInput({
  entries,
  selectedEntry,
  onSelectEntry,
  ...chakraProps
}: Props) {
  const [isVisible, setVisible] = useState<boolean>(false);
  const [focusIndex, setFocusIndex] = useState<number>(-1);
  const [localInput, setLocalInput] = useState<string>("");
  const focusRef = useRef(null);

  const selectEntry = (entry: string, idx: number) => {
    onSelectEntry(idx);
    setVisible(false);
  };

  const filteredEntries = entries.filter((entry) => {
    if (localInput === "") {
      return true;
    }
    return entry.toLocaleLowerCase().includes(localInput, 0);
  });

  const autocompleteOptions = useMemo(() => {
    return filteredEntries.map((entry, lidx) => {
      const idx = entries.indexOf(entry);
      return (
        <Button
          variant="custom"
          key={idx}
          w="100%"
          p="3"
          border="none !imporant"
          onClick={() => selectEntry(entry, idx)}
          color={lidx === focusIndex ? "primary" : "inherit"}
          ref={lidx === focusIndex ? focusRef : undefined}
          scrollMarginTop="150px"
        >
          {entry}
        </Button>
      );
    });
  }, [entries, localInput, setLocalInput, focusIndex]);

  useEffect(() => {
    if (focusRef.current !== null) {
      focusRef.current.scrollIntoView();
    }
  }, [autocompleteOptions, focusIndex]);

  useEffect(() => {
    setLocalInput(selectedEntry);
  }, [setLocalInput, selectedEntry]);

  return (
    <>
      <Popover
        isLazy={true}
        autoFocus={false}
        isOpen={filteredEntries.length > 0 && isVisible}
        onClose={() => setVisible(false)}
        placement="bottom"
        closeOnBlur={true}
        trigger="hover"
      >
        <PopoverTrigger>
          <Input
            {...chakraProps}
            value={localInput}
            variant="custom"
            onClick={() => setVisible(true)}
            onChange={(e) => {
              setLocalInput(e.target.value.toLowerCase());
              setFocusIndex(-1);
              if (!isVisible) {
                setVisible(true);
              }
            }}
            onFocus={() => {
              setVisible(true);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (focusIndex !== -1) {
                  selectEntry(
                    filteredEntries[focusIndex],
                    entries.indexOf(filteredEntries[focusIndex])
                  );
                } else if (filteredEntries.length > 0) {
                  selectEntry(
                    filteredEntries[0],
                    entries.indexOf(filteredEntries[0])
                  );
                }
              }

              if (e.key === "Backspace") {
                onSelectEntry(-1);
              }

              if (e.key === "ArrowUp") {
                e.preventDefault();
                if (focusIndex > 0) {
                  setFocusIndex(focusIndex - 1);
                } else {
                  setFocusIndex(filteredEntries.length - 1);
                }
              }

              if (e.key === "ArrowDown") {
                e.preventDefault();
                if (focusIndex < filteredEntries.length - 1) {
                  setFocusIndex(focusIndex + 1);
                } else {
                  setFocusIndex(0);
                }
              }
            }}
          />
        </PopoverTrigger>
        <PopoverContent
          w="625px"
          maxH="350px"
          overflowY="scroll"
          css={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <PopoverBody w="100%">
            <VStack
              justifyContent="flex-start"
              alignItems="flex-start"
              color="text"
            >
              {autocompleteOptions}
            </VStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
}
