import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import PostContent from "@/components/PostContent";
import Layout from "@/components/Layout";
import Link from "next/link";
import useUserInfo from "@/hooks/useUserInfo";
import PostForm from "@/components/PostForm";
import TopNavigationLink from "@/components/TopNavigationLink";

const PostPage = ({ onPost, compact }) => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState();
  const [replies, setReplies] = useState([]);
  const [repliesLikedByMe, setRepliesLikedByMe] = useState();
  const { userInfo } = useUserInfo();

  function fetchData() {
    axios.get(`/api/post?id=${id}`).then((res) => setPost(res.data.post));

    axios.get(`/api/posts?parent=${id}`).then((res) => {
      setReplies(res.data.posts);
      setRepliesLikedByMe(res.data.idsLikedByMe);
    });
  }

  useEffect(() => {
    if (!id) {
      return;
    }

    fetchData();
  }, [id]);

  return (
    <Layout>
      {!!post?._id && (
        <div className="px-5 py-2">
          <TopNavigationLink title="Tweet" url="/" />

          {post.parent && (
            <div className="pb-1">
              <PostContent {...post.parent} />
              <div className="ml-5 h-12 relative">
                <div
                  className="h-20 border-l-2 border-twitterBorder ml-5 absolute -top-5"
                  style={{ marginLeft: "2px" }}
                />
              </div>
            </div>
          )}

          <div>
            <PostContent {...post} big />
          </div>
        </div>
      )}

      {!!userInfo && (
        <div className="border-t border-twitterBorder py-5">
          <PostForm
            onPost={fetchData}
            compact
            parent={id}
            placeholder={"Tweet your reply"}
          />
        </div>
      )}

      <div className="">
        {replies.length > 0 &&
          replies.map((reply) => (
            <div key="" className="p-5 border-t border-twitterBorder">
              <PostContent
                {...reply}
                likedByMe={repliesLikedByMe.includes(reply._id)}
              />
            </div>
          ))}
      </div>
    </Layout>
  );
};

export default PostPage;
