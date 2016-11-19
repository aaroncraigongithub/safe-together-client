import Api from './../lib/api';
import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import * as UserActions from './user'

export function login(email, password) {
  return (dispatch) => {
    return Api.login(email, password).then(user => {
      dispatch(UserActions.updateUser(user));
    })
    .catch(error=> {
      console.log("auth actions::login error", error);
      let title   = 'There was a problem';
      let message = error.error ?
        error.error.message : 'There was an error on the server.';

      if (message === 'SessionManager::InvalidLogin') {
        title   = 'Login failed!';
        message = 'Please check your email and password and try again.';
      }

      Alert.alert(title, message);
    });
  }
}

export function register(email, password) {
  return (dispatch) => {
    return Api.register(email, password).then(user => {
      dispatch(UserActions.updateUser(user));
    })
    .catch(error=> {
      console.log("auth actions::register error", error);
      let message = error.error ?
        error.error.message : 'There was an error on the server.';

      if (error.status === 422 && message.indexOf('UniqueViolation') > -1) {
        message = 'This account is already taken.';
      }

      Alert.alert('There was a problem', message);
    });
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
