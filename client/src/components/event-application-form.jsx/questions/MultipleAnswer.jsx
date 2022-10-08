import {
  Paper,
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

const MultipleAnswer = ({ title, isRequired, options, other }) => {
  const [value, setValue] = useState("");
  // const [otherInfo, setOtherInfo] = useState("Other");
  // const [disabled, setDisabled] = useState(true);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

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
              // <div>
              <FormControlLabel
                value="Other"
                control={<Radio />}
                label="Others"
                // onClick={() => setDisabled(!disabled)}
              />
              //   <TextField
              //     fullWidth
              //     disabled={disabled}
              //     placeholder="Please specify"
              //     variant="standard"
              //     onChange={(e) => setOtherInfo(e.target.value)}
              //     sx={{ color: "#828DF8" }}
              //   />
              // </div>
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
