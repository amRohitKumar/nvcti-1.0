import {
  Paper,
  Checkbox,
  FormGroup,
  FormControlLabel,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { ElemWrapper } from "../eventForm.styles";
import Linkify from "react-linkify";
import { useEffect } from "react";

const CheckboxesAnswer = ({
  title,
  isRequired,
  options,
  other,
  answer,
  questionNumber,
  setAnswerArray,
}) => {
  const len = JSON.parse(options).length;
  const parsedOptions = JSON.parse(options);
  const initialState = JSON.stringify(new Array(len).fill(false));

  const [state, setState] = useState(initialState);
  const [otherState, setOtherState] = useState(false);
  const [text, setText] = useState("");

  const handleChange = (e) => {
    let newState = JSON.parse(state);
    newState[e.target.value] = e.target.checked;
    setState(JSON.stringify(newState));
  };

  useEffect(() => {
    let answerState = { other: "", options: [] };
    JSON.parse(state).forEach((take, idx) => {
      if (take) answerState.options.push(parsedOptions[idx]);
    });
    if (otherState) answerState.other = text;
    else answerState.other = "";
    let newAnswer = JSON.parse(answer);
    newAnswer[questionNumber] = answerState;
    setAnswerArray(JSON.stringify(newAnswer));
  }, [state, otherState, text]);

  return (
    <ElemWrapper>
      <Linkify>
        <div className="title-div">{title + (isRequired ? "*" : " ")}</div>
        <FormGroup>
          {parsedOptions.map((option, idx) => {
            return (
              <FormControlLabel
                key={idx}
                value={option}
                control={
                  <Checkbox
                    checked={JSON.parse(state)[idx]}
                    value={idx}
                    onChange={handleChange}
                  />
                }
                label={option}
              />
            );
          })}

          {other && (
            <Paper sx={{ display: "flex" }}>
              {/* TODO:   value of textfield is to be used */}
              <FormControlLabel
                value="other"
                control={
                  <Checkbox
                    name="other"
                    checked={otherState}
                    onChange={(e) => setOtherState(e.target.checked)}
                  />
                }
                label="Other:"
              />
              <TextField
                fullWidth
                variant="standard"
                value={text}
                onChange={(e) => setText(e.target.value)}
                sx={{ color: "#828DF8" }}
              />
            </Paper>
          )}
        </FormGroup>
      </Linkify>
    </ElemWrapper>
  );
};

export default CheckboxesAnswer;
