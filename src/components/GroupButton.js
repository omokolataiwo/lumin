import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

const GroupedButtons = ({ handleIncrement, handleDecrement, count, id }) => {
  const isEmpty = count > 0 ? false : true;

  return (
    <div>
      <ButtonGroup size="small" aria-label="small outlined button group">
        <Button disabled={isEmpty} onClick={() => handleDecrement(id)}>-</Button>
        <Button disabled  >{count}</Button>
        <Button onClick={() => handleIncrement(id)}>+</Button>
      </ButtonGroup>
    </div>
  );
}

export default GroupedButtons;
