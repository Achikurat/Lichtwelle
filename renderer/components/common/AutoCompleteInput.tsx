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
import { useMemo, useState } from "react";

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

  const [localInput, setLocalInput] = useState<string>("");

  const filteredEntries = entries.filter((entry) => {
    if (localInput === "") {
      return true;
    }
    return entry.includes(localInput, 0);
  });

  const autocompleteOptions = useMemo(() => {
    return filteredEntries.map((entry) => {
      const idx = entries.indexOf(entry);
      return (
        <Button
          key={idx}
          w="100%"
          p="3"
          onClick={() => {
            onSelectEntry(idx);
            setVisible(false);
            setLocalInput(entry);
          }}
        >
          {entry}
        </Button>
      );
    });
  }, [entries, localInput, setLocalInput]);

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
              if (!isVisible) {
                setVisible(true);
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
