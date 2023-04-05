import Head from "next/head";
import { Inter } from "next/font/google";
import UsernameForm from "@/components/UsernameForm";
import useUserInfo from "@/hooks/useUserInfo";
import Image from "next/image";
import PostForm from "@/components/PostForm";
import axios from "axios";
import { useEffect, useState } from "react";
import PostContent from "@/components/PostContent";
import Layout from "@/components/Layout";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session } = useSession();
  const { userInfo, setUserInfo, status: userInfoStatus } = useUserInfo();
  const [posts, setPosts] = useState([]);
  const [idsLikedByMe, setIdsLikedByMe] = useState([]);
  const router = useRouter();

  // GET Posts
  function fetchHomePosts() {
    axios.get("/api/posts").then((res) => {
      setPosts(res.data.posts);
      setIdsLikedByMe(res.data.idsLikedByMe);
    });
  }

  // LOG OUT
  async function logout() {
    setUserInfo(null);
    await signOut();
  }

  useEffect(() => {
    fetchHomePosts();
  }, []);

  if (userInfoStatus === "loading") {
    return "loading user info";
  }

  if (userInfo && !userInfo?.username) {
    return <UsernameForm />;
  }

  if (!userInfo) {
    router.push("/login");
    return "no user infos";
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
        <Layout>
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
                  {post.parent && (
                    <div>
                      <PostContent {...post.parent} />
                      <div className="relative h-8">
                        <div className="border-l-2 border-twitterBorder h-10 absolute ml-4 -top--4" />
                      </div>
                    </div>
                  )}
                  <PostContent
                    {...post}
                    likedByMe={idsLikedByMe.includes(post._id)}
                  />
                </div>
              ))}
          </div>

          {userInfo && (
            <div className="p-5 text-center border-t border-twitterBorder">
              <button
                className="bg-twitterWhite text-black px-5 py-2 rounded-full"
                onClick={logout}
              ></button>
            </div>
          )}
        </Layout>
      </main>
    </>
  );
}
