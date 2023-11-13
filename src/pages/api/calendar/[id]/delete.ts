/**
 * src/pages/api/calendar/[id]/delete.ts
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2023 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 13.11.2023
 *
 */

import { NextApiRequest, NextApiResponse } from "next";
import CalendarModel from "../../../../util/models/CalendarModel";
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

    if (req.method !== "DELETE") {
      res.status(405).json({
        error: "Method not allowed",
      });
      return;
    }

    const calendar = await CalendarModel.findOne({
      user: userId,
      _id: req.query.id,
    });

    if (!calendar) {
      res.status(404).json({
        error: "Not found",
      });
      return;
    }

    await calendar.deleteOne();

    res.status(200).json({
      success: true,
    });
  } catch (e: any) {
    res.status(500).json({
      error: e.message,
    });
  }
};
