import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "./App.css";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import MyProfile from "./components/MyProfile";
import AllPost from "./components/AllPosts";
import CreatePost from "./components/CreatePost";
import Message from "./components/MessagePost";
import useAuth from "./hooks/useAuth";
import AllPosts from "./components/AllPosts";


function App() {
    const { token, user, setToken } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="App">
            <header className="navigation">
                <h1>Welcome to Stranger's Things {token ? <p>{user.username}</p> : null}</h1>
                <h3 className="navLinks">
                    <Link style={{color:"red"}} to="/">Login</Link>

                    {token && (
                        <Link style={{color:"yellow"}} to="/users/me">My Profile</Link>
                    )}

                    <Link style={{color:"aquamarine"}} to="/posts">All Posts</Link>

                    {token && (
                    <Link style={{color:"deepskyblue"}} to="/create-post">Create Post</Link>
                    )}

                    {token && (
                    <button className="LogOut-Btn"
                        onClick={()=> {
                            setToken(null);
                            localStorage.removeItem("token");
                            navigate("/");
                        }}
                    >Log Out</button>
                    )}
                </h3>
            </header>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/posts" element={<AllPosts />} />
                <Route path="/create-post" element={<CreatePost />} />
                <Route path="/users/register" element={<RegisterForm />} />
                <Route path="/users/me" element={<MyProfile />} />
                <Route path="/message/:postId" element={<Message/>} />
            </Routes>
        </div>
    );
}

export default App;