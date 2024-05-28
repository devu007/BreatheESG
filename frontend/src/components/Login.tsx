// src/components/Login.tsx
import React, { useState } from "react";
import { Button, Input, Form } from "antd";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import "../styles/login.scss";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "../images/BreatheESG.png";
import logo1 from "../images/BreatheESGworld.png";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCredential.user.getIdToken();
      login(token);
      alert("User logged in successfully");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Login failed. Please check your email and password.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      login(token);
      alert("User logged in with Google successfully");
      navigate("/Dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <div className="left-side">
        <h3>WELCOME TO</h3>
        <img src={logo} alt="Breathe ESG Logo" className="logo" />
        <p>
          We help you track your organisation's metrics as per the ESG
          guidelines
        </p>
      </div>
      <img src={logo1} alt="Image" className="image-above-login-box" />
      <div className="right-side">
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
              <Button type="primary" onClick={handleLogin} block>
                Login
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                onClick={handleGoogleLogin}
                block
                className="google-login-button"
              >
                <img
                  src="https://www.pngwing.com/en/free-png-yfswb"
                  alt="Google logo"
                  className="google-logo"
                />
                Login with Google
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
