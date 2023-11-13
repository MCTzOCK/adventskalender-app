/**
 * src/util/rest.ts
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2023 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 13.11.2023
 *
 */
import makeRequest from "@/util/rest/makeRequest";

export async function register(username: string, password: string) {
  return await makeRequest({
    path: "/api/account/auth",
    method: "POST",
    body: {
      username,
      password,
    },
  });
}

export async function login(username: string, password: string) {
  return await makeRequest({
    path: "/api/account/auth",
    method: "POST",
    body: {
      username,
      password,
    },
  });
}

export async function verifyToken(token: string) {
  return await makeRequest({
    path: "/api/account/auth",
    method: "POST",
    body: {
      token,
    },
  });
}
