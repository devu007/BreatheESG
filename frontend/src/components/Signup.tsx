import React, { useState } from "react";
import { Button, Input, Form } from "antd";
import axios from "axios";
import "../styles/signup.scss";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "../images/BreatheESG.png";
import logo1 from "../images/BreatheESGworld.png";

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { signup } = useAuth(); // Changed to use signup from AuthContext
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await signup(email, password); // Using the signup method from AuthContext
      alert("User registered successfully");
      navigate("/Dashboard");
    } catch (error: any) {
      console.error(
        "Error during signup:",
        error.response ? error.response.data : error.message
      );
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="signup-container">
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
        <div className="signup-box">
          <div className="signup-header">
            <h1 className="signup-title">Sign Up</h1>
          </div>
          <Form className="signup-form">
            <p className="input-label">Name</p>
            <Form.Item className="signup-form-item">
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="signup-input"
              />
            </Form.Item>
            <p className="input-label">Email</p>
            <Form.Item className="signup-form-item">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="signup-input"
              />
            </Form.Item>
            <p className="input-label">Password</p>
            <Form.Item className="signup-form-item">
              <Input.Password
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="signup-input"
              />
            </Form.Item>
            <Form.Item className="signup-form-item">
              <Button
                type="primary"
                onClick={handleSignup}
                block
                className="signup-button"
              >
                Sign Up
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
