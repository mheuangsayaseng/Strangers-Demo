import { useState, useEffect } from "react";
import { fetchAllPost } from "../api";
import { deletePosts } from "../api";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [searchPost, setSearchPost] = useState("");
  const navigate = useNavigate();
  const { token, user } = useAuth();

  const filteredPosts = posts.filter((post) => {
    return post.title.toLowerCase().includes(searchPost);
  });

  useEffect(() => {
    async function getPosts() {
      const postList = await fetchAllPost();
      setPosts(postList.data.posts);
    }
    getPosts();
  }, []);


  return (
    <div className="allPosts-content">

      <div className="searchBar">
        <label style={{paddingRight:"15px" }}>Lets find what you're looking for!</label>
        <input
          style={{width:"300px", padding:"5px" }}
          type="text"
          placeholder="Search Post Here"
          onChange={(e) => {
            setSearchPost(e.target.value.toLowerCase());
            console.log(searchPost);}}/>
      </div>

    <div className="posts-content">
      {posts.length > 0 && !searchPost && posts.map((post) => {
        return (
          <div className="post-card" key={post._id}>

            <h1 className="post-name">
              <span>Username: {post.author.username}</span>
              {token && (
                <i onClick={() => {navigate(`/message/${post._id}`);}} style={{padding:"5px", color:"gold"}} className="material-icons">message</i>
              )}
            </h1>

            <h3 className="post-title">{post.title}</h3>

            <p className="post-description"> {post.description}</p>

            <h3 className="post-price">
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
            </h3>
          </div>
        );
      })}
      {posts.length > 0 && searchPost && filteredPosts.map((post) =>{
        return (
          <div className="post-card" key={post._id}>

            <h1 className="post-name">
              <span>Username: {post.author.username}</span>
              {token && (
                <i onClick={() => {navigate(`/message/${post._id}`);}} style={{padding:"5px", color:"gold"}} className="material-icons">message</i>
              )}
            </h1>

            <h3 className="post-title">{post.title}</h3>

            <p className="post-description"> {post.description}</p>

            <h3 className="post-price">
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
            </h3>
          </div>
        )
      })}
    </div>
    </div>
  )
}