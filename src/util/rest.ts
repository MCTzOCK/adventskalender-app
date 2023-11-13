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
      action: "register",
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
      action: "login",
    },
  });
}

export async function verifyToken(token: string) {
  return await makeRequest({
    path: "/api/account/auth",
    method: "POST",
    token: token,
    body: {
      action: "verify-token",
    },
  });
}

export async function createCalendar(
  name: string,
  year: number,
  token: string,
) {
  return await makeRequest({
    path: "/api/calendar/create",
    method: "POST",
    token: token,
    body: {
      name,
      year,
    },
  });
}

export async function myCalendars(token: string) {
  return await makeRequest({
    path: "/api/calendar/my",
    method: "GET",
    token: token,
  });
}

export async function deleteCalendar(token: string, id: string) {
  return await makeRequest({
    path: "/api/calendar/" + id + "/delete",
    method: "DELETE",
    token: token,
  });
}

export async function getCalendar(token: string, id: string) {
  return await makeRequest({
    path: "/api/calendar/" + id,
    method: "GET",
    token: token,
  });
}

export async function createDoor(
  token: string,
  id: string,
  title: string,
  description: string,
  image: string,
  day: number,
) {
  return await makeRequest({
    path: "/api/calendar/" + id + "/doors/create",
    method: "POST",
    token: token,
    body: {
      title,
      description,
      image,
      day,
    },
  });
}

export async function getDoors(id: string, token?: string) {
  return await makeRequest({
    path: "/api/calendar/" + id + "/doors",
    method: "GET",
    token: token || undefined,
  });
}
