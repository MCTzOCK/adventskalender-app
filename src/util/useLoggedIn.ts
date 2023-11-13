/**
 * src/util/useLoggedIn.ts
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2023 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 13.11.2023
 *
 */

import { useEffect, useState } from "react";
import { verifyToken } from "@/util/rest";

export function useLoggedIn(): {
  loggedIn: boolean;
  loaded: boolean;
  userInfo: {
    username: string;
  };
} {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [userInfo, setUserInfo] = useState({
    username: "",
  });

  useEffect(() => {
    let token: string | null = null;
    const interval = setInterval(() => {
      const newToken = localStorage.getItem("token");
      if (newToken !== null) {
        if (newToken !== token) {
          verifyToken(newToken).then(async (res) => {
            if (res.status === 200) {
              if (res.payload.token) {
                localStorage.setItem("token", res.payload.token);
                token = res.payload.token;

                const r = await verifyToken(token as string);

                if (r.status === 200) {
                  setLoggedIn(true);
                  setUserInfo(r.payload.data);
                } else {
                  setLoggedIn(false);
                }
                return;
              }

              token = newToken;
              setLoggedIn(true);
              setUserInfo(res.payload.data);
            } else {
              token = null;
              setLoggedIn(false);
              localStorage.removeItem("token");
            }
            setLoaded(true);
          });
        }
      } else {
        token = null;
        setLoggedIn(false);
        setLoaded(true);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return {
    loggedIn,
    loaded,
    userInfo,
  };
}
