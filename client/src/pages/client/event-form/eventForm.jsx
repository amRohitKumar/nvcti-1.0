import { useEffect, useState } from "react";
import Linkify from "react-linkify";
import { Button, Paper } from "@mui/material";
import {
  ShortAnswer,
  ParagraphAnswer,
  MultipleAnswer,
  CheckboxesAnswer,
  DropdownAnswer,
} from "./questions";
import { EventInput, EventInputMultiline } from "./eventForm.styles";
import Wrapper from "./eventForm.styles";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../../../utils/axios";
import authHeader from "../../../utils/userAuthHeaders";
import { CircularLoader } from "../../../components";
// import { submitEvent } from "../../features/user/userSlice";
// import { eventFormData } from "../../data";

const EventForm = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const { token } = useSelector((state) => state.user.user);
  const [event, setEvent] = useState("");
  const [loading, setLoading] = useState(true);
  const [answerArray, setAnswerArray] = useState("[]");

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      try {
        const resp = await customFetch.get(
          `/event/${eventId}`,
          authHeader(token)
        );
        console.log(resp);
        setEvent(resp.data.event);
        const questionsJSON = resp.data.event.questions;
        console.log(questionsJSON);
        const parsedQuestions = JSON.parse(questionsJSON);
        // creating answer array

        let newAnswerArray = [];
        parsedQuestions.forEach(({ type }, idx) => {
          if (type === "multiple" || type === "checkboxes")
            newAnswerArray.push({ other: "", options: [] });
          else newAnswerArray.push("");
        });
        setAnswerArray(JSON.stringify(newAnswerArray));
        setLoading(false);
      } catch (err) {
        setLoading(false);
        toast.error("Something went wrong while fething event !");
        console.log(err);
      }
    };
    fetchEvent();
  }, []);

  const handleSubmit = () => {
    console.log(JSON.parse(answerArray));
    const submitEvent = async () => {
      try{
        setLoading(true);
        // not implemented 
        const resp = await customFetch.post(
          `/${eventId}/submitForm`,
          {response: answerArray, eventId},
          authHeader(token)
        );;
        toast.success("Form successfully submitted !");
        setLoading(false);
      } catch(err){
        setLoading(false);
        toast.error("Something went wrong while submitting form !");
        console.log(err);
      }
    };
    submitEvent();
    // dispatch(submitEvent({ eventId, answer: JSON.parse(answerArray) })).then(
    //   () => navigate("/client")
    // );
  };

  if (loading || !event) {
    return <CircularLoader />;
  }

  return (
    <>
      {!loading && (
        <Wrapper sx={{ width: { lg: "55%", md: "70%", sm: "80%", xs: "95%" } }}>
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              p: "1em",
              borderTop: "10px solid #828DF8",
            }}
          >
            <EventInput size="large">{event.name} </EventInput>
            <EventInputMultiline>
              <Linkify
                properties={{
                  target: "_blank",
                }}
              >
                {event.description}
              </Linkify>
            </EventInputMultiline>
          </Paper>

          {JSON.parse(event.questions).map(
            ({ type, question, isRequired, options, other }, idx) => {
              if (type === "short_anwer")
                return (
                  <ShortAnswer
                    key={idx}
                    title={question}
                    isRequired={isRequired}
                    answer={answerArray}
                    questionNumber={idx}
                    setAnswerArray={setAnswerArray}
                  />
                );
              else if (type === "paragraph")
                return (
                  <ParagraphAnswer
                    key={idx}
                    title={question}
                    isRequired={isRequired}
                    answer={answerArray}
                    questionNumber={idx}
                    setAnswerArray={setAnswerArray}
                  />
                );
              else if (type === "multiple")
                return (
                  <MultipleAnswer
                    key={idx}
                    title={question}
                    isRequired={isRequired}
                    options={options}
                    answer={answerArray}
                    questionNumber={idx}
                    setAnswerArray={setAnswerArray}
                    other={other}
                  />
                );
              else if (type === "dropdown")
                return (
                  <DropdownAnswer
                    key={idx}
                    title={question}
                    isRequired={isRequired}
                    options={options}
                    other={other}
                    answer={answerArray}
                    questionNumber={idx}
                    setAnswerArray={setAnswerArray}
                  />
                );
              else if (type === "checkboxes")
                return (
                  <CheckboxesAnswer
                    key={idx}
                    title={question}
                    isRequired={isRequired}
                    options={options}
                    other={other}
                    answer={answerArray}
                    questionNumber={idx}
                    setAnswerArray={setAnswerArray}
                  />
                );
            }
          )}
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Wrapper>
      )}
    </>
  );
};

export default EventForm;
