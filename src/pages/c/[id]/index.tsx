/**
 * src/pages/c/[id]/index.tsx
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2023 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 13.11.2023
 *
 */

import * as React from "react";
import { Calendar as ICalendar } from "@/util/types/Calendar";
import { Door } from "@/util/types/Door";
import { useLoggedIn } from "@/util/useLoggedIn";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getCalendar, getDoors } from "@/util/rest";
import PopupManager from "@/util/PopupManager";
import { Flex, Heading, Image, Spinner, Text } from "@chakra-ui/react";
import Calendar from "../../../components/Calendar";

export default function Index() {
  const [calendar, setCalendar] = React.useState<ICalendar | null>(null);
  const [doors, setDoors] = React.useState<Door[]>([]);

  const router = useRouter();

  useEffect(() => {
    if (!router.query.id) return;

    reload();
  }, [router.query.id]);

  const reload = () => {
    getCalendar(
      localStorage.getItem("token") as string,
      router.query.id as string,
    ).then(async (res) => {
      if (res.status === 200) {
        setCalendar(res.payload.calendar);
        let c = res.payload.calendar;
        const date = new Date();
        if (c.year !== date.getFullYear() || date.getMonth() !== 11) {
          await PopupManager.alertAsync({
            title: "Fehler",
            description: "Dieser Kalender ist nicht verfügbar.",
          });
          router.push("/");
        }

        const x = await getDoors(res.payload.calendar._id);

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

  if (!doors || !calendar) {
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
      <Calendar
        name={calendar.name}
        year={calendar.year}
        openDoor={async (door) => {
          let d = doors.find((d) => d.day === door);
          if (!d) {
            await PopupManager.alertAsync({
              title: "Türchen nicht vorhanden",
              description: "Dieses Türchen ist nicht vorhanden!",
            });
            return;
          }

          await PopupManager.alertAsync({
            title: "Türchen " + door,
            description: (
              <>
                <Image
                  src={
                    door
                      ? d.image
                      : "https://codeup.space/codeup-splash-github.jpg"
                  }
                  rounded={"xl"}
                  shadow={"xl"}
                  w={"100%"}
                />
                <Heading size={"xl"} textAlign={"center"}>
                  {d.title}
                </Heading>
                <Text fontSize={"xl"}>{d.description}</Text>
              </>
            ),
          });
        }}
      />
    </>
  );
}
