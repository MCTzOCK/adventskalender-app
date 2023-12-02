/**
 * src/components/Door.tsx
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2023 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 13.11.2023
 *
 */

import * as React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

export default function Door(props: {
  text: string;
  locked: boolean;
  onClick: () => void;
  isSpecial?: boolean;
}) {
  return (
    <>
      <Flex
        fontSize={"4xl"}
        backgroundColor={props.locked ? "gray.700" : "red.600"}
        w={"100%"}
        maxW={"100px"}
        aspectRatio={1 / 1.5}
        rounded={"md"}
        justifyContent={"center"}
        border={"8px solid"}
        borderColor={props.locked ? "gray.800" : "red.900"}
        borderBottomStyle={"none"}
        position={"relative"}
        cursor={props.locked ? "not-allowed" : "pointer"}
        onClick={() => {
          if (!props.locked) {
            props.onClick();
          }
        }}
      >
        <Text as={"span"} fontWeight={"bold"}>
          {props.text}
        </Text>
        <Box
          style={{
            content: '""',
            position: "absolute",
            top: "60%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "10px",
            height: "10px",
            borderLeft: "50px solid transparent",
            borderRight: "20px solid yellow",
          }}
        ></Box>
      </Flex>
    </>
  );
}
