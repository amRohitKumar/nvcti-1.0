import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { verifyUser } from "../../../features/user/userSlice";
import Register from "./Register.component";

const VerifyEmail = () => {
    const dispatch = useDispatch();
    const {emailToken} = useParams();
    dispatch(verifyUser(emailToken));
    return <Register/>;
};

export default VerifyEmail;