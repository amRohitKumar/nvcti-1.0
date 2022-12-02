import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const useUserState = (state) => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user.user);
  useEffect(() => {
    if (state === "LOGIN" && user) {
      let url;
      if (user.isAdmin) url = "/admin";
      else url = "/client";
      console.log(url);
      navigate(url);
    } else if (state === "LOGOUT" && !user) {console.log('hhhhhh'); navigate('/'); }
  }, [user]);
};

export default useUserState;
