import { useParams } from "react-router-dom";

import { EventForm } from "../../../components";
import Wrapper from "./event-form.style";

const EventFormPage = () => {
  const params = useParams();
  console.log(params.eventId);
  return (
    <Wrapper>
      <EventForm />
    </Wrapper>
  );
};

export default EventFormPage;
