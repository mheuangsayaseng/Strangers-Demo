import React, { useState } from "react";
import { registerUser } from "../api";

export default function RegisterForm({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const result = await registerUser(username, password);
      console.log("Result of Registering User", result);
      setToken(result.data.token);
      localStorage.setItem("token", result.data.token)
    } catch (error) {
      console.log("Error for Registering User: ", error);
    }
    console.log({ username, password });
  }

  return (
    <div className="user-content">
      <h1 className="title">Join Now!</h1>
      <form className="user-form" onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          placeholder="Enter Username Here"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Password:</label>
        <input
          type="text"
          name="password"
          placeholder="Enter Password Here"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Register New User</button>
      </form>
    </div>
  );
}
