import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  TextField,
  FormHelperText,
} from "@mui/material";
import React, { useState } from "react";
import { ElemWrapper } from "../eventApplicationForm.styles";
import Linkify from "react-linkify";
import { Box } from "@mui/system";
import { useEffect } from "react";

const MultipleAnswer = ({
  title,
  isRequired,
  options,
  other,
  answer,
  questionNumber,
  setAnswerArray,
}) => {
  const [value, setValue] = useState("");
  const [otherText, setOtherText] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    let answerState = { other: "", options: [] };
    if (value === "other") {
      answerState.other = otherText;
      answerState.options = [];
    } else {
      answerState.other = "";
      answerState.options = [value];
    }
    let newAnswer = JSON.parse(answer);
    newAnswer[questionNumber] = answerState;
    setAnswerArray(JSON.stringify(newAnswer));
  }, [value, otherText]);

  return (
    <ElemWrapper>
      <Linkify>
        <div className="title-div">{title + (isRequired ? " *" : " ")}</div>
        <FormControl>
          <RadioGroup name={title} onChange={handleChange} value={value}>
            {JSON.parse(options).map((option, idx) => {
              return (
                <FormControlLabel
                  key={idx}
                  value={option}
                  control={<Radio required={isRequired ? true : false} />}
                  label={option}
                />
              );
            })}
            {other && (
              <Box sx={{ display: "flex" }}>
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Others"
                />
                <TextField
                  fullWidth
                  disabled={value !== "other"}
                  placeholder="Please specify"
                  variant="standard"
                  value={otherText}
                  onChange={(e) => setOtherText(e.target.value)}
                  sx={{ color: "#828DF8" }}
                />
              </Box>
            )}
          </RadioGroup>
          {isRequired && (
            <FormHelperText>This is a required field </FormHelperText>
          )}
        </FormControl>
      </Linkify>
    </ElemWrapper>
  );
};

export default MultipleAnswer;
