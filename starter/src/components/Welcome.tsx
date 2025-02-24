import React, { useState, useEffect } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/all-workouts");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Signed in as:", user.displayName);
      navigate("/all-workouts");
    } catch (error: unknown) {
      console.error("Error signing in:", error);

      if (error instanceof FirebaseError) {
        let errorMsg = "An error occurred while signing in. Please try again.";

        if (error.code === "auth/popup-closed-by-user") {
          errorMsg =
            "The sign-in popup was closed before completing the login.";
        } else if (error.code === "auth/network-request-failed") {
          errorMsg = "Network error. Please check your internet connection.";
        }

        setErrorMessage(errorMsg);
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="welcome-page">
      <img src="/images/heroBanner.jpeg" alt="Banner-image" />
      <div>
        <h1>Your fitness journey starts here</h1>
        <button onClick={handleGoogleSignIn} disabled={loading}>
          Login
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Welcome;
