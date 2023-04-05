import Layout from "@/components/Layout";
import TopNavigationLink from "@/components/TopNavigationLink";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Cover from "@/components/Cover";
import Avatar from "@/components/Avatar";
import PostContent from "@/components/PostContent";
import useUserInfo from "@/hooks/useUserInfo";

const UserPage = () => {
  const router = useRouter();
  const { username } = router.query;
  const [profileInfo, setProfileInfo] = useState();
  const [originalUserInfo, setOriginalUserInfo] = useState();
  const { userInfo } = useUserInfo();
  const [posts, setPosts] = useState([]);
  const [postsLikedByMe, setPostsLikedByMe] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  // GET the user by username
  useEffect(() => {
    if (!username) {
      return;
    }

    axios.get(`/api/users?username=${username}`).then((res) => {
      setProfileInfo(res.data.user);
      setOriginalUserInfo(res.data.user);
      setIsFollowing(!!res.data.follow);
    });
  }, [username]);

  // GET Post by id
  useEffect(() => {
    if (!profileInfo?._id) {
      return;
    }

    axios.get(`/api/posts?author=${profileInfo._id}`).then((res) => {
      setPosts(res.data.posts);
      setPostsLikedByMe(res.data.idsLikedByMe);
    });
  }, [profileInfo?._id]);

  //
  function updateUserImage(type, src) {
    setProfileInfo((prev) => ({ ...prev, [type]: src }));
  }

  //
  async function updateProfile() {
    const { bio, name, username } = profileInfo;

    await axios.put("/api/profile", {
      bio,
      name,
      username,
    });
  }

  //
  function cancel() {
    setProfileInfo((prev) => {
      const { bio, name, username } = originalUserInfo;
      return { ...prev, bio, name, username };
    });
    setEditMode(false);
  }

  //
  function toggleFollow() {
    setIsFollowing((prev) => !prev);
    axios.post("/api/followers", {
      destination: profileInfo?._id,
    });
  }

  //
  const isMyProfile = profileInfo._id === userInfo?._id;

  return (
    <Layout>
      {!!profileInfo && (
        <div>
          <div className="px-5 pt-2">
            <TopNavigationLink title={profileInfo.name} url="" />
          </div>

          <Cover
            src={profileInfo.cover}
            onChange={(src) => updateUserImage("cover", src)}
            editable={isMyProfile}
          />

          <div className="flex justify-between">
            <div className="ml-5 relative">
              <div className="absolute -top-12 border-4 border-black rounded-full overflow-hidden">
                <Avatar
                  src={profileInfo.image}
                  big
                  editable={isMyProfile}
                  onChange={(src) => updateUserImage("image", src)}
                />
              </div>
            </div>
            <div className="p-2">
              {!isMyProfile && (
                <button
                  className={`${
                    isFollowing
                      ? "bg-twitterWhite text-black"
                      : "bg-twitterBlue text-white"
                  }  py-2 px-5 rounded-full`}
                  onClick={toggleFollow}
                >
                  {isFollowing ? "Following" : "Follow"}
                </button>
              )}
              {isMyProfile && (
                <div>
                  {!editMode && (
                    <button
                      className="bg-twitterBlue text-white py-2 px-5 rounded-full"
                      onClick={() => setEditMode(true)}
                    >
                      Edit Profile
                    </button>
                  )}
                  {editMode && (
                    <div>
                      <button
                        className="bg-twitterWhite text-black py-2 px-5 rounded-full mr-2"
                        onClick={() => cancel()}
                      >
                        Cancel
                      </button>
                      <button
                        className="bg-twitterBlue text-white py-2 px-5 rounded-full mr-2"
                        onClick={() => updateProfile()}
                      >
                        Save Profile
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="px-5 mt-2">
            {!editMode && (
              <div>
                <h1 className="text-xl font-bold leading-5">
                  {profileInfo.image}
                </h1>

                <h2 className="text-twitterLightGray text-sm">
                  @{profileInfo.username}
                </h2>

                <div className="text-sm mt-2 mb-2">{profileInfo.bio}</div>
              </div>
            )}

            {editMode && (
              <div>
                <div>
                  <input
                    className="bg-twitterBorder p-2 mb-2 rounded-full"
                    type="text"
                    value={profileInfo.name}
                    onChange={(e) =>
                      setProfileInfo((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                  />
                </div>

                <div>
                  <input
                    className="bg-twitterBorder p-2 mb-2 rounded-full"
                    type="text"
                    value={profileInfo.username}
                    onChange={(e) =>
                      setProfileInfo((prev) => ({
                        ...prev,
                        username: e.target.value,
                      }))
                    }
                  />
                </div>

                <div>
                  <textarea
                    className="bg-twitterBorder p-2 mb-12 rounded-2xl w-full block"
                    value={profileInfo.bio}
                    onChange={(e) =>
                      setProfileInfo((prev) => ({
                        ...prev,
                        bio: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {posts?.length > 0 &&
        posts.map((post) => (
          <div key={post._id} className="p-5 border-t border-twitterBorder">
            <PostContent
              {...post}
              likedByMe={postsLikedByMe.includes(post._id)}
            />
          </div>
        ))}
    </Layout>
  );
};

export default UserPage;
