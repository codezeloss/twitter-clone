import Avatar from "./Avatar";

const PostContent = ({ text, author }) => {
  return (
    <div className="flex">
      <div>
        <Avatar src={author.image} />
      </div>

      <div className="pl-2">
        <div>
          <span>{author.name}</span>
          <span className="pl-1 text-twitterLightGray">{author.username}</span>
          <span className="pl-1 text-twitterLightGray">{createdAt}</span>
        </div>
        <div>{text}</div>
      </div>
    </div>
  );
};

export default PostContent;
