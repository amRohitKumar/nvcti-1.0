import { response } from "../../../data";
import { EventFormSubmitted } from "../../../components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import customFetch from "../../../utils/axios";

const AdminViewForm = () => {
  const onAccept = () => {};
  const onReject = () => {};
  const dispatch = useDispatch();
  const { eventId, userId } = useParams();
  const reqObj = {};
  useEffect(() => {
    
  }, []);
  const events = useSelector((state) => state.events.events);
  if (events.length) {
    console.log(events);
    events.forEach((event) => {
      if (event._id === eventId) {
        event.responses.forEach((res) => {
          if (res.at(-1).id === userId) {
            reqObj.title = event.title;
            const arr = [];
            for (let idx = 0; idx < event.questions.length; idx++) {
              arr.push({ question: event.questions[idx].question, response: res[idx] });
            }
            reqObj.responses = arr;
          }
        });
      }
    });
  }
  // console.log(reqObj);
  return (
    <EventFormSubmitted
      response={response}
      onAccept={onAccept}
      onReject={onReject}
    />
  );
};

export default AdminViewForm;
