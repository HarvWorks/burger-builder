import React from 'react'

import classes from './Input.css';

const input = (props) => {
  let inputElement = null;
  let inputClasses = [classes.inputElement];

  if (props.invalid && props.shouldValidate) {
    inputClasses.push(classes.invalid)
  }
  switch (props.elementType) {
    case 'input':
      inputElement = <input
        className={inputClasses.join(' ')}
        onChange={props.changed}
        {...props.elementConfig}
        value={props.value} />;
      break;
    case 'textarea':
      inputElement = <textarea
        className={inputClasses.join(' ')}
        onChange={props.changed}
        {...props.elementConfig}
        value={props.value} ></textarea>;
      break;
    case 'select':
      inputElement = (
        <select
        className={inputClasses.join(' ')}
        onChange={props.changed}
        value={props.value} >
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>{option.displayValue}</option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = <input
        className={inputClasses.join(' ')}
        onChange={props.changed}
        {...props.elementConfig}
        value={props.value} />;
      break;
  }

  return (
    <div className={classes.input}>
      <label className={classes.label}>{props.label}</label>
      {inputElement}
    </div>
  )
}

export default input
