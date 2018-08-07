import React from 'react'

import NavItems from '../NavItems/NavItems'
import Logo from '../../Logo/Logo'
import Backdrop from '../../UI/Backdrop/Backdrop'
import classes from './SideDrawer.css'

const sideDrawer = (props) => {
  return (
    <div className={[classes.sideDrawer].join(' ')}>
      <Logo height="11%"/>
      <nav>
        <NavItems/>
      </nav>
    </div>
  )
};

export default sideDrawer;
