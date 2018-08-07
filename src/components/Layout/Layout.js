import React, { Fragment } from 'react';

import Navbar from '../Navigation/Navbar/Navbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
import classes from './Layout.css'

const layout = ( props ) => (
  <Fragment>
    <Navbar/>
    <SideDrawer/>
    <main className={classes.content}>
      {props.children}
    </main>
  </Fragment>
);

export default layout;
