import { useState, useEffect } from "react"
import { fetchMe } from "../api"
import { deletePosts } from "../api";
import useAuth from "../hooks/useAuth"

export default function MyProfile() {
    const [posts, setPosts] = useState([]);
    const { token, user } = useAuth();
    const messages = user.messages || [];

    useEffect(() => {
        async function getPosts() {
        const postList = await fetchMe(token);
        setPosts(postList.data.posts);
        }
        getPosts();
    }, [token]);

    return (
        <div className="main-page">
            
            <div className="my-messages">
                <h1 className="message-intro">Message Board</h1>
                {messages.map((message) => {
                    return (
                        <div className="message-card" key={message._id}>
                            <h2 className="fromUser-name">From: {message.fromUser.username}</h2>
                            <h3 className="message-content">Message:</h3> <p className="content-message">{message.content}</p>
                            <h4 className="relavent-post"><span>Post: {message.post.title}</span> Author: {message.post.author.username}</h4>
                    </div>
                    )
                })}
            </div>

            <div className="my-posts">
            <h1 className="post-intro">Post History</h1>
                {posts.map((post) => {
                    return (
                        <div className="my-card" key={post._id}>
                            <h3 className="my-title" style={{backgroundColor:"darkblue", color:"white"}}>
                            <span>{post.title}</span>
                            <i 
                                style={{padding:"5px", fontSize:"20px", color:"gold"}} 
                                className="material-icons"
                                onClick={async (e) => {
                                    e.preventDefault();
                                    await deletePosts(token, post._id);
                                    const response = await setPosts();
                                    if(response.success) {
                                        setPosts(response.data.posts);
                                    } else {
                                        setError(response.error);
                                    }
                                }}>delete_outline</i>
                            </h3>
                            <p className="my-description" style={{height:"60px"}}> {post.description}</p>
                            <h4 className="my-price" style={{backgroundColor:"darkblue", color:"gold"}}>Price: {post.price}</h4>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}