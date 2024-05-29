import React, { useState } from "react";
import axios from "axios";
import { Button, Input, Form } from "antd";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebaseConfig";
import "../styles/login.scss";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "../images/BreatheESG.png";
import logo1 from "../images/BreatheESGworld.png";
import googleLogo from "../images/googleLogo.png";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://breatheesg.onrender.com/login",
        {
          email,
          password,
        }
      );
      const token = response.data.token;
      login(token);
      alert("User logged in successfully");
      navigate("/Dashboard");
    } catch (error: any) {
      console.error(
        "Error during login:",
        error.response ? error.response.data : error.message
      );
      alert("Login failed. Please check your email and password.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      const userData = {
        email: result.user.email,
        photoURL: result.user.photoURL,
      };
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
        <img
          src={logo}
          alt="Breathe ESG Logo"
          className="logo"
          style={{ width: "300px", height: "45px", margin: "20px 0" }}
        />
        <p>
          We help you track your organisation's metrics as per the ESG
          guidelines
        </p>
      </div>
      <div className="right-side">
        <img src={logo1} alt="Image" className="image-above-login-box" />
        <div className="login-box">
          <div className="login-header">
            <h1 className="login-title">Login</h1>
            <p className="login-subtitle">
              Login with your registered Email ID
            </p>
          </div>

          <Form className="login-form">
            <Form.Item className="login-form-item">
              <p>Email</p>
              <Input
                className="login-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item className="login-form-item">
              <p>Password</p>
              <Input.Password
                className="login-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item className="login-form-item">
              <Button
                type="primary"
                onClick={handleLogin}
                block
                className="login-button"
              >
                Login
              </Button>
            </Form.Item>
            <Form.Item className="login-form-item">
              <Button
                onClick={handleGoogleLogin}
                block
                className="login-button google-login-button"
              >
                <img
                  src={googleLogo}
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
