import React, { Component, Fragment } from 'react';

import Modal from '../../components/UI/Modal/Modal';

const errorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    };

    componentWillMount () {
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(res => res, error => {
        if (error) {
          this.setState({ error: error })
        }
      });
    }

    componentWillUnmount () {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null })
    }

    render () {
      return (
        <Fragment>
          <Modal
            clicked={this.errorConfirmedHandler}
            show={this.state.error}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Fragment>
      );
    }
  }
};

export default errorHandler;
