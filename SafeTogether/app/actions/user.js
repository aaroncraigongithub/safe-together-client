import Api from './../lib/api';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';

export function loadUser() {
  return (dispatch) => {
    return AsyncStorage.getItem('user').then(user => {
      dispatch(updateUser(JSON.parse(user)));
    });
  }
}

export function confirm(token) {
  return (dispatch) => {
    return Api.confirmAccount(token).then((user) => {
      console.log('confirmed', user);

      dispatch(updateUser(user));
    })
    .catch(error=> {
      if (error.status === 422 &&
          error.error.message === 'UserManager::TokenAlreadyUsed') {

          dispatch(loadUser());
      } else {
        console.log("error confirming account", error);
      }
    });
  }
}

export function updateUser(user) {
  return (dispatch) => {
    if (user) {
      dispatch(storeUser(user));
      Api.setToken(user.attributes.token);

      return AsyncStorage.setItem('user', JSON.stringify(user)).then(()=> {
        Actions.alert({type: 'replace'});
      });
    } else {
      Actions.login({type: 'replace'});
    }
  }
}

export function storeUser(user) {
  return {
    type: 'STORE_USER',
    user: user
  };
}
