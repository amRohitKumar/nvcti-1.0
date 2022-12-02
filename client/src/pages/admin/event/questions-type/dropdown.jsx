import TextField from "@mui/material/TextField";
import CancelIcon from "@mui/icons-material/Cancel";

const DropdownAnswer = ({ options, setOptions }) => {
  // const [options, setOptions] = useState("[]");

  const handleInput = (evt, idx) => {
    let newOptions = JSON.parse(options);
    newOptions[idx] = evt.target.value;
    setOptions(JSON.stringify(newOptions));
  };

  const handleAddOption = () => {
    const oldOptions = JSON.parse(options);
    let len = oldOptions.length + 1;
    let newOptions = [...JSON.parse(options), `Option ${len}`];
    setOptions(JSON.stringify(newOptions));
  };

  const handleRemoveOption = (idx) => {
    let newOptions = JSON.parse(options);
    newOptions.splice(idx, 1);
    setOptions(JSON.stringify(newOptions));
  };

  return (
    <div>
      {!!options.length &&
        JSON.parse(options).map((el, idx) => (
          <div
            key={idx}
            style={{ display: "flex", alignItems: "center", gap: "1em" }}
          >
            <span style={{ fontWeight: "bold" }}>{idx + 1}.</span>
            <TextField
              variant="standard"
              hiddenLabel
              value={el}
              sx={{ my: 1, width: { md: "40%" } }}
              size="small"
              onChange={(e) => handleInput(e, idx)}
            />
            <CancelIcon
              color="error"
              sx={{ cursor: "pointer" }}
              onClick={() => handleRemoveOption(idx)}
            />
          </div>
        ))}
      <div>
        <span className="add-option" onClick={handleAddOption}>
          Add option
        </span>
      </div>
    </div>
  );
};

export default DropdownAnswer;
