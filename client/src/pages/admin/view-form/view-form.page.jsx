import { useState } from "react";
import { response } from "../../../data";
import { EventFormSubmitted } from "../../../components";

const AdminViewForm = () => {
  const [review, setReview] = useState("");
  const onAccept = () => {};
  const onReject = () => {};
  return (
    <EventFormSubmitted
      review={review}
      setReview={setReview}
      response={response}
      onAccept={onAccept}
      onReject={onReject}
    />
  );
};

export default AdminViewForm;
