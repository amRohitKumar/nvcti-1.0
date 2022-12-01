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
import { EventInput, EventInputMultiline } from "./eventApplicationForm.styles";
import Wrapper from "./eventApplicationForm.styles";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { submitEvent } from "../../features/user/userSlice";
// import { eventFormData } from "../../data";

const EventApplicationForm = ({ eventFormData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { eventId } = useParams();
  const { title, description, questions } = eventFormData;
  const [loading, setLoading] = useState(true);
  const [answerArray, setAnswerArray] = useState("[]");

  useEffect(() => {
    let newAnswerArray = [];
    questions.forEach(({ type }, idx) => {
      if (type === "multiple" || type === "checkboxes")
        newAnswerArray.push({ other: "", options: [] });
      else newAnswerArray.push("");
    });
    setAnswerArray(JSON.stringify(newAnswerArray));
    setLoading(false);
    //eslint-disable-next-line
  }, []);

  const handleSubmit = () => {
    console.log(JSON.parse(answerArray));
    dispatch(submitEvent({ eventId, answer: JSON.parse(answerArray) })).then(
      () => navigate("/client")
    );
  };

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
            <EventInput size="large">{title} </EventInput>
            <EventInputMultiline>
              <Linkify
                properties={{
                  target: "_blank",
                }}
              >
                {description}
              </Linkify>
            </EventInputMultiline>
          </Paper>

          {questions.map(
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

export default EventApplicationForm;
