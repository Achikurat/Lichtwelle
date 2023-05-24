import {
  Text,
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
  onSelectEntry: (idx: number) => void;
} & InputProps;

export default function AutoCompleteInput({
  entries,
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
    setLocalInput(entry);
  };

  const filteredEntries = entries.filter((entry) => {
    if (localInput === "") {
      return true;
    }
    return entry.includes(localInput, 0);
  });

  const autocompleteOptions = useMemo(() => {
    return filteredEntries.map((entry, lidx) => {
      const idx = entries.indexOf(entry);
      return (
        <Button
          key={idx}
          w="100%"
          p="3"
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

  return (
    <>
      <Popover
        isLazy={true}
        autoFocus={false}
        isOpen={isVisible}
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
            placeholder="Search for fixtures..."
            onChange={(e) => {
              setLocalInput(e.target.value.toLowerCase());
              setFocusIndex(-1);
              if (!isVisible) {
                setVisible(true);
              }
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

              if (e.key === "ArrowUp") {
                if (focusIndex > 0) {
                  setFocusIndex(focusIndex - 1);
                } else {
                  setFocusIndex(filteredEntries.length - 1);
                }
              }

              if (e.key === "ArrowDown") {
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
          w="400px"
          maxH="300px"
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
