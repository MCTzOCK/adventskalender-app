/**
 * src/components/CenterBox.tsx
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2023 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 13.11.2023
 *
 */

import * as React from "react";
import { Box, Flex } from "@chakra-ui/react";

export default function CenterBox(props: {
  children: React.ReactNode;
  maxW?: string | number | string[] | number[];
}) {
  return (
    <>
      <Flex
        w={"100%"}
        minH={"100vh"}
        h={"fit-content"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box
          w={["90%", "60%"]}
          minH={"200px"}
          maxW={props.maxW || undefined}
          bg={"black"}
          p={4}
          rounded={"xl"}
          shadow={"xl"}
        >
          {props.children}
        </Box>
      </Flex>
    </>
  );
}
