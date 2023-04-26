import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Logout(props) {
  const navigate = useNavigate();
  const { setToken } = useAuth()

  useEffect(() => {
    localStorage.removeItem("token");
    props.setToken(null);
    navigate("/");
  }, [navigate, props]);

  return null;
}

export default Logout;
