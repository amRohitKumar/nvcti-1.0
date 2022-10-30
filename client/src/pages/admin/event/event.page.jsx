import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addEvent } from "../../../features/events/eventsSlice";
import Wrapper from "./event.style";
import {
  EventInput,
  EventInputMultiline,
  CreateDivWrapper,
} from "./event.style";
import {
  Paper,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Button,
  FormControlLabel,
  Switch,
  Divider,
  Tooltip,
  IconButton,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

import {
  ShortAnswer,
  ParagraphAnswer,
  MultipleAnswer,
  CheckboxesAnswer,
  DropdownAnswer,
  inputTypes,
} from "./questions-type";

const AddElement = ({
  id,
  exist,
  questions,
  setQuestion,
  handleEventSubmit,
}) => {
  const prevQuestions = JSON.parse(questions);

  const initialTitle = exist ? prevQuestions[id].question : "";
  const initialType = exist ? prevQuestions[id].type : "short_anwer";
  const isRequired = exist ? prevQuestions[id].isRequired : false;
  const isOther = exist ? prevQuestions[id].other : false;
  let initialOptions = "[]";

  if (exist) {
    if (prevQuestions[id].options) {
      initialOptions = prevQuestions[id].options;
    }
  }

  const [title, setTitle] = useState(initialTitle);
  const [type, setType] = useState(initialType);
  const [options, setOptions] = useState(initialOptions);
  const [other, setOther] = useState(isOther);
  const [required, setRequired] = useState(isRequired);

  useEffect(() => {
    setTitle(initialTitle);
    setType(initialType);
    setOptions(initialOptions);
    setOther(isOther);
    setRequired(isRequired);
  }, [questions]);

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const handleSubmit = () => {
    let questionObj;
    if (type === "short_anwer" || type === "paragraph") {
      questionObj = {
        type,
        question: title,
        isRequired: required,
        other: false,
      };
    } else {
      questionObj = {
        type,
        question: title,
        options: options,
        other,
        isRequired: required,
      };
    }

    const newQuestions = [...prevQuestions, questionObj];
    setQuestion(JSON.stringify(newQuestions));
    setOptions("[]");
    setType("short_anwer");
    setTitle("");
    setOther("false");
  };
  const handleUpdate = () => {
    let questionObj;
    if (type === "short_anwer" || type === "paragraph") {
      questionObj = {
        type,
        question: title,
        isRequired: required,
        other: false,
      };
    } else {
      questionObj = {
        type,
        question: title,
        options: options,
        isRequired: required,
        other: other,
      };
    }
    let newQuestions = prevQuestions;
    newQuestions[id] = questionObj;
    setQuestion(JSON.stringify(newQuestions));
  };
  const handleRemove = () => {
    let newQuestions = JSON.parse(questions);
    newQuestions.splice(id, 1);
    setQuestion(JSON.stringify(newQuestions));
  };

  return (
    <CreateDivWrapper
      elevation={3}
      sx={{ backgroundColor: !exist ? "#4f60f617" : "" }}
    >
      <div className="control-div">
        <TextField
          className="question-input"
          hiddenLabel
          fullWidth
          multiline
          variant="filled"
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          sx={{ p: 0 }}
        />
        <FormControl variant="filled" sx={{ mx: 1, minWidth: 150 }}>
          <Select
            hiddenLabel
            id="demo-simple-select-filled"
            value={type}
            onChange={handleChange}
          >
            {inputTypes.map((item, idx) => (
              <MenuItem key={idx} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div>
        {type && type === "short_anwer" && <ShortAnswer />}
        {type && type === "paragraph" && <ParagraphAnswer />}
        {type && type === "multiple" && (
          <MultipleAnswer
            options={options}
            setOptions={setOptions}
            other={other}
            setOther={setOther}
          />
        )}
        {type && type === "checkboxes" && (
          <CheckboxesAnswer
            options={options}
            setOptions={setOptions}
            other={other}
            setOther={setOther}
          />
        )}
        {type && type === "dropdown" && (
          <DropdownAnswer options={options} setOptions={setOptions} />
        )}
      </div>
      <div className="header-div">
        <FormControlLabel
          control={
            <Switch
              checked={required}
              onChange={() => setRequired(!required)}
            />
          }
          label="Required"
        />
        <Divider orientation="vertical" flexItem />
        {!exist ? (
          <>
            <Button variant="outlined" onClick={handleSubmit} sx={{ ml: 1 }}>
              Add
            </Button>
            <Button
              variant="outlined"
              onClick={handleEventSubmit}
              sx={{ ml: 1 }}
            >
              Submit Event
            </Button>
          </>
        ) : (
          <>
            <Tooltip title="Remove">
              <IconButton onClick={handleRemove} sx={{ ml: 1 }}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <Button variant="outlined" onClick={handleUpdate}>
              Update
            </Button>
          </>
        )}
      </div>
    </CreateDivWrapper>
  );
};

const CreateEvent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [eventTitle, setEventTitle] = useState("Untitled event");
  const [description, setDescription] = useState("Form description");
  const [questions, setQuestion] = useState("[]");

  const handleEventSubmit = () => {
    // EVENT SUBMIT LOGIC
    const eventObj = {
      title: eventTitle,
      description: description,
      questions: JSON.parse(questions),
    };
    dispatch(addEvent(eventObj))
      .then(() => navigate("/admin"));
    /*
      Structure - 
      {
        title,
        description
        questions: [
          {
            type,
            question,
            isRequired,
            other (false in case of short,para,dropdonwn)
            option (in case of multiple, checkbox, dropdown) => string (array in JSON form, parse before use)
          }
        ]
      }
    */
  };

  return (
    <Wrapper sx={{ width: { lg: "50%", md: "70%", sm: "80%", xs: "95%" } }}>
      {/* EVENT INFO SECTION */}
      <Paper
        elevation={1}
        sx={{
          display: "flex",
          flexDirection: "column",
          p: "1em",
          borderTop: "10px solid #828DF8",
        }}
      >
        <EventInput
          type="text"
          size="large"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
        />
        <EventInputMultiline
          type="text"
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Paper>
      {/* EVENT QUESTIONS DISPLAY */}
      {JSON.parse(questions).map((_, idx) => (
        <AddElement
          key={idx}
          questions={questions}
          setQuestion={setQuestion}
          exist={true}
          id={idx}
        />
      ))}
      {/* EVENT QUESTIONS */}
      <AddElement
        questions={questions}
        setQuestion={setQuestion}
        handleEventSubmit={handleEventSubmit}
      />
    </Wrapper>
  );
};

export default CreateEvent;
