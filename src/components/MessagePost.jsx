import { useState } from "react";
import { messagePost } from "../api";
import useAuth from "../hooks/useAuth";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Message() {
    const navigate = useNavigate();
    const { postId } = useParams();
    const [content, setContent] = useState("");
    const { token } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await messagePost(postId, token, content);
            setContent(response);
            navigate('/all-posts');
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <div className="messagePost-content">

            <h1 className="messageFormTitle">Hello Stranger!</h1>

            <form className="messagePost-form" onSubmit={handleSubmit}>
                <label>Content:</label>
                <textarea
                    type="text"
                    style={{marginBottom:"5px", height: "150px", padding:"10px"}}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <br></br>
                <button type="submit">Send Message</button>
            </form>
        </div>
    );
}
