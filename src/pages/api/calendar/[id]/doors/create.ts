/**
 * src/pages/api/calendar/[id]/doors/create.ts
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

    if (!loggedIn) {
      res.status(401).json({
        error: "Unauthorized",
      });
      return;
    }

    if (req.method !== "POST") {
      res.status(405).json({
        error: "Method not allowed",
      });
      return;
    }

    const { title, description, image, day } = req.body;

    if (!req.query.id || !title || !description || !image) {
      res.status(400).json({
        error: "Bad request",
      });
      return;
    }

    const calendar = await CalendarModel.findOne({
      _id: req.query.id,
      user: userId,
    });

    if (!calendar) {
      res.status(404).json({
        error: "Calendar not found",
      });
      return;
    }

    const existingDoor = await DoorModel.findOne({
      calendar: req.query.id,
      day,
    });

    if (existingDoor) {
      existingDoor.title = title;
      existingDoor.description = description;
      existingDoor.image = image;
      await existingDoor.save();
      res.status(200).json({
        success: true,
      });
      return;
    }

    const door = await DoorModel.create({
      calendar: req.query.id,
      title,
      description,
      image,
      day,
    });

    res.status(200).json({
      success: true,
    });
  } catch (e: any) {
    res.status(500).json({
      error: e.message,
    });
  }
};
