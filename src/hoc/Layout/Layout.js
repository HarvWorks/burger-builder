import React, { Component, Fragment } from 'react';

import Navbar from '../../components/Navigation/Navbar/Navbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import classes from './Layout.css'

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  sideDrawerCloseHandler = () => {
    this.setState({showSideDrawer: false});
  }

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer }
    });
  }

  render () {
    return (
      <Fragment>
        <Navbar clicked={this.sideDrawerToggleHandler}/>
        <SideDrawer
          clicked={this.sideDrawerCloseHandler}
          show={this.state.showSideDrawer}/>
        <main className={classes.content}>
          {this.props.children}
        </main>
      </Fragment>
    )
  }
}

export default Layout;
