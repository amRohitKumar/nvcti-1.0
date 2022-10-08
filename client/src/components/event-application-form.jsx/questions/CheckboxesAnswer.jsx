import {
  Paper,
  Checkbox,
  FormGroup,
  FormControlLabel,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { ElemWrapper } from "../eventApplicationForm.styles";
import Linkify from "react-linkify";

const CheckboxesAnswer = ({ title, isRequired, options, other }) => {
  const [pjl, setPjl] = useState([]);
  const getPjl = (e) => {
    pjl.push(e.target.value);
    setPjl(pjl);
  };

  // console.log(pjl);
  return (
    <ElemWrapper>
      <Linkify>
        <div className="title-div">{title + (isRequired ? "*" : " ")}</div>
        <FormGroup>
          {JSON.parse(options).map((option, idx) => {
            return (
              <FormControlLabel
                key={idx}
                value={option}
                control={<Checkbox />}
                label={option}
                onChange={(e) => getPjl(e)}
              />
            );
          })}

          {other && (
            <Paper sx={{ display: "flex" }}>
              {/* TODO:   value of textfield is to be used */}
              <FormControlLabel
                value="other"
                control={<Checkbox name="other" />}
                label="Other:"
              />
              <TextField
                fullWidth
                variant="standard"
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
