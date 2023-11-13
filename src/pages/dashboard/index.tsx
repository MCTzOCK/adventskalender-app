/**
 * src/pages/dashboard/index.tsx
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2023 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 13.11.2023
 *
 */

import * as React from "react";
import { useLoggedIn } from "@/util/useLoggedIn";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Box, Flex, Heading, Spinner } from "@chakra-ui/react";
import GridLayout from "@/components/GridLayout";
import { FaPlus } from "react-icons/fa";

export default function Dashboard() {
  const { userInfo, loggedIn, loaded } = useLoggedIn();

  const router = useRouter();

  useEffect(() => {
    if (loaded && !loggedIn) {
      router.push("/account/auth");
    }
  }, [loaded, loggedIn]);

  if (!loaded) {
    return (
      <Flex
        w={"100%"}
        minH={"100vh"}
        h={"fit-content"}
        justifyContent={"center"}
        alignItems={"center"}
        p={[4, 6]}
      >
        <Spinner size={"xl"} />
      </Flex>
    );
  }

  return (
    <>
      <Box p={5}>
        <Heading>Meine Kalender</Heading>
        <GridLayout
          search={{
            allow: true,
            searchFields: true,
          }}
          specialEntries={[
            {
              icon: <FaPlus />,
              onClick: async () => {},
            },
          ]}
          entries={[]}
        />
      </Box>
    </>
  );
}
