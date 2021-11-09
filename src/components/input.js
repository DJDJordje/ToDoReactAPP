import React from 'react';
import classes from './input.module.css';
const Input = React.forwardRef((props, ref) => {
  return (
    <input className={classes[props.class]} type={props.type} ref={ref}></input>
  );
});

export default Input;
