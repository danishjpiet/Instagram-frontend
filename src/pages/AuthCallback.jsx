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
        // toast({
        //   title: "Error",
        //   description: "Authentication code not found",
        //   status: "error",
        //   duration: 3000,
        //   isClosable: true,
        // });
        navigate("/login");
        return;
      }

      try {
        const response = await instagramApi.handleCallback(code);

        const { user, tokens } = response.data;
        if (tokens.accessToken && tokens.refreshToken && user) {
          // Store the user data and token in AuthContext
          login(user, tokens.accessToken, tokens.refreshToken);

          navigate("/");
        } else {
          throw new Error("Authentication failed");
        }
      } catch (error) {
        // toast({
        //   title: "Error",
        //   description: error.message || "Failed to complete authentication",
        //   status: "error",
        //   duration: 3000,
        //   isClosable: true,
        // });
        navigate("/login");
      } finally {
        setIsProcessing(false);
      }
    };

    processAuthCallback();
  }, [searchParams, navigate]);
};

export default AuthCallback;
