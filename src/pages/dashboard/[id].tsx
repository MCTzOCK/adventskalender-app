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
import { getCalendar, myCalendars } from "@/util/rest";
import PopupManager from "@/util/PopupManager";
import { Box, chakra, Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import CenterBox from "@/components/CenterBox";

export default function CalendarViewer() {
  const [calendar, setCalendar] = React.useState<Calendar | null>(null);

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
      <CenterBox maxW={"600px"}>
        <Heading>
          {calendar.name} ({calendar.year})
        </Heading>
        <Box mt={5}>
          <Heading size={"xl"}>Zugriff</Heading>
          <Text fontSize={"xl"}>
            Dieser Adventskalender ist für jede Person mit dem folgenden Link
            erreichbar:&nbsp;
            <chakra.span color={"green.400"}>
              https://adventskalender.ben-siebert.com/c/{calendar._id}
            </chakra.span>
          </Text>
        </Box>
      </CenterBox>
    </>
  );
}
