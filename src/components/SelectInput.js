import React from 'react';
import { FormControl, Select, MenuItem, InputBase } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { white } from '../colors';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    position: 'relative',
    backgroundColor: white,
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles({
});

const SelectInput = ({ handleChange, value, items, label }) => {
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl}>
      <Select
        labelId={label}
        id={label}
        value={value}
        onChange={handleChange}
        label={label}
        input={<BootstrapInput />}
      >
        {items.map(item => (
          <MenuItem value={item} key={item}>{item}</MenuItem>
        ))}
      </Select>
    </FormControl>
  )
};

export default SelectInput;