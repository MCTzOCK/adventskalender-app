/**
 * src/components/NavigationBar.tsx
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2023 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 02.12.2023
 *
 */

import * as React from "react";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import Link from "next/link";

export default function NavigationBar() {
  return (
    <>
      <Flex
        w={"100%"}
        bg={"black"}
        p={4}
        alignItems={"center"}
        justifyContent={"space-between"}
        gap={4}
        direction={["column", "row"]}
      >
        <Flex gap={4} alignItems={"center"} as={Link} href={"/"}>
          <Heading fontWeight={1000} color={"green.500"}>
            Adventskalender
          </Heading>
        </Flex>
        <Flex gap={4} alignItems={"center"}>
          <Button
            backgroundColor={"green.600"}
            _hover={{ backgroundColor: "green.500" }}
            _active={{ backgroundColor: "green.700" }}
            as={Link}
            href={"/dashboard"}
            fontSize={"xl"}
            size={"lg"}
            mt={2}
          >
            Dashboard
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
