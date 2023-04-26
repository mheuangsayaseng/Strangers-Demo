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

      <h1 className="greeting">Hello Stranger</h1>

      <form className="createPost-form" onSubmit={async (e) => {
        e.preventDefault();
        await createPost(title, description, price, token);
        navigate('/all-posts');
      }}>
        <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        <label>Description:</label>
          <input
            style={{marginBottom:"5px", height: "150px"}}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        <label>Price:</label>
          <input
            type="text"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
          <br></br>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}
