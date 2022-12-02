import Paper from "@mui/material/Paper";

export const ShortAnswer = () => (
  <Paper
    elevation={2}
    sx={{
      my: 2,
      p: 1,
      boxShadow:
        "0px 2px 4px rgba(31, 41, 55, 0.06), 0px 4px 6px rgba(100, 116, 139, 0.12)",
    }}
  >
    Short answer text
  </Paper>
);

export const ParagraphAnswer = () => (
  <Paper
    elevation={2}
    sx={{
      my: 2,
      p: 1,
      boxShadow:
        "0px 2px 4px rgba(31, 41, 55, 0.06), 0px 4px 6px rgba(100, 116, 139, 0.12)",
    }}
  >
    Paragraph answer text
  </Paper>
);
