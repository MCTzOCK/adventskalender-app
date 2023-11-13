/**
 * src/pages/dashboard/[id].tsx
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2023 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 13.11.2023
 *
 */

import * as React from "react";
import { Calendar } from "@/util/types/Calendar";
import { useLoggedIn } from "@/util/useLoggedIn";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { createDoor, getCalendar, getDoors, myCalendars } from "@/util/rest";
import PopupManager from "@/util/PopupManager";
import {
  Box,
  Button,
  chakra,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Spinner,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import CenterBox from "@/components/CenterBox";
import { Door } from "@/util/types/Door";
import { FaSave } from "react-icons/fa";

export default function CalendarViewer() {
  const [calendar, setCalendar] = React.useState<Calendar | null>(null);
  const [doors, setDoors] = React.useState<Door[]>([]);

  const { userInfo, loggedIn, loaded } = useLoggedIn();

  const router = useRouter();

  useEffect(() => {
    if (loaded && !loggedIn) {
      router.push("/account/auth");
    } else if (loaded && loggedIn) {
      reload();
    }
  }, [loaded, loggedIn, router.query.id]);

  const reload = () => {
    getCalendar(
      localStorage.getItem("token") as string,
      router.query.id as string,
    ).then(async (res) => {
      if (res.status === 200) {
        setCalendar(res.payload.calendar);

        const x = await getDoors(
          res.payload.calendar._id,
          localStorage.getItem("token") as string,
        );

        if (x.status === 200) {
          setDoors(x.payload.doors);
        } else {
          await PopupManager.alertAsync({
            title: "Fehler",
            description:
              "Türchen konnten nicht geladen werden: " + x.payload.error,
          });
        }
      } else {
        await PopupManager.alertAsync({
          title: "Fehler",
          description:
            "Kalender konnten nicht geladen werden: " + res.payload.error,
        });
      }
    });
  };

  if (!loaded || !calendar) {
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
      <CenterBox>
        <Heading>
          {calendar.name} ({calendar.year})
        </Heading>
        <Box mt={5}>
          <Heading size={"xl"}>Zugriff</Heading>
          <Text fontSize={"xl"} mt={3}>
            Dieser Adventskalender ist für jede Person mit dem folgenden Link
            erreichbar:&nbsp;
            <chakra.span color={"green.400"}>
              https://adventskalender.ben-siebert.com/c/{calendar._id}
            </chakra.span>
          </Text>
        </Box>
        <Box mt={5}>
          <Heading size={"xl"}>Türchen</Heading>
          <TableContainer mt={5}>
            <Table>
              <Thead>
                <Tr>
                  <Th>Tag</Th>
                  <Th>Titel</Th>
                </Tr>
              </Thead>
              <Tbody>
                {Array.from(Array(24).keys()).map((i) => {
                  const door = doors.find((d) => d.day === i + 1);
                  return (
                    <Tr
                      key={i}
                      onClick={async () => {
                        PopupManager.alert({
                          title: "Türchen " + (i + 1),
                          description: (
                            <>
                              <form
                                onSubmit={async (e) => {
                                  e.preventDefault();

                                  const day = i + 1;
                                  const title = (
                                    (
                                      e.target as HTMLFormElement
                                    ).elements.namedItem(
                                      "title",
                                    ) as HTMLInputElement
                                  ).value;
                                  const desc = (
                                    (
                                      e.target as HTMLFormElement
                                    ).elements.namedItem(
                                      "description",
                                    ) as HTMLTextAreaElement
                                  ).value;

                                  const res = await createDoor(
                                    localStorage.getItem("token") as string,
                                    calendar._id,
                                    title,
                                    desc,
                                    (
                                      document.getElementById(
                                        "door-img-" + i,
                                      ) as HTMLImageElement
                                    ).src,
                                    day,
                                  );

                                  if (res.status === 200) {
                                    await PopupManager.alertAsync({
                                      title: "Erfolgreich",
                                      description:
                                        "Türchen wurde erfolgreich gespeichert",
                                    });
                                    reload();
                                  } else {
                                    await PopupManager.alertAsync({
                                      title: "Fehler",
                                      description:
                                        "Türchen konnte nicht gespeichert werden: " +
                                        res.payload.error,
                                    });
                                  }
                                }}
                              >
                                <VStack gap={4}>
                                  <Image
                                    src={
                                      door
                                        ? door.image
                                        : "https://codeup.space/codeup-splash-github.jpg"
                                    }
                                    id={"door-img-" + i}
                                    rounded={"xl"}
                                    shadow={"xl"}
                                    cursor={"pointer"}
                                    onClick={async () => {
                                      const fileInput =
                                        document.createElement("input");
                                      fileInput.type = "file";
                                      fileInput.accept = "image/*";

                                      fileInput.addEventListener(
                                        "change",
                                        async (e) => {
                                          const file = (e.target as any)
                                            .files[0];

                                          if (!file) {
                                            return;
                                          }

                                          const base64 = await new Promise(
                                            (resolve, reject) => {
                                              const reader = new FileReader();
                                              reader.readAsDataURL(file);
                                              reader.onload = () =>
                                                resolve(reader.result);
                                              reader.onerror = (error) =>
                                                reject(error);
                                            },
                                          );

                                          const img = document.getElementById(
                                            "door-img-" + i,
                                          ) as HTMLImageElement;

                                          img.src = base64 as string;
                                        },
                                      );

                                      fileInput.onchange = async (e) => {};
                                      (
                                        document.querySelector(
                                          "#manual-mount-point",
                                        ) as HTMLDivElement
                                      ).appendChild(fileInput);
                                      fileInput.click();
                                    }}
                                  />
                                  <Text>
                                    Klicke auf das Bild, um es zu ändern
                                  </Text>
                                  <FormControl>
                                    <FormLabel>Titel</FormLabel>
                                    <Input
                                      name={"title"}
                                      placeholder={"Titel"}
                                      defaultValue={door ? door.title : ""}
                                    />
                                  </FormControl>
                                  <FormControl>
                                    <FormLabel>Beschreibung</FormLabel>
                                    <Textarea
                                      name={"description"}
                                      placeholder={"Beschreibung"}
                                      defaultValue={
                                        door ? door.description : ""
                                      }
                                    />
                                  </FormControl>
                                  <Button
                                    type={"submit"}
                                    colorScheme={"green"}
                                    w={"100%"}
                                    variant={"ghost"}
                                    leftIcon={<FaSave />}
                                  >
                                    Speichern
                                  </Button>
                                </VStack>
                              </form>
                            </>
                          ),
                        });
                      }}
                    >
                      <Td>{i + 1}</Td>
                      <Td>{door ? door.title : "Kein Türchen hinzugefügt"}</Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </CenterBox>
    </>
  );
}
