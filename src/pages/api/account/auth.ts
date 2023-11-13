/**
 * src/pages/api/account/auth.ts
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2023 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 13.11.2023
 *
 */

import { NextApiRequest, NextApiResponse } from "next";
import mongoConnect from "@/util/mongoConnect";
import { createHash } from "crypto";
import UserModel from "@/util/models/UserModel";
import * as jwt from "jsonwebtoken";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    await mongoConnect();

    const { action } = req.body;

    if (action === "login") {
      const { username, password } = req.body;

      if (!username || !password) {
        res.status(400).json({ error: "Bad Request" });
        return;
      }

      const user = await UserModel.findOne({
        username: username,
      });

      if (!user) {
        res.status(400).json({ error: "Bad Request" });
        return;
      }

      const token = jwt.sign(
        {
          username: username,
        },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "1y",
        },
      );

      res.status(200).json({ success: true, token: token });
    } else if (action === "verify-token") {
      if (!req.headers.authorization) {
        res.status(400).json({ error: "Bad Request" });
        return;
      }

      const token = req.headers.authorization.split(" ")[1];

      if (!token) {
        res.status(400).json({ error: "Bad Request" });
        return;
      }

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

        const user = await UserModel.findOne({
          username: (decoded as any).username as string,
        });

        if (!user) {
          res.status(400).json({ error: "Bad Request" });
          return;
        }

        res.status(200).json({ success: true, username: user.username });
      } catch (e) {
        res.status(400).json({ error: "Bad Request" });
      }
    } else if (action === "register") {
      const { username, password } = req.body;

      if (!username || !password) {
        res.status(400).json({ error: "Bad Request" });
        return;
      }

      if (
        (await UserModel.find({
          username: username,
        })) != null
      ) {
        res.status(400).json({ error: "Username already taken" });
        return;
      }

      const user = await UserModel.create({
        username: username,
        password: createHash("sha256").update(password).digest("hex"),
      });

      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ error: "Bad Request" });
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
}
