import React from 'react'

import classes from './Backdrop.css'

const background = (props) => (
  props.show ? <div
    className={classes.backdrop}
    onClick={props.clicked}
    /> : null
);

export default background
