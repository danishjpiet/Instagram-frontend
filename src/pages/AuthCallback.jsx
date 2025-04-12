import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { instagramApi } from "../api/instagramApi";

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const processAuthCallback = async () => {
      const code = searchParams.get("code");

      if (!code) {
        navigate("/login");
        return;
      }

      try {
        const response = await instagramApi.handleCallback(code);

        const { user, tokens } = response.data;
        if (tokens.accessToken && tokens.refreshToken && user) {
          login(user, tokens.accessToken, tokens.refreshToken);

          navigate("/");
        } else {
          throw new Error("Authentication failed");
        }
      } catch (error) {
        navigate("/login");
      } finally {
        setIsProcessing(false);
      }
    };

    processAuthCallback();
  }, [searchParams, navigate]);

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="max-w-sm mx-auto p-6 bg-white rounded-2xl shadow-xl text-center">
        {isProcessing ? (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-700">
              Authenticating...
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Please wait while we complete your authentication
            </p>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default AuthCallback;
