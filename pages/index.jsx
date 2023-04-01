import Head from "next/head";
import { Inter } from "next/font/google";
import UsernameForm from "@/components/UsernameForm";
import useUserInfo from "@/hooks/useUserInfo";
import Image from "next/image";
import PostForm from "@/components/PostForm";
import axios from "axios";
import { useEffect, useState } from "react";
import PostContent from "@/components/PostContent";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  // GET user infos
  const { userInfo, status: userInfoStatus } = useUserInfo();
  const [posts, setPosts] = useState([]);

  // GET Posts
  useEffect(() => {
    async function fetchHomePosts() {
      const postsData = await axios.get("/api/posts");
      setPosts(postsData);
    }
    fetchHomePosts();
  }, []);

  // if (userInfoStatus === "loading") {
  //   return "loading user info";
  // }

  if (!userInfo?.username) {
    return <UsernameForm />;
  }

  return (
    <>
      <Head>
        <title>Twitter</title>
        <meta name="description" content="Twitter cloned app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="max-w-lg mx-auto border-x border-twitterBorder min-h-screen">
          <h1 className="text-lg font-bold p-4">Home</h1>
          <PostForm
            onPost={() => {
              fetchHomePosts();
            }}
          />
          <div className="">
            {posts.length > 0 &&
              posts.map((post) => (
                <div key="" className="border-t border-twitterBorder pt-2">
                  <PostContent {...post} />
                </div>
              ))}
          </div>
        </div>
      </main>
    </>
  );
}
