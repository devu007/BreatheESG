import React, { useState } from "react";
import { Button, Input, Form } from "antd";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import "../styles/signup.scss";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "../images/BreatheESG.png";
import logo1 from "../images/BreatheESGworld.png";

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      console.log("Creating user...");
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User created:", userCredential);
      const token = await userCredential.user.getIdToken();
      login(token);
      alert("User signed up successfully");
      navigate("/Dashboard");
    } catch (error) {
      console.error("Error signing up:", error);
      alert("Error signing up. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <div className="left-side">
        <h3>Welcome To</h3>
        <img src={logo} alt="Breathe ESG Logo" className="logo" />
        <p>
          We help you track your organisation's metrics as per the ESG
          guidelines
        </p>
      </div>
      <div className="right-side">
        <img src={logo1} alt="Image" className="image-above-login-box" />
        <div className="signup-box">
          <div className="signup-header">
            <h1 className="signup-title">Sign Up</h1>
          </div>
          <Form className="signup-form">
            <Form.Item className="signup-form-item">
              <p className="input-label">Email</p>
              <Input
                className="signup-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item className="signup-form-item">
              <p className="input-label">Password</p>
              <Input.Password
                className="signup-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item className="signup-form-item">
              <p className="input-label">Confirm Password</p>
              <Input.Password
                className="signup-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
              />
            </Form.Item>
            <Form.Item className="signup-form-item">
              <Button
                type="primary"
                onClick={handleSignup}
                block
                className="signup-button"
              >
                Signup
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
