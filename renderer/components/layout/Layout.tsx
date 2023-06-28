import React, { ReactElement, useState } from "react";
import { Box, Button, HStack, VStack, useDisclosure } from "@chakra-ui/react";
import { View } from "../../../lib/enums";
import { ReactNode, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  BsHouse,
  BsQuestionCircle,
  BsLamp,
  BsCaretRightSquare,
  BsGrid3X3,
  BsSoundwave,
  BsRocketTakeoff,
  BsGear,
} from "react-icons/bs";
import HExpandable from "./HExpandable";
import { SettingsModal } from "../common/modals";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  const [hoverdView, setHoveredView] = useState<View>(null);
  const { isOpen, onToggle, onClose } = useDisclosure();

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
            h="50px"
            variant="custom"
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
    <Box h="100vh" w="100vw" p="0" m="0" overflow="hidden">
      <HStack
        p="3"
        w="100%"
        h="80px"
        justifyContent="flex-start"
        alignItems="baseline"
        spacing="3"
        borderBottom="1px solid"
        borderColor="bg.mid"
      >
        {navigationTabs}
        <Button
          ml="auto !important"
          order="2"
          onClick={onToggle}
          variant="custom"
        >
          <BsGear />
        </Button>
        <SettingsModal isOpen={isOpen} onClose={onClose} />
      </HStack>
      <Box h="calc(100vh - 80px)" w="100%">
        {children}
      </Box>
    </Box>
  );
}

function getTabIcon(view: View): ReactElement {
  switch (view) {
    case View.HOME:
      return <BsHouse />;
    case View.FIXTURES:
      return <BsLamp />;
    case View.CUE_EDITOR:
      return <BsCaretRightSquare />;
    case View.MAPPING:
      return <BsGrid3X3 />;
    case View.MIR:
      return <BsSoundwave />;
    case View.PERFORMANCE:
      return <BsRocketTakeoff />;
    default:
      return <BsQuestionCircle />;
  }
}
