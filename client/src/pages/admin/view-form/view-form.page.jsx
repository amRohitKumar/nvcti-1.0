import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { EventFormSubmitted, CircularLoader } from "../../../components";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import customFetch from "../../../utils/axios";
import authHeader from "../../../utils/userAuthHeaders";

const AdminViewForm = () => {
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(false);
  const {token} = useSelector(state => state?.user?.user);
  
  const { eventId, formId } = useParams();
  const handleStatus = async (status) => {
    try {
      setLoading(true);
      console.log(eventId, formId);
      const resp = await customFetch.post(`/event/statusupdate/${eventId}/${formId}`, {status}, authHeader(token))
      console.log(resp);
      setLoading(false);
      navigate(`/admin/event/${eventId}/applications`)
      toast.success("Status updated successfully !");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.message);
    }
  }
  useEffect(() => {
    const fetchApplication = async () => {
      try {
        setLoading(true);
        const resp = await customFetch.get(`/event/form/${eventId}/${formId}`, authHeader(token))
        console.log(resp);
        setApplication(resp.data.application);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
        toast.error(error.message);
      }
    }
    fetchApplication();
  }, []);

  if (loading || !application) {
    return <CircularLoader />;
  }

  const {question, response} = application;
  const parsedQuestion = JSON.parse(question), parsedResponse = JSON.parse(response);
  const formatArr = [];

  for(let idx = 0; idx < parsedQuestion.length; idx++){
    const obj = {};
    obj["response"] = parsedResponse[idx];
    obj["question"] = parsedQuestion[idx].question;
    formatArr.push(obj);
  }
  console.log(formatArr);
  return (
    <EventFormSubmitted
      response={formatArr}
      handleStatus={handleStatus}
    />
  );
};

export default AdminViewForm;
