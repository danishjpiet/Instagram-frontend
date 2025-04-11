import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Post from "../components/Post";
import { FaUserCircle } from "react-icons/fa";
import { instagramApi } from "../api/instagramApi";

const Home = () => {
  const { user, accessToken } = useAuth();
  const [posts, setPosts] = useState([]);
  const [profilePic, setProfilePic] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [nextPage, setNextPage] = useState(null);

  const fetchPosts = async (isFirstTime) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      let response = null;
      if (isFirstTime) {
        response = await instagramApi.getMedia(accessToken);
      } else {
        response = await instagramApi.getNextMedia(nextPage);
      }
      if (response.data) {
        if (
          response.data.length > 0 &&
          !nextPage &&
          response.data[0].media_type == "IMAGE"
        ) {
          setProfilePic(response.data[0].media_url);
        }

        const postsWithTimestamp = response.data.map((post) => ({
          ...post,
          timestamp: Date.now() + Math.random(),
        }));

        setPosts((prevPosts) => {
          const existingIds = new Set(prevPosts.map((p) => p.id));
          const uniqueNewPosts = postsWithTimestamp.filter(
            (post) => !existingIds.has(post.id)
          );
          return [...prevPosts, ...uniqueNewPosts];
        });
        setNextPage(response.paging?.next || null);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(true);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="w-full">
        <Navbar />
      </div>
      <div className="max-w-7xl mx-auto pt-16 px-4 lg:px-60">
        <div className="flex flex-col md:flex-row gap-8">
          {/* User Info and Suggestions (Left Sidebar) */}
          <div className="md:w-80 flex-shrink-0">
            <div className="sticky top-20 sm:mt-0 mt-4">
              {/* User Info */}
              <div className="bg-white p-2 rounded-lg shadow-lg mb-6 hover:shadow-md transition-shadow duration-300 border border-gray-300">
                <div className="bg-gray-300 p-4 rounded-md">
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      {profilePic ? (
                        <img
                          src={profilePic}
                          alt={user?.username}
                          className="w-20 h-20 rounded-full object-cover ring-2 ring-purple-500 ring-offset-2"
                        />
                      ) : (
                        <FaUserCircle className="w-20 h-20 text-[#c4c1c1] hover:text-purple-500 transition-colors duration-300" />
                      )}
                    </div>
                    <div className="space-y-2">
                      <h2 className="font-bold text-xl text-gray-800 hover:text-purple-600 transition-colors duration-300">
                        {user?.username}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
              {/* user details */}
              <div className="bg-white p-2 rounded-lg shadow-lg border border-gray-300 hover:shadow-sm transition-shadow duration-300">
                <div className="grid grid-cols-2 grid-rows-2 gap-4 py-6 bg-gray-300 rounded-md p-4">
                  <div className="">
                    <span className="font-medium">Posts</span>
                  </div>
                  <div className="">
                    <span className="bg-purple-100 px-2 py-0.5 rounded-full text-purple-600">
                      {user.mediaCount}
                    </span>
                  </div>
                  <div className="">
                    <span className="font-medium">Account Type</span>
                  </div>
                  <div className=" ">
                    <span className="bg-blue-100 px-2 py-0.5 rounded-full text-blue-600">
                      {user.accountType}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Posts Feed */}
          <div className="flex-grow flex justify-end">
            <div className="mt-[18px]">
              <InfiniteScroll
                dataLength={posts.length}
                next={fetchPosts}
                hasMore={nextPage ? true : false}
                loader={
                  <div className="flex justify-center p-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
                  </div>
                }
                endMessage={
                  <div className="border border-gray-300 rounded-lg bg-gray-200 mb-8">
                    <p className="text-center  my-4">
                      You have seen all posts!
                    </p>
                  </div>
                }
              >
                {posts.map((post) => (
                  <Post
                    key={`${post.id}-${post.timestamp}`}
                    post={post}
                    profilePic={profilePic}
                  />
                ))}
              </InfiniteScroll>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
