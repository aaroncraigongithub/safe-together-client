import { connect } from 'react-redux';
import AlertButton from './AlertButton';
import { Actions } from 'react-native-router-flux';

const mapDispatchToProps = (dispatch) => {
  return {
    onAlert: ()=> {
      console.log('ALERT!!');
    }
  }
}

const mapStateToProps = (state) => {
  return {};
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return Object.assign({}, stateProps, dispatchProps, {
    styles: ownProps.styles
  });
}

const Alert = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(AlertButton);

export default Alert;
