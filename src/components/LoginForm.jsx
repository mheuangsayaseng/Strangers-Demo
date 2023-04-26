import { useState } from "react";
import { userLogin } from "../api";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function LoginForm () {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { setToken } = useAuth()

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const result = await userLogin(username, password);
            console.log("Result of User Login", result);
            setToken(result.data.token);
            localStorage.setItem("token", result.data.token);
            navigate('/all-posts');
        } catch (error) {
            console.log("Error for User Login: ", error);
        }
    }

    return (
        <div className="user-content">
            <h1 className="title">Log In</h1>
            <form onSubmit={handleSubmit} className="user-form">
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
            <button>Submit</button>
            <br></br>
            <p>Don't have an account?</p>
            <Link style={{color:"white"}} to="register-user">Sign Up Now!</Link>
            </form>
        </div>
    );
}