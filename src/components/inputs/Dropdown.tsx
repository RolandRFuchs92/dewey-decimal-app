import React from "react";

import { Grid, TextField, MenuItem } from "@material-ui/core";
export default ({ label, menuItems }: {label: string, menuItems: Array<{value: string, label: string}>}) => {
  return (
    <>
      <Grid item>
        <TextField label={label} select>
          {menuItems &&
            menuItems.map(i => (
              <MenuItem key={i.value} value={i.value}>
                {i.label}
              </MenuItem>
            ))}
        </TextField>
      </Grid>
    </>
  );
};
