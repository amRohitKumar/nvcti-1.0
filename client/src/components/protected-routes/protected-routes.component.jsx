import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../features/user/userSlice";

//ROLE OBJECT
const roleObj = {
  user: 0,
  admin: 1,
  mentor: 2,
  superAdmin: 3,
};

const ProtectedRoutes = ({ children, userRole }) => {
  const dispatch = useDispatch();
  let isAuthorized = false;
  const role = useSelector((store) => store?.user?.user?.position);
  if(role !== undefined && role === roleObj[userRole]) isAuthorized = true; 
  // isAuthorized = true;
  if (!isAuthorized) {
    dispatch(logoutUser());
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoutes;
