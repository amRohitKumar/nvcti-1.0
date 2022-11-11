import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const useUserState = (state) => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user.user);
  useEffect(() => {
    if (state === "LOGIN" && user) {
      let url;
      if (user.position === 0) url = "/client";
      else if (user.position === 1) url = "/admin";
      else if (user.position === 2) url = "/mentor";
      else if (user.position === 3) url = "/superadmin";
      else url = "/client";
      console.log(url);
      navigate(url);
    } else if (state === "LOGOUT" && !user) navigate('/');
  }, [user]);
};

export default useUserState;
