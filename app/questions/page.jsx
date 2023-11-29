import React from "react";
import { Button, FormControl, TextField } from "@mui/material";

export default function CreateQuestion() {
  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <FormControl>
        <TextField
          type="text"
          size="small"
          variant="outlined"
          label="Küsimus"
          id="formTitle"
        />
        <br />
        <TextField
          type="text"
          size="small"
          variant="outlined"
          label="Vastus"
          id="formDescription"
        />
        <br />
        <Button>Salvesta</Button>
      </FormControl>
    </div>
  );
}
