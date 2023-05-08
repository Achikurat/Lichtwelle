import React, { ReactElement, useState } from "react";
import { Box, Button, Center, Collapse, HStack, VStack } from "@chakra-ui/react";
import { View } from "../../../lib/enums";
import { ReactNode, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { BsHouse, BsQuestionCircle, BsLamp, BsFolder, BsCaretRightSquare, BsGrid3X3, BsSoundwave, BsRocketTakeoff } from "react-icons/bs"
import HExpandable from "./HExpandable";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  const [hoverdView, setHoveredView] = useState<View>(null);

  const router = useRouter();
  const navigationTabs = useMemo(() => {
    return Object.keys(View).map((view, idx) => {
      const isActive = router.pathname.slice(1) === view.toLowerCase();
      return (
        <Link href={"/" + view.toLowerCase()} key={idx}>
          <Button
          isActive={isActive}
            onMouseEnter={() => setHoveredView(View[view])}
            onMouseLeave={() => setHoveredView(null)}
            borderRadius="md"
            h="100%"
          >
            <HStack>
            {getTabIcon(View[view])}
            <HExpandable isVisible={hoverdView === View[view]}>
              {View[view]}
            </HExpandable>
            </HStack>
          </Button>
        </Link>
      );
    });
  }, [router.pathname, hoverdView, setHoveredView]);

  return (
    <Center h="100vh" w="100vw" p="3">
      <VStack
        h="100%"
        w="100%"
        justifyContent="flex-start"
        alignItems="stretch"
        spacing="3"
      >
        <HStack
          h="50px"
          justifyContent="flex-start"
          alignItems="baseline"
          spacing="3"
        >
          {navigationTabs}
        </HStack>
        <Box
          flexGrow="1"
          background="darkBackground"
          w="100%"
          h="100%"
          borderRadius="md"
          boxShadow="inner"
        >
          {children}
        </Box>
      </VStack>
    </Center>
  );
}

function getTabIcon(view: View): ReactElement {

  switch(view){
    case View.HOME:
      return <BsHouse />;
    case View.FIXTURES:
      return <BsLamp />
    case View.GROUPS:
      return <BsFolder />
    case View.CUE_EDITOR:
      return <BsCaretRightSquare />
    case View.MAPPING:
      return <BsGrid3X3 />
    case View.MIR:
      return <BsSoundwave />
    case View.PERFORMANCE:
      return <BsRocketTakeoff />
    default:
      return <BsQuestionCircle />
  }
}
