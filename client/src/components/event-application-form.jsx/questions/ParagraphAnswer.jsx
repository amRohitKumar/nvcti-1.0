import { TextField } from "@mui/material";
import React from "react";
import { ElemWrapper } from "../eventApplicationForm.styles";
import Linkify from "react-linkify";

const ParagraphAnswer = ({ title, isRequired }) => {
  return (
    <ElemWrapper>
      <Linkify>
        <div className="title-div">{title + (isRequired ? "*" : " ")}</div>
        <TextField
          multiline
          rows={4}
          fullWidth
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
