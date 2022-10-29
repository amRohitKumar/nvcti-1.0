import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const useUserState = (state, url) => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user.user);
  useEffect(() => {
    if(state === "LOGIN" && user) navigate(url);
    else if(state === "LOGOUT" && !user) navigate(url);
  }, [user]);
};

export default useUserState;
