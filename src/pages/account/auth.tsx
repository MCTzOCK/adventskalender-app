/**
 * src/pages/account/auth.tsx
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
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from "@chakra-ui/react";
import CenterBox from "@/components/CenterBox";
import { FaLock, FaUser } from "react-icons/fa";
import PopupManager from "@/util/PopupManager";
import { login } from "@/util/rest";
import UserAuthLogin from "@/components/UserAuthLogin";
import UserAuthRegister from "@/components/UserAuthRegister";

export default function Auth() {
  return (
    <>
      <CenterBox maxW={"600px"}>
        <Heading as={"h1"} size={"xl"} textAlign={"center"}>
          Anmelden
        </Heading>

        <Tabs
          isFitted
          variant={"line"}
          colorScheme={"green"}
          flex={"50%"}
          mt={4}
        >
          <TabList>
            <Tab>Registrieren</Tab>
            <Tab>Anmelden</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <UserAuthRegister />
            </TabPanel>
            <TabPanel>
              <UserAuthLogin />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </CenterBox>
    </>
  );
}
