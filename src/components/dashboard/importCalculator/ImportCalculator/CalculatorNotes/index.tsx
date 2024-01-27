import { Card, Stack, Typography } from "@mui/material";
import { FC } from "react";
import CalculatorNotesTable from "./CalculatorNotesTable";
import NotesInput from "./NotesInput";

const CalculatorNotes: FC = () => (
    <Stack component={Card} p={2} elevation={0} variant="outlined" gap={2}>
      <Typography variant="h6" fontWeight={600} sx={{ textTransform: "uppercase" }}>
        Links y Notas
      </Typography>

      <NotesInput />

      <CalculatorNotesTable />
    </Stack>
  );

export default CalculatorNotes;
