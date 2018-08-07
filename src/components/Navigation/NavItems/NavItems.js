import React from 'react'

import NavItem from './NavItem/NavItem'
import classes from './NavItems.css'

const navItems = (props) => (
  <ul className={classes.navItems}>
    <NavItem link="/" active>Burger Builder</NavItem>
    <NavItem link="/">Checkout</NavItem>
  </ul>
);

export default navItems;
