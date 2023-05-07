import { Box, Center, HStack } from "@chakra-ui/react";
import { View } from "../../../lib/enums";
import { ReactNode, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
  children: ReactNode;
};

export default function Navigation({ children }: Props) {
  const router = useRouter();
  const navigationTabs = useMemo(() => {
    return Object.keys(View).map((view, idx) => {
      const isActive = router.pathname.slice(1) === view.toLowerCase();
      return (
        <Box
          key={idx}
          h="100%"
          p="3"
          flexGrow="1"
          {...(isActive
            ? { border: "1px solid", borderBottom: "none" }
            : { borderBottom: "1px solid" })}
          borderColor="accent"
        >
          <Center fontSize="md" color="text">
            <Link href={"/" + view.toLowerCase()}>{View[view]}</Link>
          </Center>
        </Box>
      );
    });
  }, [router.pathname]);

  return (
    <HStack
      w="100%"
      h="5vh"
      justifyContent="space-between"
      alignItems="center"
      spacing="0"
    >
      {navigationTabs}
      {children}
    </HStack>
  );
}
