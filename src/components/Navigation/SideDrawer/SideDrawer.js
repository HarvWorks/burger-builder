import React, { Fragment }  from 'react'

import NavItems from '../NavItems/NavItems'
import Logo from '../../Logo/Logo'
import Backdrop from '../../UI/Backdrop/Backdrop'
import classes from './SideDrawer.css'

const sideDrawer = (props) => {
  let attachedClasses = [classes.sideDrawer, classes.close]
  if (props.show) {
    attachedClasses = [classes.sideDrawer, classes.open]
  }
  return (
    <Fragment>
      <Backdrop show={props.show} clicked={props.clicked}/>
        <div className={attachedClasses.join(' ')}>
          <div className={classes.logo}>
            <Logo/>
          </div>
          <nav>
            <NavItems/>
          </nav>
        </div>
    </Fragment>
  )
};

export default sideDrawer;
