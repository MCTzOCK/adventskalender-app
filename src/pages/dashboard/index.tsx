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
import { FaEye, FaPlus, FaTrash } from "react-icons/fa";
import { Calendar } from "@/util/types/Calendar";
import { createCalendar, deleteCalendar, myCalendars } from "@/util/rest";
import PopupManager from "@/util/PopupManager";

export default function Dashboard() {
  const [calendars, setCalendars] = React.useState<Calendar[]>([]);

  const { userInfo, loggedIn, loaded } = useLoggedIn();

  const router = useRouter();

  useEffect(() => {
    if (loaded && !loggedIn) {
      router.push("/account/auth");
    } else if (loaded && loggedIn) {
      reload();
    }
  }, [loaded, loggedIn]);

  const reload = () => {
    myCalendars(localStorage.getItem("token") as string).then(async (res) => {
      if (res.status === 200) {
        setCalendars(res.payload.calendar);
      } else {
        await PopupManager.alertAsync({
          title: "Fehler",
          description:
            "Kalender konnten nicht geladen werden: " + res.payload.error,
        });
      }
    });
  };

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
              onClick: async () => {
                const name = await PopupManager.promptAsync({
                  title: "Neuer Kalender",
                  helperText:
                    "Bitte geben Sie einen Namen für den Kalender ein.",
                });
                if (!name) {
                  return;
                }

                const year = await PopupManager.promptAsync({
                  title: "Neuer Kalender",
                  helperText: "Bitte geben Sie ein Jahr für den Kalender ein.",
                });

                if (!year) {
                  return;
                }

                if (!parseInt(year)) {
                  await PopupManager.alertAsync({
                    title: "Fehler",
                    description: "Bitte geben Sie eine Zahl ein.",
                  });
                  return;
                }

                const res = await createCalendar(
                  name,
                  parseInt(year),
                  localStorage.getItem("token") as string,
                );

                if (res.status !== 200) {
                  await PopupManager.alertAsync({
                    title: "Fehler",
                    description: "Der Kalender konnte nicht erstellt werden.",
                  });
                  return;
                }

                await PopupManager.alertAsync({
                  title: "Erfolg",
                  description: "Der Kalender wurde erfolgreich erstellt.",
                });

                reload();
              },
            },
          ]}
          entries={
            calendars
              ? calendars.map((c) => {
                  return {
                    title: c.name + " (" + c.year + ")",
                    fields: [],
                    buttonRows: [
                      {
                        buttons: [
                          {
                            text: "Öffnen",
                            onClick: () => {
                              router.push("/dashboard/" + c._id);
                            },
                            colorScheme: "green",
                            icon: <FaEye />,
                          },
                          {
                            text: "Löschen",
                            onClick: async () => {
                              if (
                                !(await PopupManager.confirmAsync({
                                  title: "Löschen",
                                  question:
                                    "Willst du den Kalender wirklich löschen?",
                                }))
                              )
                                return;

                              const res = await deleteCalendar(
                                localStorage.getItem("token") as string,
                                c._id,
                              );

                              if (res.status !== 200) {
                                await PopupManager.alertAsync({
                                  title: "Fehler",
                                  description:
                                    "Der Kalender konnte nicht gelöscht werden.",
                                });
                                return;
                              }

                              await PopupManager.alertAsync({
                                title: "Erfolg",
                                description:
                                  "Der Kalender wurde erfolgreich gelöscht.",
                              });

                              reload();
                            },
                            colorScheme: "red",
                            icon: <FaTrash />,
                          },
                        ],
                      },
                    ],
                  };
                })
              : []
          }
        />
      </Box>
    </>
  );
}
