import { Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";

//ROLE OBJECT
const role = {
  user: 1,
  admin: 2,
  mentor: 3,
  superAdmin: 4,
};

const ProtectedRoutes = ({ children, userRole }) => {
  //   const { role } = useSelector((store) => store.user);
  let isAuthorized = false;
  /*
    if(role == role[userRole]) isAuthorized = true; 
  */
  isAuthorized = true;
  if (!isAuthorized) {
    return <Navigate to="/landing" />;
  }
  return children;
};

export default ProtectedRoutes;
