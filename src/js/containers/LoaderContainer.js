import React from 'react';
import { connect } from 'react-redux';
// Components
import Loader from '../components/loader/Loader';
// Actions
import * as LoaderActions from '../actions/LoaderActions.js';

class LoaderContainer extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.show !== nextProps.show;
  }
  
  render() {
    return (
      <Loader {...this.props}/>
    );
  }
}

const mapStateToProps = state => {
  return {
    loaderReducer: state.loaderReducer,
    toolsReducer: state.toolsReducer
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    reloadContent: () => {
      dispatch(LoaderActions.killLoading());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoaderContainer);
