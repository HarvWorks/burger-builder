import React, {Fragment} from 'react'

import classes from './Modal.css'
import Backdrop from '../Backdrop/Backdrop'

const modal = (props) => (
  <Fragment>
    <Backdrop show={props.show} clicked={props.clicked}/>
    <div className={classes.modal}
      style={{
        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
        display: props.show ? '1' : '0'
      }}>
      <div className={classes.close} onClick={props.clicked}>x</div>
      {props.children}
    </div>
  </Fragment>
);

export default modal
