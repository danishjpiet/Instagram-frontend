import { useState } from "react";
import {
  FaHeart,
  FaRegHeart,
  FaRegComment,
  FaUserCircle,
  FaArrowAltCircleRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const Post = ({ post, profilePic }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post?.likes_count || 0);
  const [showComments, setShowComments] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
    // TODO: Implement API call to update like status
  };

  const renderMedia = () => {
    switch (post?.media_type) {
      case "IMAGE":
        return (
          <img
            src={post?.media_url}
            alt={post?.caption}
            className="w-full object-cover"
          />
        );
      case "VIDEO":
        return (
          <video controls className="w-full">
            <source src={post?.media_url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        );
      case "CAROUSEL_ALBUM":
        return (
          <div className="relative overflow-hidden">
            {/* Carousel container */}
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                width: `${post?.children.data.length * 100}%`,
                transform: `translateX(-${
                  currentSlide * (100 / post?.children.data.length)
                }%)`,
              }}
            >
              {post?.children.data.map((value, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0"
                  style={{ width: `${100 / post?.children.data.length}%` }}
                >
                  <img
                    src={value.media_url}
                    alt={`carousel-${index}`}
                    className="w-full object-cover"
                  />
                </div>
              ))}
            </div>
            {/* Navigation buttons */}
            <button
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-1"
              onClick={() =>
                setCurrentSlide((prev) =>
                  prev === 0 ? post?.children.data.length - 1 : prev - 1
                )
              }
            >
              <FaArrowAltCircleLeft className="w-6 h-6" />
            </button>
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-1"
              onClick={() =>
                setCurrentSlide((prev) =>
                  prev === post?.children.data.length - 1 ? 0 : prev + 1
                )
              }
            >
              <FaArrowAltCircleRight className="w-6 h-6" />
            </button>
            {/* Indicator dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {post?.children.data.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    currentSlide === index
                      ? "bg-black"
                      : "bg-white bg-opacity-50"
                  }`}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-md mb-8">
      {/* Post Header */}
      <div className="flex items-center p-4">
        <Link to={`/profile/${post?.username}`} className="flex items-center">
          {profilePic ? (
            <img
              src={profilePic}
              alt={post?.username}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-purple-500 ring-offset-2"
            />
          ) : (
            <FaUserCircle className="w-8 h-8 text-gray-300" />
          )}
          <span className="ml-3 font-semibold">{post?.username}</span>
        </Link>
      </div>

      {/* Post Media */}
      <div className="relative">{renderMedia()}</div>

      {/* Caption */}
      {post?.caption && (
        <div className="py-2 px-4 text-gray-700">
          <span>{post?.caption}</span>
        </div>
      )}
    </div>
  );
};

export default Post;
