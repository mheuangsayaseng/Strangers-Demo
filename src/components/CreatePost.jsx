import { useState } from "react";
import { createPost } from "../api";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function CreatePost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const { token } = useAuth();

  return (
    <div className="createPost-content">

      <h1 className="greeting">New Post</h1>

      <form className="createPost-form" onSubmit={async (e) => {
        e.preventDefault();
        await createPost(title, description, price, token);
        navigate('/posts');
      }}>
        <label>Title:</label>
          <input
            type="text"
            value={title}
            style={{padding:"5px"}}
            onChange={(event) => setTitle(event.target.value)}
          />
        <label>Description:</label>
          <textarea
            style={{marginBottom:"5px", height: "150px", padding:"5px"}}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        <label>Price:</label>
          <input
            type="text"
            value={price}
            style={{padding:"5px"}}
            onChange={(event) => setPrice(event.target.value)}
          />
          <br></br>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}
