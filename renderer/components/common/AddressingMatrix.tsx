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
import React, { useMemo, useState } from "react";
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

  const [localAddressings, setLocalAddressings] =
    useState<Addressing[]>(propAddressings);

  const channelCount =
    localAddressings[0].lastChannel - localAddressings[0].firstChannel + 1;

  const updateAddressing = (addressing: Addressing, firstChannel: number) => {
    const idx = localAddressings.indexOf(addressing);
    const updatedAddressing: Addressing = {
      ...addressing,
      firstChannel: firstChannel,
      lastChannel: firstChannel + channelCount - 1,
    };
    const updatedLocalAddressings = [
      ...localAddressings.slice(0, idx),
      updatedAddressing,
      ...localAddressings.slice(idx + 1),
    ];

    setLocalAddressings(updatedLocalAddressings);
  };

  const fixtureTags = useMemo(() => {
    return localAddressings.map((addressing, idx) => {
      return (
        <Tag key={idx} h="25px !important" bg="tag.purple">
          {"#" + addressing.fixtureUid.type + addressing.fixtureUid.key}
        </Tag>
      );
    });
  }, [localAddressings]);

  const fixtureRanges = useMemo(() => {
    return localAddressings.map((addressing, idx) => {
      return (
        <RangeSlider
          key={idx}
          min={1}
          max={511}
          h="25px !important"
          w="100%"
          aria-label={["min", "max"]}
          value={[addressing.firstChannel, addressing.lastChannel]}
          onChange={(value: number[]) => {
            if (value[0] === addressing.firstChannel) {
              updateAddressing(addressing, value[1] - channelCount + 1);
            } else {
              updateAddressing(addressing, value[0]);
            }
          }}
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
                <Text>{addressing.firstChannel}</Text>
                <Text textAlign="right">{addressing.lastChannel}</Text>
              </HStack>
            </RangeSliderFilledTrack>
          </RangeSliderTrack>
          <RangeSliderThumb
            h="23px"
            w="1px"
            index={0}
            color="primary"
            bg="bg.dark"
            borderRadius="sm"
            boxShadow="none"
          />
          <RangeSliderThumb
            h="23px"
            w="1px"
            index={1}
            color="primary"
            bg="bg.dark"
            borderRadius="sm"
            boxShadow="none"
          />
        </RangeSlider>
      );
    });
  }, [localAddressings, updateAddressing]);

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
        <VStack
          alignItems="flex-start"
          gap="5px"
          pl="100p"
          w="2000px !important"
        >
          {fixtureRanges}
        </VStack>
      </HStack>
    </Box>
  );
}

function createPropAddressing(): Addressing {
  const firstChannel = Number((Math.random() * 120).toFixed(0));
  return {
    universe: "A",
    firstChannel: firstChannel,
    lastChannel: firstChannel + 9,
    intersections: [],
    fixtureUid: {
      type: UidType.FIXTURE,
      key: Number((Math.random() * 1000).toFixed()),
    },
  };
}
