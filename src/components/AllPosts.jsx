import { useState, useEffect } from "react";
import { fetchAllPost } from "../api";
import { deletePosts } from "../api";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function AllPosts() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const { token, user } = useAuth();

  useEffect(() => {
    async function getPosts() {
      const postList = await fetchAllPost();
      setPosts(postList.data.posts);
    }
    getPosts();
  }, []);

  return (
    <div className="posts-content">
      {posts.map((post) => {
        return (
          <div className="post-card" key={post._id}>

            <h1 className="post-name">
              <span>Username: {post.author.username}</span>
              {token && (
                <i onClick={() => {navigate(`/message/${post._id}`);}} style={{padding:"5px", color:"gold"}} className="material-icons">message</i>
              )}
            </h1>

            <h2 className="post-title">{post.title}</h2>

            <p className="post-description"> {post.description}</p>

            <h2 className="post-price">
              <span>Price: {post.price}</span>
              {user._id === post.author._id && (
                <i 
                style={{padding:"5px", fontSize:"30px", color:"gold"}} 
                className="material-icons"
                onClick={async (e) => {
                  e.preventDefault();
                  await deletePosts(token, post._id);
                  const response = await fetchAllPost();
                  if(response.success) {
                    setPosts(response.data.posts);
                  } else {
                    setError(response.error);
                  }
                }}
                >delete_outline</i>
              )}
            </h2>

          </div>
        )
      })}
    </div>
  )
}