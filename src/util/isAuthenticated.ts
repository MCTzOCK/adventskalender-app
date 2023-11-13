/**
 * src/util/isAuthenticated.ts
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2023 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 13.11.2023
 *
 */

import { NextApiRequest } from "next";
import mongoConnect from "@/util/mongoConnect";
import { verify } from "jsonwebtoken";
import UserModel from "@/util/models/UserModel";

export async function isAuthenticated(req: NextApiRequest): Promise<{
  loggedIn: boolean;
  username: string;
  userId: string;
}> {
  if (!req.headers.authorization) {
    return {
      loggedIn: false,
      username: "",
      userId: "",
    };
  }

  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return {
      loggedIn: false,
      username: "",
      userId: "",
    };
  }

  try {
    await mongoConnect();

    const decoded = verify(token, process.env.JWT_SECRET as string);

    if (!decoded) {
      return {
        loggedIn: false,
        username: "",
        userId: "",
      };
    }

    const user = await UserModel.findOne({
      username: (decoded as any).username,
    });

    if (!user) {
      return {
        loggedIn: false,
        username: "",
        userId: "",
      };
    }

    return {
      loggedIn: true,
      username: user.username,
      userId: user._id,
    };
  } catch (e) {
    return {
      loggedIn: false,
      username: "",
      userId: "",
    };
  }
}
