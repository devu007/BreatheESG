// src/components/Login.tsx
import React, { useState } from "react";
import { Button, Input, Form } from "antd";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import "../styles/login.scss";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("User logged in successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      alert("User logged in with Google successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <h1>Welcome Back</h1>
        <p>Please login to continue</p>
      </div>
      <div className="login-right">
        <div className="login-box">
          <Form>
            <Form.Item>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item>
              <Input.Password
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                onClick={handleLogin}
                style={{ width: "100%" }}
              >
                Login
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                className="google-button"
                onClick={handleLoginWithGoogle}
                style={{ width: "100%" }}
              >
                <span>Login with Google</span>
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
