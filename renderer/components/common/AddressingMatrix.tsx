import { Box, BoxProps } from "@chakra-ui/react";
import { Addressing } from "../../../lib/types";
import { useCallback, useEffect, useState } from "react";

type Props = {
  addressings: Addressing[];
  editable?: boolean;
  matrixSize: [number, number];
  initMatrixZoom: number;
  onEdit: (addressings: Addressing[]) => void;
} & BoxProps;

export default function AddressingMatrix({
  addressings,
  editable,
  matrixSize,
  initMatrixZoom,
  onEdit,
  ...chakraProps
}: Props) {
  const [viewboxPosition, setViewboxPosition] = useState<[number, number]>([
    0, 0,
  ]);
  const [isMiddleMouseDown, setIsMiddleMouseDown] = useState<boolean>();
  const [matrixZoom, setMatrixZoom] = useState<number>(initMatrixZoom);

  const canvasSize = [256 * 25, 500];

  const channelRuler = [];
  for (let i = 0; i < 256; i++) {
    channelRuler.push(
      <>
        <text
          x={i * 25}
          y={viewboxPosition[1] + 10}
          fontSize={8}
          fontFamily="Menlo, monospace"
          stroke="#DE8449"
        >
          {i}
        </text>
        <line
          x1={i * 25 + 20}
          y1={0}
          x2={i * 25 + 20}
          y2={canvasSize[1]}
          stroke="#2b2a33"
          strokeWidth={1}
        />
      </>
    );
  }

  const fixtureRuler = [];
  for (let i = 0; i < 30; i++) {
    channelRuler.push(
      <>
        <text
          x={viewboxPosition[0] + 5}
          y={i * 25}
          fontSize={8}
          fontFamily="Menlo, monospace"
          stroke="#DE8449"
        >
          {i}
        </text>
        <line
          x1={0}
          y1={i * 25 + 20}
          x2={canvasSize[0]}
          y2={i * 25 + 20}
          stroke="#2b2a33"
          strokeWidth={1}
        />
      </>
    );
  }

  const viewboxSize = [matrixSize[0] * matrixZoom, matrixSize[1] * matrixZoom];
  const maxViewboxPosition = [
    canvasSize[0] - viewboxSize[0],
    canvasSize[1] - viewboxSize[1],
  ] as [number, number];

  const onMouseMovement = useCallback(
    (e: MouseEvent) => {
      if (isMiddleMouseDown) {
        const newPosition = [
          viewboxPosition[0] - e.movementX * 2 * matrixZoom,
          viewboxPosition[1] - e.movementY * 2 * matrixZoom,
        ] as [number, number];
        setViewboxPosition(
          constraintToViewbox(newPosition, maxViewboxPosition)
        );
      }
    },
    [isMiddleMouseDown, viewboxPosition, setViewboxPosition, matrixZoom]
  );

  return (
    <Box
      p="6"
      bg="bg.mid"
      borderRadius="md"
      onMouseDown={(e) => {
        if (e.button === 1) {
          setIsMiddleMouseDown(true);
        }
      }}
      onMouseUp={(e) => {
        if (e.button === 1) {
          setIsMiddleMouseDown(false);
        }
      }}
      onMouseMove={onMouseMovement}
      {...chakraProps}
      onMouseLeave={() => {
        setIsMiddleMouseDown(false);
      }}
      onWheel={(e) => {
        console.log(e.deltaY);

        if (e.deltaY > 0) {
          setMatrixZoom(matrixZoom + 0.1);
        } else {
          setMatrixZoom(matrixZoom - 0.1);
        }
      }}
      w={`${matrixSize[0]}px`}
      h={`${matrixSize[1]}px`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`${viewboxPosition[0]} ${viewboxPosition[1]} ${viewboxSize[0]} ${viewboxSize[1]}`}
      >
        {channelRuler}
        {fixtureRuler}
      </svg>
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
