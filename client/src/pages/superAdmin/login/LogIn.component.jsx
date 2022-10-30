import { LogIn } from "../../../components";
import useTitle from "../../../hooks/useTitle";

const SuperAdminLogIn = () => {
  useTitle("SuperAdmin Login");
  return <LogIn role="superadmin" redirecturl="/superadmin" />;
};

export default SuperAdminLogIn;
