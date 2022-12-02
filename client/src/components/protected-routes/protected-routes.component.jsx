import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../features/user/userSlice";

//ROLE OBJECT
const ProtectedRoutes = ({ children, userRole }) => {
  const dispatch = useDispatch();
  let isAuthorized = false;
  const role = useSelector((store) => store?.user?.user?.isAdmin);
  if(userRole === "user" && !role) isAuthorized = true;
  else if (userRole === "admin" && role) isAuthorized = true; 
  // isAuthorized = true;
  if (!isAuthorized) {
    dispatch(logoutUser());
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoutes;
