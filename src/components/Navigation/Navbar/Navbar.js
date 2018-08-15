import React from 'react'

import Logo from '../../Logo/Logo'
import NavItems from '../NavItems/NavItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'
import classes from './Navbar.css'

const navbar = (props) => (
  <header className={classes.navbar}>
    <DrawerToggle className={classes.mobileOnly} clicked={props.clicked}/>
    <Logo height="95%"/>
    <nav className={classes.desktopOnly}>
      <NavItems/>
    </nav>
  </header>
);

export default navbar;
