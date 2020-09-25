import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  formControl: {
    minWidth: 100,
  }
});

const SelectInput = ({ handleChange, value, items, label }) => {
  const classes = useStyles();

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id={label}>label</InputLabel>
      <Select
        labelId={label}
        id={label}
        value={value}
        onChange={handleChange}
        label={label}
      >
        {items.map(item => (
          <MenuItem value={item} key={item}>{item}</MenuItem>
        ))}
      </Select>
    </FormControl>
  )
};

export default SelectInput;