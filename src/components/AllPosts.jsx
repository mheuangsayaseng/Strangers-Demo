import { useState, useEffect } from "react";
import { fetchAllPost } from "../api";
import { deletePosts } from "../api";
// import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function AllPosts() {
  const [posts, setPosts] = useState([]);
  // const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    async function getPosts() {
      const postList = await fetchAllPost();
      setPosts(postList.data.posts);
    }
    getPosts();
  }, []);

  return (
    <div className="posts-content">
      {posts.map((posts) => {
        return (
          <div className="post-card" key={posts._id}>
            <h1 className="post-name"><span>Username: {posts.author.username}</span><i style={{padding:"5px", color:"gold"}} className="material-icons">message</i></h1>
            <h2 className="post-title">Title: {posts.title}</h2>
            {/* <img src="https://emojis.wiki/thumbs/emojis/panda.webp"/> */}
            <p className="post-description"> {posts.description}</p>
            <h2 className="post-price">
              <i 
              style={{padding:"5px", fontSize:"30px", color:"gold"}} 
              className="material-icons"
              onClick={async () => {
                await deletePosts(token, posts._id);
                const response = await fetchAllPost();
                if(response.success) {
                  setPosts(response.data.posts);
                } else {
                  setError(response.error);
                }
              }}
              >delete_outline</i>
              <span>Price: {posts.price}</span></h2>
          </div>
        )
      })}
    </div>
  )
}