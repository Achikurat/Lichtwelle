import {
  Box,
  BoxProps,
  HStack,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Addressing } from "../../../lib/types";
import React, { useCallback, useMemo, useState } from "react";
import { UidType } from "../../../lib/enums";

type Props = {
  addressings: Addressing[];
  editable?: boolean;
  onEdit: (addressings: Addressing[]) => void;
} & BoxProps;

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

  const fixtureTags = useMemo(() => {
    return propAddressings.map((addressing, idx) => {
      return (
        <Tag key={idx} h="25px !important" bg="tag.purple">
          {"#" + addressing.fixtureUid.type + addressing.fixtureUid.key}
        </Tag>
      );
    });
  }, []);

  const fixtureRanges = useMemo(() => {
    return propAddressings.map((addressings, idx) => {
      return (
        <RangeSlider
          key={idx}
          min={0}
          max={255}
          h="25px !important"
          w="800px"
          aria-label={["min", "max"]}
          defaultValue={[addressings.firstChannel, addressings.lastChannel]}
        >
          <RangeSliderTrack h="23px" bg="bg.mid">
            <Box
              w="100%"
              h="23px"
              bg="bg.mid"
              border="1px solid"
              borderColor="bg.dark"
            />
            <RangeSliderFilledTrack bg="bg.dark" h="100%" color="primary">
              <HStack px="3" w="100%" h="100%" justifyContent="space-between">
                <Text>{addressings.firstChannel}</Text>
                <Text textAlign="right">{addressings.lastChannel}</Text>
              </HStack>
            </RangeSliderFilledTrack>
          </RangeSliderTrack>
          <RangeSliderThumb
            h="23px"
            w="5px"
            index={0}
            color="primary"
            bg="bg.dark"
            borderRadius="sm"
            boxShadow="none"
          ></RangeSliderThumb>
          <RangeSliderThumb
            h="23px"
            w="5px"
            index={1}
            color="primary"
            bg="bg.dark"
            borderRadius="sm"
            boxShadow="none"
          ></RangeSliderThumb>
        </RangeSlider>
      );
    });
  }, []);

  return (
    <Box
      p="6"
      bg="bg.mid"
      borderRadius="md"
      overflow="scroll"
      css={{
        "&::-webkit-scrollbar": {
          width: "0px",
        },
        "&::-webkit-scrollbar-track": {
          width: "0px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "transparent",
          borderRadius: "0px",
        },
      }}
      {...chakraProps}
    >
      <HStack justifyContent="flex-start" alignItems="flex-start">
        <VStack
          alignItems="flex-start"
          gap="5px"
          position="sticky"
          left="0"
          zIndex="10"
        >
          {fixtureTags}
        </VStack>
        <VStack alignItems="flex-start" gap="5px" pl="100p">
          {fixtureRanges}
        </VStack>
      </HStack>
    </Box>
  );
}

function constraintToViewbox(
  position: [number, number],
  max: [number, number]
): [number, number] {
  return [
    Math.max(0, Math.min(max[0], position[0])),
    Math.max(0, Math.min(max[1], position[1])),
  ];
}

function createPropAddressing(): Addressing {
  const firstChannel = Number((Math.random() * 120).toFixed(0));
  return {
    universe: "A",
    firstChannel: firstChannel,
    lastChannel: firstChannel + 33,
    intersections: [],
    fixtureUid: {
      type: UidType.FIXTURE,
      key: Number((Math.random() * 1000).toFixed()),
    },
  };
}
