import React from 'react'

import Logo from '../../Logo/Logo'
import NavItems from '../NavItems/NavItems'
import classes from './Navbar.css'

const navbar = (props) => (
  <header className={classes.navbar}>
    <Logo height="95%"/>
    <nav>
      <NavItems/>
    </nav>
  </header>
);

export default navbar;
