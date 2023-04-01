import useUserInfo from "@/hooks/useUserInfo";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import Avatar from "./Avatar";

const PostForm = ({ onPost }) => {
  const { userInfo, status } = useUserInfo();
  const [text, setText] = useState("");

  if (status === "loading") {
    return "";
  }

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/posts", { text });
    setText("");
    onPost();
  };

  return (
    <form className="mx-5" onSubmit={handlePostSubmit}>
      <div className="flex">
        <Avatar src={userInfo?.image} />

        <div className="grow pl-2">
          <textarea
            className="w-full p-2 bg-transparent text-twitterWhite outline-none"
            placeholder="What's happening?"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="text-right border-t border-twitterBorder pt-2 pb-2">
            <button
              type="submit"
              className="bg-twitterBlue text-white px-5 py-1 rounded-full"
            ></button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PostForm;
