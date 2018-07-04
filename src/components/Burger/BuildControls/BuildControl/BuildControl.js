import React from 'react';

import classes from './BuildControl.css'

const buildControl = (props) => (
  <div className={classes.buildControl}>
    <div className={classes.label}>{props.label}</div>
    <div className={classes.less}>Remove</div>
    <div className={classes.more}>Add</div>
  </div>
);

export default buildControl;
