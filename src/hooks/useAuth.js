// store authentication information

import { useContext } from "react";
import { AuthContext } from "../components/AuthPorvider";

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
