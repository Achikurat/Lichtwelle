import {
  Box,
  BoxProps,
  Button,
  HStack,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  TabPanelsProps,
  Table,
  TableContainer,
  Tabs,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Addressing } from "../../../lib/types";
import React, { useMemo } from "react";
import { BsPlusLg, BsTrash } from "react-icons/bs";

type Props = {
  channelCount: number;
  addressings: Addressing[];
  onEdit: (addressings: Addressing[]) => void;
} & TabPanelsProps;

export default function AddressingEdit({
  channelCount,
  addressings,
  onEdit,
  ...chakraProps
}: Props) {
  const updateAddressing = (addressing: Addressing, firstChannel: number) => {
    const idx = addressings.indexOf(addressing);
    const updatedAddressing: Addressing = {
      ...addressing,
      firstChannel: firstChannel,
      lastChannel: firstChannel + channelCount - 1,
    };
    const updatedLocalAddressings = [
      ...addressings.slice(0, idx),
      updatedAddressing,
      ...addressings.slice(idx + 1),
    ];

    onEdit(updatedLocalAddressings);
  };

  const addAddressing = (idx: number) => {
    const newAddressing: Addressing = {
      firstChannel: 1,
      lastChannel: channelCount,
      intersections: [],
      universe: "A",
    };

    const updatedLocalAddressings = [
      ...addressings.slice(0, idx + 1),
      newAddressing,
      ...addressings.slice(idx + 1),
    ];

    onEdit(updatedLocalAddressings);
  };

  const deleteAddressing = (idx: number) => {
    const updatedLocalAddressings = [
      ...addressings.slice(0, idx),
      ...addressings.slice(idx + 1),
    ];

    onEdit(updatedLocalAddressings);
  };

  const fixtureList = useMemo(() => {
    return addressings.map((addressing, idx) => {
      return (
        <>
          <Tr key={idx}>
            <Td>
              <Box h="5px" />
            </Td>
          </Tr>
          <Tr key={idx + 0.5}>
            <Td bg="bg.dark" borderLeftRadius="md">
              <Text w="100%" color="primary" textAlign="center">
                {" "}
                {"#" + idx}
              </Text>
            </Td>
            <Td bg="bg.dark">
              <Input
                p="2 !important"
                value={addressing.universe}
                onChange={(e) => {}}
                w="100%"
                textAlign="center"
                variant="custom"
                maxLength={1}
              />
            </Td>
            <Td bg="bg.dark">
              <Input
                p="2 !important"
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
            <Td bg="bg.dark">
              <Input
                p="2 !important"
                value={addressing.lastChannel}
                onChange={(e) => {
                  const firstChannel = Math.max(
                    1 - channelCount,
                    Math.min(511, Number(e.target.value) - (channelCount - 1))
                  );
                  updateAddressing(addressing, firstChannel);
                }}
                w="100%"
                textAlign="center"
                variant="custom"
                type="number"
              />
            </Td>
            <Td bg="bg.dark" borderRightRadius="md">
              <HStack p="3" borderRadius="md">
                <Button p="1" onClick={() => addAddressing(idx)}>
                  <BsPlusLg />
                </Button>
                <Button p="1" onClick={() => deleteAddressing(idx)}>
                  <BsTrash />
                </Button>
              </HStack>
            </Td>
          </Tr>
        </>
      );
    });
  }, [
    addressings,
    channelCount,
    addAddressing,
    deleteAddressing,
    updateAddressing,
  ]);

  const fixtureMatrixRow = useMemo(() => {
    return addressings.map((addressing, idx) => {
      return (
        <rect
          key={idx}
          x={addressing.firstChannel}
          y={idx * 20}
          width={channelCount - 1}
          height={20}
          fill="primary"
          stroke="primary"
        />
      );
    });
  }, [addressings, channelCount]);

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
          Editor
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
          Visualizer
        </Tab>
      </TabList>
      <TabPanels
        mt="3"
        bg="bg.mid"
        overflowY="auto"
        sx={{
          "&::-webkit-scrollbar": {
            w: "10px",
            borderRadius: "md",
          },
          "&::-webkit-scrollbar-track": {
            w: "10px",
            bg: "bg.mid",
            borderRadius: "md",
          },
          "&::-webkit-scrollbar-thumb": {
            borderRadius: "md",
            bg: "primary",
          },
        }}
        overflowX="hidden"
        borderRadius="md"
        {...chakraProps}
      >
        <TabPanel>
          <TableContainer width="100% !important">
            <Table variant="custom" size="sm">
              <Thead>
                <Tr>
                  <Th textAlign="center">#</Th>
                  <Th textAlign="center">Universe</Th>
                  <Th textAlign="center">First ch.</Th>
                  <Th textAlign="center">Last ch.</Th>
                  <Th textAlign="center">Insert/Delete</Th>
                </Tr>
              </Thead>
              <Tbody>{fixtureList}</Tbody>
            </Table>
          </TableContainer>
          <Button
            onClick={() => addAddressing(addressings.length)}
            background="transparent"
            border="2px dashed"
            borderColor="bg.dark"
            color="bg.dark"
            w="100%"
            h="50px"
            mt="20px"
            _hover={{
              borderColor: "primary",
              color: "primary",
            }}
            _active={{
              color: "bg.dark",
              backgroundColor: "primary !important",
            }}
          >
            <BsPlusLg size="40px" />
          </Button>
        </TabPanel>
        <TabPanel>
          <svg
            viewBox={`0 0 511 ${
              addressings.length > 0 ? addressings.length * 20 : 10
            }`}
          >
            {fixtureMatrixRow}
          </svg>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
