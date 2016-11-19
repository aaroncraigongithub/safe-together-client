import * as ContactActions from './contacts';
import Api from './../lib/api';
import { Alert, AsyncStorage } from 'react-native';

export function loadFriends() {
  return (dispatch) => {
    dispatch(updateState('pending'));

    Api.getFriends().then(friends => {
      dispatch(updateFriends(friends));
    })
    .catch(error => {
      console.log("ERROR getting friends", error);
    });
  }
}

export function confirm(token) {
  return (dispatch) => {
    return Api.confirmFriend(token).then(() => {
      dispatch(loadFriends());
    })
    .catch(error=> {
      console.log("error accepting invitation", error);
    });
  }
}

export function updateState(state) {
  return {
    type: 'UPDATE_FRIENDS_STATE',
    state: state
  };
}

export function updateFriends(friends) {
  return (dispatch, getState) => {
    const {txState, all} = getState().friends;
    let toUpdate = friends;

    if (txState === 'complete') {
      const ids = all.map((friend) => (friend.id));
      const newFriends = friends.filter((friend) => (
        ids.indexOf(friend.id) === -1
      ));

      toUpdate = all.concat(newFriends);
    }

    const confirmed = filterConfirmedFriends(toUpdate);

    dispatch(storeFriends(toUpdate));
    dispatch(storeConfirmedFriends(confirmed));
    dispatch(ContactActions.loadContacts());
  }
}

const filterConfirmedFriends = (friends) => {
  return friends.filter((friend) => (friend.attributes.confirmedAt !== null));
}

export function storeFriends(friends) {
  return {
    type: 'STORE_FRIENDS',
    friends: friends
  }
}

export function storeConfirmedFriends(friends) {
  return {
    type: 'STORE_CONFIRMED_FRIENDS',
    friends: friends
  }
}
