import React, { Fragment }  from 'react'
import classes from './DrawerToggle.css'

const drawerToggle = (props) => (
  <div className={[props.className, classes.DrawerToggle].join(' ')} onClick={props.clicked}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default drawerToggle;
