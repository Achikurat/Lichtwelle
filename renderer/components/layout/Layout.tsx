import { Box, Button, Center, HStack, VStack } from "@chakra-ui/react";
import { View } from "../../../lib/enums";
import { ReactNode, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  const router = useRouter();
  const navigationTabs = useMemo(() => {
    return Object.keys(View).map((view, idx) => {
      const isActive = router.pathname.slice(1) === view.toLowerCase();
      return (
        <Link href={"/" + view.toLowerCase()} key={idx}>
          <Button
            borderRadius="md"
            h="100%"
            p="6"
            background={isActive ? "accent" : "darkBackground"}
            color={isActive ? "darkBackground" : "accent"}
            fontSize="md"
            _active={{}}
            _hover={{ boxShadow: "xl" }}
          >
            {View[view]}
          </Button>
        </Link>
      );
    });
  }, [router.pathname]);

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
