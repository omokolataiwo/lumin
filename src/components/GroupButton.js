import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(() => ({
  btnGroup: {
    border: '1px solid #ccc',
    borderRadius: 0,
    '& button': {
      border: 0,
    },
    '& button:disabled': {
      border: 0,
    }
  },
}));

const GroupedButtons = ({ handleIncrement, handleDecrement, count, id }) => {
  const classes = useStyles();
  const isEmpty = count > 0 ? false : true;

  return (
    <div>
      <ButtonGroup className={classes.btnGroup} size="small" aria-label="small button group">
        <Button disabled={isEmpty} onClick={() => handleDecrement(id)}>-</Button>
        <Button disabled  >{count}</Button>
        <Button onClick={() => handleIncrement(id)}>+</Button>
      </ButtonGroup>
    </div>
  );
}

export default GroupedButtons;
