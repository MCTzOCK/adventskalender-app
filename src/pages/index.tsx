/**
 * src/pages/index.tsx
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2023 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 13.11.2023
 *
 */

import * as React from "react";
import {
  Box,
  Button,
  ButtonGroup,
  chakra,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Box h={"100vh"} minH={"fit-content"} w={"100%"}>
        <Flex
          w={"100%"}
          h={"100%"}
          minH={"fit-content"}
          alignItems={"center"}
          justifyContent={"center"}
          direction={["column", "row"]}
          gap={4}
        >
          <Image
            src={"/christmas-background.jpg"}
            width={"100%"}
            height={"100vh"}
            objectFit={"cover"}
            position={"absolute"}
            zIndex={-1}
            filter={"blur(10px)"}
            alt={""}
          />
          <Flex justifyContent={"center"} direction={"column"} gap={4} p={4}>
            <Heading
              color={"green.500"}
              fontSize={["6xl", "8xl"]}
              fontWeight={900}
              wordBreak={"break-word"}
            >
              Adventskalender
            </Heading>
            <Text fontSize={["2xl", "4xl"]} fontWeight={700}>
              Bereite anderen eine&nbsp;
              <chakra.span color={"green.500"} fontWeight={900}>
                Freude
              </chakra.span>
              !
            </Text>
            <Text fontSize={["2xl", "4xl"]} fontWeight={700}>
              Erstelle eigene{" "}
              <chakra.span color={"green.500"} fontWeight={900}>
                Adventskalender
              </chakra.span>
              !
            </Text>
            <ButtonGroup w={"100%"} justifyContent={["center", "right"]}>
              <Button
                backgroundColor={"green.600"}
                size={"lg"}
                _hover={{ backgroundColor: "green.500" }}
                _active={{ backgroundColor: "green.700" }}
                as={Link}
                href={"/account/auth"}
                fontSize={"xl"}
              >
                Los geht's
              </Button>
            </ButtonGroup>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
