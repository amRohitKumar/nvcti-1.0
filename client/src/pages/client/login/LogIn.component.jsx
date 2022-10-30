import { LogIn } from "../../../components";
import useTitle from "../../../hooks/useTitle";

const ClientLogIn = () => {
  useTitle("Login");
  return <LogIn role="user" redirecturl="/client" />;
};

export default ClientLogIn;
