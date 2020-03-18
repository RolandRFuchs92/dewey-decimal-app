import React from "react";

import { Grid } from "@material-ui/core";
import { SubmitButton, ResetButton } from "./StandardButtons";

type formButtonModel = {
  onReset: () => void;
  onSubmit: () => void;
};

export default ({ onReset, onSubmit }: formButtonModel) => {
  return (
    <Grid item>
      <Grid container direction="row" alignItems="flex-end" justify="flex-end">
        <Grid item style={{ marginTop: 15 }}>
          <ResetButton onClick={onReset}></ResetButton>
          <SubmitButton onClick={onSubmit}></SubmitButton>
        </Grid>
      </Grid>
    </Grid>
  );
};
