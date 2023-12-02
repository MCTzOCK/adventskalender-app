/**
 * src/components/Calendar.tsx
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2023 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 13.11.2023
 *
 */

import * as React from "react";
import { Box, Flex, Grid, Heading } from "@chakra-ui/react";
import Door from "@/components/Door";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Calendar(props: {
  name: string;
  year: number;
  openDoor: (d: number) => void;
}) {
  const router = useRouter();
  const day = new Date().getDate();

  return (
    <>
      <Flex
        w={"100%"}
        minH={"100vh"}
        h={"fit-content"}
        justifyContent={"center"}
        alignItems={"center"}
        p={[4, 6]}
      >
        <Box
          rounded={"md"}
          borderColor={"green.700"}
          borderStyle={"solid"}
          borderWidth={"4px"}
          padding={4}
          h={"fit-content"}
          minH={"100%"}
          bgImage={"url(/christmas-background.jpg)"}
          bgSize={"cover"}
          bgPosition={"center"}
          w={["100%", "60%"]}
        >
          <Heading as={"h1"} size={"2xl"} textAlign={"center"}>
            {props.name} {props.year}
          </Heading>
          <Grid
            mt={6}
            templateColumns={[
              "repeat(3, 1fr)",
              "repeat(4, 1fr)",
              "repeat(5, 1fr)",
              "repeat(5, 1fr)",
            ]}
            gap={2}
          >
            {Array.from(Array(24).keys()).map((i) => {
              return (
                <Door
                  text={(i + 1).toString()}
                  locked={day < i + 1}
                  onClick={() => {
                    props.openDoor(i + 1);
                  }}
                  isSpecial={i === 23}
                />
              );
            })}
          </Grid>
        </Box>
      </Flex>
    </>
  );
}
