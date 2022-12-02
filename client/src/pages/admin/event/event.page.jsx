import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { addEvent } from "../../../features/events/eventsSlice";
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
  Box,
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
import axios from "axios";
import customFetch from "../../../utils/axios";
import authHeader from "../../../utils/userAuthHeaders";

const AddElement = ({ id, exist, questions, setQuestion }) => {
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
          <Button variant="outlined" onClick={handleSubmit} sx={{ ml: 1 }}>
            Add
          </Button>
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
  const { token } = useSelector((store) => store.user.user);
  const [pageNumber, setPageNumber] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [image, setImage] = useState(null);
  const [eventTitle, setEventTitle] = useState("Untitled event");
  const [description, setDescription] = useState("Form description");
  const [questions, setQuestion] = useState("[]");

  const handleEventSubmit = async () => {
    // EVENT SUBMIT LOGIC
    try {
      // const formData = new FormData();
      // formData.append("file", image);
      // formData.append("upload_preset", "ml_default");
      // const res = await axios.post(
      //   "https://api.cloudinary.com/v1_1/dauxdhnsr/image/upload",
      //   formData
      // );
      const eventObj = {
        name: eventTitle,
        description: description,
        imageUrl:
          "https://plus.unsplash.com/premium_photo-1661331692770-1599fdab7171?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        startTime: startDate,
        endTime: endDate,
        questions: questions,
      };
      const resp = await customFetch.post(
        "/event/createevent",
        eventObj,
        authHeader(token)
      );
      console.log(resp);
      navigate('/admin');
      toast.success("Event created successfully !");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong while creating event !");
    }
    // dispatch(addEvent(eventObj)).then(() => navigate("/admin"));
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
      {pageNumber === 1 ? (
        <>
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
          <Paper component="form" sx={{ p: 3, m: 3 }}>
            {/* EVENT TIMELINE SECTION */}
            <h2 className="timelineHeading">Timeline</h2>
            <div className="innercontent">
              <label htmlFor="start_day" className="date_label">
                Opens on
                <input
                  type="date"
                  name="start_day"
                  id="start_day"
                  value={startDate}
                  onChange={(evt) => setStartDate(evt.target.value)}
                />
              </label>
              <label htmlFor="end_day" className="date_label">
                Closes on
                <input
                  type="date"
                  name="end_day"
                  id="end_day"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </label>
            </div>
            <h2 className="timelineHeading">Banner</h2>
            <div className="innercontent">
              <input
                type="file"
                name="banner"
                id="banner"
                accept="image/png, image/jpg, image/jpeg"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
          </Paper>
          <Box
            sx={{
              m: 2,
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Button
              variant="outlined"
              onClick={() => setPageNumber(2)}
              sx={{ ml: 1 }}
            >
              Next
            </Button>
          </Box>
        </>
      ) : (
        <>
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
          {/* ADD EVENT QUESTIONS */}
          <AddElement questions={questions} setQuestion={setQuestion} />
          <Box
            sx={{
              m: 2,
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Button
              variant="outlined"
              onClick={() => setPageNumber(1)}
              sx={{ ml: 1 }}
            >
              Previous
            </Button>
            <Button
              variant="outlined"
              onClick={handleEventSubmit}
              sx={{ ml: 1 }}
            >
              Submit Event
            </Button>
          </Box>
        </>
      )}
    </Wrapper>
  );
};

export default CreateEvent;
