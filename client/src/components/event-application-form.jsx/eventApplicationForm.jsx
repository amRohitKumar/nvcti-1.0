import Linkify from "react-linkify";
import { Button, Paper, Box } from "@mui/material";
import {
  ShortAnswer,
  ParagraphAnswer,
  MultipleAnswer,
  CheckboxesAnswer,
  DropdownAnswer,
} from "./questions";
import { EventInput, EventInputMultiline } from "./eventApplicationForm.styles";
import Wrapper from "./eventApplicationForm.styles";
import { Page } from "../";
import { eventFormData } from "../../data";

const EventApplicationForm = () => {
  const { title, description, questions } = eventFormData;
  // console.log(questions);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    console.log(Object.fromEntries(data.entries()));
  };

  return (
    <Page title={"APPLY NOW"}>
      <Wrapper sx={{ width: { lg: "55%", md: "70%", sm: "80%", xs: "95%" } }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              p: "1em",
              borderTop: "10px solid #828DF8",
            }}
          >
            <Linkify>
              <EventInput size="large">{title} </EventInput>
              <EventInputMultiline>{description}</EventInputMultiline>
            </Linkify>
          </Paper>

          {questions.map(
            ({ type, question, isRequired, options, other }, idx) => {
              if (type === "short_anwer")
                return (
                  <ShortAnswer
                    key={idx}
                    title={question}
                    isRequired={isRequired}
                  />
                );
              else if (type === "paragraph")
                return (
                  <ParagraphAnswer
                    key={idx}
                    title={question}
                    isRequired={isRequired}
                  />
                );
              else if (type === "multiple")
                return (
                  <MultipleAnswer
                    key={idx}
                    title={question}
                    isRequired={isRequired}
                    options={options}
                    other={other}
                  />
                );
              else if (type === "dropdown")
                return (
                  <DropdownAnswer
                    key={idx}
                    title={question}
                    isRequired={isRequired}
                    options={options}
                    other={other}
                  />
                );
              else if (type === "checkboxes")
                return (
                  <CheckboxesAnswer
                    key={idx}
                    title={question}
                    isRequired={isRequired}
                    options={options}
                    other={other}
                  />
                );
            }
          )}
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Box>
      </Wrapper>
    </Page>
  );
};

export default EventApplicationForm;
