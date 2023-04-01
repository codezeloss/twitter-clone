import useUserInfo from "@/hooks/useUserInfo";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";

const UsernameForm = () => {
  // GET user infos
  const { userInfo, status } = useUserInfo();
  const [username, setUsername] = useState("");
  const router = useRouter();

  //
  useEffect(() => {
    if (status === "loading") {
      return "";
    }

    if (username === "") {
      const defaultUsername = userInfo?.email.split("@"[0]);
      setUsername(defaultUsername);
    }
  }, []);

  //
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await axios.put("/api/posts", username);
    router.reload();
  };

  if (status === "loading") {
    return "";
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <form className="text-center" onSubmit={handleFormSubmit}>
        <h1 className="text-xl mb-2">Pick a username</h1>
        <input
          className="block mb-2 bg-twitterBorder px-3 py-2 rounded-full outline-none"
          type="text"
          placeholder={"username"}
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <button
          type="submit"
          className="block bg-twitterBlue w-full rounded-full py-2"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default UsernameForm;
