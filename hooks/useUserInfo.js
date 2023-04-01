import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function useUserInfo() {
  const { data: session, status: sessionStatus } = useSession();

  const [userInfo, setUserInfo] = useState();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    async function getUserInfo() {
      // i we don't have our session loaded
      if (sessionStatus === "loading") {
        return;
      }

      const response = await fetch(`/api/users?id=6423214a52dad79eb681124c`);
      const data = await response.json();
      console.log(data);

      // setUserInfo(data.user);
      setStatus("done");
    }
    getUserInfo();
  }, [sessionStatus]);

  return { userInfo, status };
}
