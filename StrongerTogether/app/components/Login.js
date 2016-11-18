import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import { Actions } from 'react-native-router-flux';
import * as AuthActions from './../actions/auth';
import BasicText from './BasicText';
import styles from './Styles';

const params = {
  email:    '',
  password: '',
  register: false
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: ()=> {
      if (params.register) {
        dispatch(AuthActions.register(params.email, params.password));
      } else {
        dispatch(AuthActions.login(params.email, params.password));
      }
    },
    onEmail: (email) => {
      params.email = email;
      dispatch(AuthActions.updateLoginEmail(email));
    },
    onPassword: (password) => {
      params.password = password;
      dispatch(AuthActions.updateLoginPassword(password));
    },
    onSecondary: () => {
      Actions.register();
    }
  }
}

const isButtonDisabled = (state) => {
  const email = state.auth.email;
  const password = state.auth.password;

  if (!email || !password) {
    return true;
  }

  if (email.indexOf('@') < 0) {
    return true;
  }

  if (email.indexOf('.') < 0) {
    return true;
  }

  return false;
}

const mapStateToProps = (state) => {
  return {
    loading:        state.loading.isLoading,
    buttonDisabled: isButtonDisabled(state),
    email:          state.auth.email,
    password:       state.auth.password
  };
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  params.register = ownProps.newAccount;

  return Object.assign({}, stateProps, dispatchProps, {
    secondaryText: params.register ? '' : 'or create an account',
    buttonText:    params.register ? 'Register' : 'Login'
  });
}

const Login = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(LoginForm);

export default Login;
