import { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import React from "react";
import { ElemWrapper } from "../eventApplicationForm.styles";
import Linkify from "react-linkify";

const ParagraphAnswer = ({ title, isRequired, answer, questionNumber, setAnswerArray }) => {
  const [text, setText] = useState("");
  
  const handleText = (e) => {
    setText(e.target.value);
  }

  useEffect(() => {
    let newAnswerArray = JSON.parse(answer);
    newAnswerArray[questionNumber] = text;
    setAnswerArray(JSON.stringify(newAnswerArray));
  },[text]);
  
  return (
    <ElemWrapper>
      <Linkify>
        <div className="title-div">{title + (isRequired ? "*" : " ")}</div>
        <TextField
          multiline
          rows={4}
          fullWidth
          value={text}
          onChange={handleText}
          variant="standard"
          name={title}
          helperText={isRequired ? "This is a required field !" : ""}
          required={isRequired ? true : false}
          sx={{ color: "#828DF8" }}
        />
      </Linkify>
    </ElemWrapper>
  );
};

export default ParagraphAnswer;
