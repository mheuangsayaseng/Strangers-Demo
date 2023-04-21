import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import AllPost from "./components/AllPosts";
import CreatePost from "./components/CreatePost";

function App() {
    const [token, setToken] = useState(localStorage.getItem("token"));
    console.log("Token from App.jsx", token);
    
    return (
        <div className="App">
            <header className="navigation">
                <h1>Welcome to Stranger's Things</h1>
                <h3 className="navLinks">
                    <Link style={{color:"red"}} to="/">Home</Link>
                    <Link style={{color:"gold"}} to="/all-posts">Posts</Link>
                    <Link style={{color:"aquamarine"}} to="/create-post">Create Post</Link>
                    <Link style={{color:"deepskyblue"}} to="register-user">Register</Link>
                    <Link style={{color:"darkorchid"}}>Log Out</Link>
                </h3>
            </header>
            <Routes>
                <Route path="/" element={<LoginForm setToken={setToken} />} />
                <Route path="/all-posts" element={<AllPost />} />
                <Route path="/create-post" element={<CreatePost token={token}/>} />
                <Route path="/register-user" element={<RegisterForm setToken={setToken} />} />
            </Routes>
        </div>
    );
}

export default App;