import { useParams } from "react-router-dom";

import { EventApplicationForm } from "..";
import Wrapper from "./event-form.style";

const EventFormPage = () => {
  const params = useParams();
  console.log(params.eventId);
  return (
    <Wrapper>
      <EventApplicationForm />
    </Wrapper>
  );
};

export default EventFormPage;
