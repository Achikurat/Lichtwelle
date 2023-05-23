import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  Divider,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { BsSave, BsFolder2Open, BsFilePlus } from "react-icons/bs";

function Home() {
  return (
    <Center w="100%" h="100%">
      <Card background="bg.dark">
        <CardHeader color="primary">Home</CardHeader>
        <Divider />
        <CardBody color="text">
          <VStack>
            <Button>
              <BsFilePlus />
              <Text>New</Text>
            </Button>
            <Button>
              <BsSave />
              <Text>Save</Text>
            </Button>
            <Button>
              <BsFolder2Open />
              <Text>Load</Text>
            </Button>
          </VStack>
        </CardBody>
      </Card>
    </Center>
  );
}

export default Home;
