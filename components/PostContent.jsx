import Avatar from "./Avatar";
import ReactTimeAgo from "react-time-ago";
import Link from "next/link";
import PostButtons from "./PostButtons";
import { images } from "@/next.config";
import Image from "next/image";

const PostContent = ({
  text,
  author,
  createdAt,
  _id,
  likesCount,
  likedByMe,
  commentsCount,
  big = false,
}) => {
  function showImages() {
    if (!images.length) {
      return "";
    }

    return (
      <div className="flex -mx-1 gap-2">
        {images.length > 0 &&
          images.remotePatterns((img) => (
            <div className="m-1">
              <Image src={img} alt="Image" />
            </div>
          ))}
      </div>
    );
  }

  return (
    <div>
      <div className="w-full flex">
        <div>
          {!!author?.image && (
            <Link href={`/${author.username}`}>
              <div className="cursor-pointer">
                <Avatar src={author.image} />
              </div>
            </Link>
          )}
        </div>

        <div className="pl-2 grow">
          <div>
            <Link href={`/${author.username}`}>
              <span className="font-bold pr-1 cursor-pointer">
                {author?.name}
              </span>
            </Link>

            {big && <br />}

            <Link href={`/${author.username}`}>
              <span className=" text-twitterLightGray">
                @{author?.username}
              </span>
            </Link>

            {createdAt && !big && (
              <span className="pl-1 text-twitterLightGray">
                <ReactTimeAgo
                  date={createdAt}
                  locale="en-US"
                  timeStyle="twitter"
                />
              </span>
            )}
          </div>
          {!big && (
            <div>
              <Link href={`/${author.username}/status/${_id}`}>
                <div className="w-full">
                  {text}
                  {showImages()}
                </div>
              </Link>
              <PostButtons
                username={author?.username}
                id={_id}
                likesCount={likesCount}
                likedByMe={likedByMe}
                commentsCount={commentsCount}
              />
            </div>
          )}
        </div>
      </div>

      {big && (
        <div className="mt-2">
          <Link href={`/${author.username}/status/${_id}`}>
            <div>
              {text}
              {showImages()}
            </div>
          </Link>
          {createdAt && (
            <div className="text-twitterLightGray text-sm">
              {new Date(createdAt)
                .toISOString()
                .replace("T", " ")
                .split(0, 16)
                .split(" ")
                .reverse()
                .join(" ")}
            </div>
          )}
          <PostButtons
            id={_id}
            username={author?.username}
            likesCount={likesCount}
            likedByMe={likedByMe}
            commentsCount={commentsCount}
          />
        </div>
      )}
    </div>
  );
};

export default PostContent;
