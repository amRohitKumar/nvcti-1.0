import { useState } from "react";
import { response } from "../../../data";
import { EventFormSubmitted } from "../../../components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchEvents } from "../../../features/events/eventsSlice";
import customFetch from "../../../utils/axios";

const AdminViewForm = () => {
  const dispatch = useDispatch();
  const [review, setReview] = useState("");
  const onAccept = () => {
    customFetch()
  };
  const onReject = () => {};
  const { eventId, userId } = useParams();
  const reqObj = {};
  useEffect(() => {
    dispatch(fetchEvents());
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
      review={review}
      setReview={setReview}
      response={reqObj}
      onAccept={onAccept}
      onReject={onReject}
    />
  );
};

export default AdminViewForm;
