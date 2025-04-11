import { useAuth } from "../context/AuthContext";
import { FaUserCircle } from "react-icons/fa";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto pt-20 px-4">
      <div className="flex flex-col md:flex-row items-center gap-8 py-8">
        {/* Profile Picture */}

        {/* Profile Info */}
        <div className="flex-1">
          <h1 className="text-2xl font-semibold mb-4">{user?.username}</h1>

          {/* Stats */}
          <div className="flex gap-8 mb-4">
            <div className="text-center">
              <span className="font-semibold block">
                {user?.posts_count || 0}
              </span>
              <span className="text-gray-500">posts</span>
            </div>
            <div className="text-center">
              <span className="font-semibold block">
                {user?.followers_count || 0}
              </span>
              <span className="text-gray-500">followers</span>
            </div>
            <div className="text-center">
              <span className="font-semibold block">
                {user?.following_count || 0}
              </span>
              <span className="text-gray-500">following</span>
            </div>
          </div>

          {/* Bio */}
          <div>
            <h2 className="font-semibold">{user?.full_name}</h2>
            <p className="text-gray-700 whitespace-pre-wrap">
              {user?.bio || "No bio yet."}
            </p>
          </div>
        </div>
      </div>

      {/* Posts Grid - Placeholder */}
      <div className="border-t border-gray-200 pt-8">
        <div className="grid grid-cols-3 gap-1 md:gap-4">
          {/* This will be populated with actual posts */}
          <div className="aspect-square bg-gray-100"></div>
          <div className="aspect-square bg-gray-100"></div>
          <div className="aspect-square bg-gray-100"></div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
