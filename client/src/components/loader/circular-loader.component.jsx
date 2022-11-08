import { Box, CircularProgress } from "@mui/material";

const CircularLoader = () => (
  <Box sx={{ display: "flex" }}>
    <CircularProgress sx={{ mx: "auto", mt: 5 }} />;
  </Box>
);

export default CircularLoader;
