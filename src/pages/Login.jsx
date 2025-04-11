import { useState } from "react";
import { FaInstagram } from "react-icons/fa";
import { instagramApi } from "../api/instagramApi";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleInstagramLogin = async () => {
    try {
      setIsLoading(true);
      const authUrl = await instagramApi.getAuthUrl();
      window.location.href = authUrl;
    } catch (error) {
      console.error("Failed to connect to Instagram:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    //make this card in center
    <div className="flex justify-center items-center h-screen w-full">
      <div className="max-w-sm mx-auto p-6 bg-white rounded-2xl sm:shadow-xl text-center">
        <div className="flex justify-center mb-4">
          <FaInstagram className="text-pink-600 text-4xl" />
        </div>
        <h2 className="text-xl font-semibold mb-2">Login with Instagram</h2>
        <p className="text-sm text-gray-500 mb-6">
          Connect your Instagram business account to continue.
        </p>
        <button
          onClick={handleInstagramLogin}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-700 text-white font-medium py-2 px-4 rounded-xl transition duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
          ) : (
            <FaInstagram className="text-lg" />
          )}
          {isLoading ? "Connecting..." : "Continue with Instagram"}
        </button>
      </div>
    </div>
  );
};

export default Login;
