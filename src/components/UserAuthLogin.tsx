/**
 * src/components/UserAuthLogin.tsx
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2023 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 13.11.2023
 *
 */

import * as React from "react";
import PopupManager from "@/util/PopupManager";
import { login } from "@/util/rest";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  VStack,
} from "@chakra-ui/react";
import { FaLock, FaUser } from "react-icons/fa";
import { useRouter } from "next/router";

export default function UserAuthLogin() {
  const router = useRouter();

  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          const username = (e.target as HTMLFormElement)["username"].value;
          const password = (e.target as HTMLFormElement)["password"].value;

          if (!username || !password) {
            await PopupManager.alertAsync({
              title: "Fehler",
              description: "Bitte fülle alle Felder aus.",
            });
            return;
          }

          const res = await login(username, password);

          if (res.status !== 200) {
            await PopupManager.alertAsync({
              title: "Fehler",
              description:
                "Es ist ein Fehler aufgetreten: " + res.payload.error,
            });
            return;
          }

          localStorage.setItem("token", res.payload.token);
          router.push("/dashboard");
        }}
      >
        <VStack gap={4} mt={4}>
          <FormControl>
            <FormLabel>Benutzername</FormLabel>
            <InputGroup>
              <InputLeftAddon>
                <FaUser />
              </InputLeftAddon>
              <Input
                type={"text"}
                name={"username"}
                placeholder={"Benutzername"}
              />
            </InputGroup>
          </FormControl>
          <FormControl>
            <FormLabel>Passwort</FormLabel>
            <InputGroup>
              <InputLeftAddon>
                <FaUser />
              </InputLeftAddon>
              <Input
                type={"password"}
                name={"password"}
                placeholder={"Passwort"}
              />
            </InputGroup>
          </FormControl>
          <Button
            type={"submit"}
            colorScheme={"green"}
            variant={"ghost"}
            w={"100%"}
            leftIcon={<FaLock />}
          >
            Anmelden
          </Button>
        </VStack>
      </form>
    </>
  );
}
