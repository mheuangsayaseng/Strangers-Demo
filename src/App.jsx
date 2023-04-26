import { useState, useContext } from "react";
import { AuthContext } from "./components/AuthPorvider";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Logout from "./components/LogOut";
import AllPost from "./components/AllPosts";
import CreatePost from "./components/CreatePost";
import useAuth from "./hooks/useAuth";

function App() {
    const { token } = useAuth();

    console.log("Token from App.jsx", token);

    return (
        <div className="App">
            <header className="navigation">
                <h1>Welcome to Stranger's Things</h1>
                <h3 className="navLinks">
                    <Link style={{color:"red"}} to="/">Login</Link>
                    {token && (
                        <Link style={{color:"orange"}}>My Profile</Link>
                    )}
                    {token && (
                    <Link style={{color:"yellow"}}>Message Board</Link>
                    )}
                    <Link style={{color:"aquamarine"}} to="/all-posts">All Posts</Link>
                    {token && (
                    <Link style={{color:"deepskyblue"}} to="/create-post">Create Post</Link>
                    )}
                    {token && (
                    <Link style={{color:"darkorchid"}}>Log Out</Link>
                    )}
                </h3>
            </header>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/all-posts" element={<AllPost />} />
                <Route path="/create-post" element={<CreatePost />} />
                <Route path="/register-user" element={<RegisterForm />} />
                <Route path="/logout" element={<Logout />} />
            </Routes>
        </div>
    );
}

export default App;