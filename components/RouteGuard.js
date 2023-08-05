import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { isAuthenticated,  } from "@/lib/authenticate";
import { useAtom } from "jotai";
import { favouritesAtom, searchHistoryAtom } from "@/store";
import { getFavourites, getHistory } from "@/lib/userData";

const PUBLIC_PATHS = ["/login", "/", "/_error", "/register"];

export default function RouteGuard(props) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [favouritesList, setFavourites] = useAtom(favouritesAtom);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);


  function authCheck(url) {
    const path = url.split("?")[0];
    if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
      setAuthorized(false);
      router.push("/login");
    } else {
      setAuthorized(true);
    }
  }

  async function updateAtoms() {
    try {
      setFavourites(await getFavourites());
      setSearchHistory(await getHistory());
    } catch (error) {
      console.error("Error updating atoms:", error);
    }
  }

  useEffect(() => {
    updateAtoms();
    authCheck(router.pathname);

    router.events.on("routeChangeComplete", authCheck);

    return () => {
      router.events.off("routeChangeComplete", authCheck);
    };
  },[]);

  return <>{authorized && props.children}</>;
}
