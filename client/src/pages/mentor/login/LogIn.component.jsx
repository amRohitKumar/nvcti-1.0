import { LogIn } from "../../../components";
import useTitle from "../../../hooks/useTitle";

const MentorLogIn = () => {
  useTitle("Mentor Login");
  return <LogIn role="mentor" redirecturl="/mentor" />;
};

export default MentorLogIn;
