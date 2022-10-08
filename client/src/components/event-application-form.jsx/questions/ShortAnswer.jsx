import { TextField } from "@mui/material";
import React from "react";
import Linkify from "react-linkify";
import { ElemWrapper } from "../eventApplicationForm.styles";

const ShortAnswer = ({ title, isRequired }) => {
  return (
    <ElemWrapper>
      <Linkify>
        <div className="title-div">{title + (isRequired ? "*" : " ")}</div>
        <TextField
          fullWidth
          variant="standard"
          name={title}
          sx={{ color: "#828DF8" }}
          required={isRequired ? true : false}
          helperText={isRequired ? "This is a required field !" : ""}
        />
      </Linkify>
    </ElemWrapper>
  );
};

export default ShortAnswer;
