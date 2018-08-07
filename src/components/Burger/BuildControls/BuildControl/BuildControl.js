import React from 'react';

import classes from './BuildControl.css'

const buildControl = (props) => (
  <div className={classes.buildControl}>
    <div className={classes.label}>{props.label}</div>
    <button
      className={classes.less}
      onClick={props.removed}
      disabled={props.disabled}>Remove</button>
    <button
      className={classes.more}
      onClick={props.added}>Add</button>
  </div>
);

export default buildControl;
