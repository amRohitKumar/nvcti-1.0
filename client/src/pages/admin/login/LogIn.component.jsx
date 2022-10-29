import { LogIn } from "../../../components";
import useTitle from "../../../hooks/useTitle";

const AdminLogIn = () => {
  useTitle("Admin Login");
  return <LogIn role="admin" />;
};

export default AdminLogIn;
