import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { verifyUser } from "../../../features/user/userSlice";
import { useUserState } from "../../../hooks";

const VerifyEmail = () => {
    const dispatch = useDispatch();
    const {emailToken} = useParams();
    dispatch(verifyUser(emailToken))
    useUserState("LOGIN", '/client');
};

export default VerifyEmail;