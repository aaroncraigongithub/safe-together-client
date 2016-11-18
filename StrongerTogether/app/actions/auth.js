import * as LoadingActions from './loading';
import Api from './../lib/api';
import { Alert, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';

export function login(email, password) {
  return (dispatch) => {
    dispatch(LoadingActions.loading(true));

    return Api.login(email, password).then(token=> {
      dispatch(LoadingActions.loading(false));
      dispatch(updateToken(token));
    })
    .catch(error=> {
      console.log("auth actions::login error", error);
      dispatch(LoadingActions.loading(false));

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
    dispatch(LoadingActions.loading(true));

    return Api.register(email, password).then(token=> {
      dispatch(LoadingActions.loading(false));
      dispatch(updateToken(token));
    })
    .catch(error=> {
      console.log("auth actions::register error", error);
      dispatch(LoadingActions.loading(false));

      let message = error.error ?
        error.error.message : 'There was an error on the server.';

      if (error.status === 422 && message.indexOf('UniqueViolation') > -1) {
        message = 'This account is already taken.';
      }

      Alert.alert('There was a problem', message);
    });
  }
}

export function loadLocalToken() {
  return (dispatch) => {
    return AsyncStorage.getItem('token').then(token=> {
      dispatch(updateToken(token));
      // dispatch(updateToken(null));
    });
  }
}

export function updateToken(token) {
  return (dispatch) => {
    const action = {
      type:  'AUTH_TOKEN',
      token: token
    };

    if (token) {
      Api.setToken(token);

      return AsyncStorage.setItem('token', token).then(()=> {
        Actions.alert({type: 'replace'});

        return action;
      });
    } else {
      Actions.login({type: 'replace'});
    }

    return action;
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
