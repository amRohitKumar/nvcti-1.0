import { response } from "../../../data";
import { EventFormSubmitted } from "../../../components";

const AdminViewForm = () => {
  const onAccept = () => {};
  const onReject = () => {};
  return (
    <EventFormSubmitted
      response={response}
      onAccept={onAccept}
      onReject={onReject}
    />
  );
};

export default AdminViewForm;
