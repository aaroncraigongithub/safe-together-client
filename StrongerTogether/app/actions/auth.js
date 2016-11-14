import * as LoadingActions from './loading';
import Api from './../lib/api';
import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';

export function login(email, password) {
  return (dispatch) => {
    dispatch(LoadingActions.loading(true));

    return Api.login(email, password).then(token=> {
      dispatch(LoadingActions.loading(false));
      dispatch(updateToken(token));
    })
    .catch(error=> {
      dispatch(LoadingActions.loading(false));

      const message = error.error ?
        error.error.message : 'There was an error on the server.'

      Alert.alert('There was a problem', message);
    });
  }
}

export function register(email, password) {
  return (dispatch) => {
    dispatch(LoadingActions.loading(true));

    return Api.register(email, password).then(token=> {
      dispatch(LoadingActions.loading(false));
      dispatch(updateToken(token));
    })
    .catch(error=> {
      console.log("auth actions::register error", error);
      dispatch(LoadingActions.loading(false));

      let message = '';

      if (error.status === 422 && error.error &&
        error.error.message.indexOf('UniqueViolation') > -1) {
          message = 'This account is already taken.';
      } else {
        message = 'There was an error on the server.';
      }

      Alert.alert('There was a problem', message);
    });
  }
}

export function updateToken(token) {
  if (token) {
    console.log('navigating to alert');
    Actions.alert();
  } else {
    console.log('navigating to login');
    Actions.login();
  }

  return {
    type:  'AUTH_TOKEN',
    token: token
  }
}

export function updateLoginEmail(email) {
  return {
    type:  'AUTH_FORM_EMAIL',
    email: email
  }
}

export function updateLoginPassword(password) {
  return {
    type:     'AUTH_FORM_PASSWORD',
    password: password
  }
}
