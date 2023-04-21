import { useState, useEffect } from "react";
import { fetchAllPost } from "../api";

export default function AllPosts() {
  const [posts, setPosts] = useState([]);

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
          <div className="post-card" key={posts.author.username}>
            <h1 className="post-name"><span>Username: {posts.author.username}</span><i style={{padding:"5px", color:"gold"}} className="material-icons">bookmark_add</i></h1>
            <h2 className="post-title">Title: {posts.title}</h2>
            {/* <img src="https://emojis.wiki/thumbs/emojis/panda.webp"/> */}
            <p className="post-description"> {posts.description}</p>
            <h2 className="post-price">Price: {posts.price}</h2>
          </div>
        )
      })}
    </div>
  )
}