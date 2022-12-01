import {
  MenuItem,
  FormControl,
  Select,
  Divider,
  FormHelperText,
} from "@mui/material";
import React, { useState } from "react";
import { ElemWrapper } from "../eventForm.styles";
import Linkify from "react-linkify";
import { useEffect } from "react";

const DropdownAnswer = ({
  title,
  isRequired,
  options,
  other,
  answer,
  questionNumber,
  setAnswerArray,
}) => {
  const [state, setState] = useState("");
  const handleChange = (e) => {
    setState(e.target.value);
  };

  useEffect(() => {
    let newAnswer = JSON.parse(answer);
    newAnswer[questionNumber] = state;
    setAnswerArray(JSON.stringify(newAnswer));
  }, [state]);

  return (
    <ElemWrapper>
      <Linkify>
        <div className="title-div">{title + (isRequired ? "*" : " ")}</div>
        <FormControl fullWidth>
          <Select
            name={title}
            value={state}
            onChange={handleChange}
            required={isRequired ? true : false}
          >
            <MenuItem disabled value="">
              <em>Choose</em>
            </MenuItem>
            <Divider />
            {JSON.parse(options).map((option, idx) => {
              return (
                <MenuItem key={idx} value={option}>
                  {option}
                </MenuItem>
              );
            })}
            {other && <MenuItem value="None">None</MenuItem>}
          </Select>
          {isRequired && (
            <FormHelperText>This is a required field !</FormHelperText>
          )}
        </FormControl>
      </Linkify>
    </ElemWrapper>
  );
};

export default DropdownAnswer;
