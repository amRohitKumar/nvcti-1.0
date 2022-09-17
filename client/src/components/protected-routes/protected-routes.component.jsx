import { Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";

const ProtectedRoutes = ({ children }) => {
  //   const { user } = useSelector((store) => store.user);
  const user = true;
  if (!user) {
    return <Navigate to="/landing" />;
  }
  return children;
};

export default ProtectedRoutes;
