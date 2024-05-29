import React from "react";
import { Button } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebaseConfig";

const OAuthButtons: React.FC = () => {
  const googleProvider = new GoogleAuthProvider();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("User signed in with Google");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button icon={<GoogleOutlined />} onClick={handleGoogleSignIn}>
        Sign in with Google
      </Button>
    </>
  );
};

export default OAuthButtons;
