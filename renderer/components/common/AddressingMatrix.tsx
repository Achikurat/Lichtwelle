import {
  Button,
  HStack,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  TabProps,
  Table,
  TableCaption,
  TableContainer,
  Tabs,
  Tag,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Addressing } from "../../../lib/types";
import React, { useMemo, useState } from "react";
import { UidType } from "../../../lib/enums";

type Props = {
  addressings: Addressing[];
  editable?: boolean;
  onEdit: (addressings: Addressing[]) => void;
} & TabProps;

export default function AddressingMatrix({
  addressings,
  editable,
  onEdit,
  ...chakraProps
}: Props) {
  const propAddressings: Addressing[] = [];

  for (var i = 0; i < 20; i++) {
    propAddressings.push(createPropAddressing());
  }

  const [localAddressings, setLocalAddressings] =
    useState<Addressing[]>(propAddressings);

  const distanceToLastChannel =
    localAddressings[0].lastChannel - localAddressings[0].firstChannel;

  const updateAddressing = (addressing: Addressing, firstChannel: number) => {
    const idx = localAddressings.indexOf(addressing);
    const updatedAddressing: Addressing = {
      ...addressing,
      firstChannel: firstChannel,
      lastChannel: firstChannel + distanceToLastChannel,
    };
    const updatedLocalAddressings = [
      ...localAddressings.slice(0, idx),
      updatedAddressing,
      ...localAddressings.slice(idx + 1),
    ];

    setLocalAddressings(updatedLocalAddressings);
  };

  const fixtureList = useMemo(() => {
    return localAddressings.map((addressing, idx) => {
      return (
        <Tr h="40px">
          <Td>
            <Text w="100%" color="primary" textAlign="center">
              {" "}
              {"#" + addressing.fixtureUid.type + addressing.fixtureUid.key}
            </Text>
          </Td>
          <Td>
            <Input
              value={addressing.firstChannel}
              onChange={(e) => {
                const firstChannel = Math.max(
                  0,
                  Math.min(511, Number(e.target.value))
                );
                updateAddressing(addressing, firstChannel);
              }}
              w="100%"
              textAlign="center"
              variant="custom"
              type="number"
            />
          </Td>
          <Td>
            <Input
              value={addressing.lastChannel}
              onChange={(e) => {
                const firstChannel = Math.max(
                  0 - distanceToLastChannel,
                  Math.min(511, Number(e.target.value) - distanceToLastChannel)
                );
                updateAddressing(addressing, firstChannel);
              }}
              w="100%"
              textAlign="center"
              variant="custom"
              type="number"
            />
          </Td>
        </Tr>
      );
    });
  }, [localAddressings]);

  return (
    <Tabs isFitted variant="enclosed">
      <TabList border="none !important">
        <Tab
          border="none !important"
          bg="bg.mid"
          color="text"
          mr="4"
          borderRadius="md"
          outline="1px solid"
          outlineColor="transparent"
          _selected={{ outlineColor: "primary" }}
        >
          Table
        </Tab>
        <Tab
          border="none !important"
          bg="bg.mid"
          color="text"
          borderRadius="md"
          outline="1px solid"
          outlineColor="transparent"
          _selected={{ outlineColor: "primary" }}
        >
          Matrix
        </Tab>
      </TabList>
      <TabPanels
        mt="3"
        bg="bg.mid"
        h="500px"
        overflowY="auto"
        sx={{
          "&::-webkit-scrollbar": {
            w: "10px",
          },
          "&::-webkit-scrollbar-track": {
            w: "10px",
            bg: "bg.mid",
          },
          "&::-webkit-scrollbar-thumb": {
            borderRadius: "md",
            bg: "primary",
          },
        }}
        overflowX="hidden"
        borderRadius="md"
      >
        <TabPanel>
          <TableContainer>
            <Table variant="custom">
              <Thead>
                <Tr>
                  <Th textAlign="center">Fixture Uid</Th>
                  <Th textAlign="center">First channel</Th>
                  <Th textAlign="center">Last channel</Th>
                </Tr>
              </Thead>
              <Tbody>{fixtureList}</Tbody>
            </Table>
          </TableContainer>
        </TabPanel>
        <TabPanel>
          <svg viewBox="0 0 511"></svg>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

function createPropAddressing(): Addressing {
  const firstChannel = Number((Math.random() * 400).toFixed(0)) + 1;
  return {
    universe: "A",
    firstChannel: firstChannel,
    lastChannel: firstChannel + 4,
    intersections: [],
    fixtureUid: {
      type: UidType.FIXTURE,
      key: Number((Math.random() * 1000).toFixed()),
    },
  };
}
