import useUserInfo from "@/hooks/useUserInfo";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import Avatar from "./Avatar";
import Upload from "./Upload";

const PostForm = ({ onPost, compact, parent, placeholder }) => {
  const { userInfo, status } = useUserInfo();
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);

  if (status === "loading") {
    return "";
  }

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    await axios.post("/api/posts", { text, parent, images });

    setText("");
    setImages([]);

    if (onPost) {
      onPost();
    }
  };

  return (
    <form className="mx-5" onSubmit={handlePostSubmit}>
      <div className={`${compact ? "items-center" : ""} flex`}>
        <Avatar src={userInfo?.image} />

        <div className="grow pl-2">
          <Upload onUploadFinish={(src) => setImages((prev) => [...prev, src])}>
            {(isUploading) => (
              <div>
                <textarea
                  className={`${
                    compact ? "h-10 mt-1" : "h-24"
                  } w-full p-2 bg-transparent text-twitterWhite outline-none`}
                  placeholder={placeholder}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                <div className="flex -mx-2">
                  {images.length > 0 &&
                    images.map((img) => (
                      <div className="h-24 my-2" key="">
                        <Image
                          className="h-24 w-auto"
                          src={img}
                          alt="Uploaded image"
                        />
                      </div>
                    ))}
                  {isUploading && (
                    <div className="h-24 w-24 m-2 bg-twitterBorder flex items-center justify-center">
                      Uploading...
                    </div>
                  )}
                </div>
              </div>
            )}
          </Upload>

          {!compact && (
            <div className="text-right border-t border-twitterBorder pt-2 pb-2">
              <button
                type="submit"
                className="bg-twitterBlue text-white px-5 py-1 rounded-full"
              >
                Tweet
              </button>
            </div>
          )}
        </div>

        {compact && (
          <div className="pl-2">
            <button
              type="submit"
              className="bg-twitterBlue text-white px-5 py-1 rounded-full"
            >
              Tweet
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

export default PostForm;
