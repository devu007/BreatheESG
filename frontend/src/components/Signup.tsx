// src/components/Signup.tsx
import React, { useState } from "react";
import { Button, Input, Form } from "antd";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import "../styles/signup.scss";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "../images/BreatheESG.png";

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
    <div className="login-container">
      <div className="left-side">
        <h3>Welcome To</h3>
        <img src={logo} alt="Breathe ESG Logo" className="logo" />
        <p>
          We help you track your organisation's metrics as per the ESG
          guidelines
        </p>
      </div>
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
              <Input.Password
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={handleSignup} block>
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
