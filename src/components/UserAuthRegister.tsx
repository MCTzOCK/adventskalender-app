/**
 * src/components/UserAuthRegister.tsx
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2023 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 13.11.2023
 *
 */

import * as React from "react";
import PopupManager from "@/util/PopupManager";
import { login, register } from "@/util/rest";
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

export default function UserAuthRegister() {
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

          const res = await register(username, password);

          if (res.status !== 200) {
            await PopupManager.alertAsync({
              title: "Fehler",
              description:
                "Es ist ein Fehler aufgetreten: " + res.payload.error,
            });
            return;
          }

          await PopupManager.alertAsync({
            title: "Erfolgreich",
            description:
              "Du hast dich erfolgreich registriert und kannst dich nun anmelden!",
          });
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
            Registreiren
          </Button>
        </VStack>
      </form>
    </>
  );
}
