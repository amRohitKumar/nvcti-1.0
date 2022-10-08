import {
  MenuItem,
  FormControl,
  Select,
  Divider,
  FormHelperText,
} from "@mui/material";
import React, { useState } from "react";
import { ElemWrapper } from "../eventApplicationForm.styles";
import Linkify from "react-linkify";

const DropdownAnswer = ({ title, isRequired, options, other }) => {
  const [answer, setAnswer] = useState("");
  const handleChange = (e) => {
    setAnswer(e.target.value);
  };

  return (
    <ElemWrapper>
      <Linkify>
        <div className="title-div">{title + (isRequired ? "*" : " ")}</div>
        <FormControl fullWidth>
          <Select
            name={title}
            value={answer}
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
