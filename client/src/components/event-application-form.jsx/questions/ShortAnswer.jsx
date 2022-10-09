import { TextField } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Linkify from "react-linkify";
import { ElemWrapper } from "../eventApplicationForm.styles";

const ShortAnswer = ({ title, isRequired, answer, questionNumber, setAnswerArray }) => {
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
          fullWidth
          variant="standard"
          value={text}
          name={title}
          sx={{ color: "#828DF8" }}
          required={isRequired ? true : false}
          helperText={isRequired ? "This is a required field !" : ""}
          onChange={handleText}
        />
      </Linkify>
    </ElemWrapper>
  );
};

export default ShortAnswer;
