/**
 * src/pages/api/calendar/[id]/doors/index.ts
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2023 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 13.11.2023
 *
 */

import { NextApiRequest, NextApiResponse } from "next";
import CalendarModel from "../../../../../util/models/CalendarModel";
import DoorModel from "../../../../../util/models/DoorModel";
import mongoConnect from "@/util/mongoConnect";
import { isAuthenticated } from "@/util/isAuthenticated";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { loggedIn, username, userId } = await isAuthenticated(req);

    if (req.method !== "GET") {
      res.status(405).json({
        error: "Method not allowed",
      });
      return;
    }

    const calendar = await CalendarModel.findOne({
      _id: req.query.id,
    });

    if (!calendar) {
      res.status(404).json({
        error: "Calendar not found",
      });
      return;
    }

    const doors = await DoorModel.find({
      calendar: req.query.id,
    });

    let doorsToReturn = [];

    if (loggedIn && calendar.user.toString() == userId.toString()) {
      doorsToReturn = doors;
    } else {
      const date = new Date();

      if (date.getFullYear() !== calendar.year) {
        doorsToReturn = [];
      } else {
        if (date.getMonth() !== 11) {
          doorsToReturn = [];
        } else {
          doorsToReturn = doors.filter((door) => {
            return door.day <= date.getDate();
          });
        }
      }
    }

    res.status(200).json({
      success: true,
      doors: doorsToReturn,
    });
  } catch (e: any) {
    res.status(500).json({
      error: e.message,
    });
  }
};
