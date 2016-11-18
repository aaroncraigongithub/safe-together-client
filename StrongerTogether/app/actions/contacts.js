import * as LoadingActions from './loading';
import Api from './../lib/api';
import { Alert, AsyncStorage } from 'react-native';
import ContactsManager from './../lib/contacts';

export function loadContacts() {
  return (dispatch, getState) => {
    const {txState} = getState().contacts;

    if (txState === 'complete') {
      dispatch(filterContacts());
      return;
    }

    dispatch(updateState('pending'));
    ContactsManager.getContacts().then(contacts => {
      dispatch(updateContacts(contacts));
    })
    .catch(error => {
      console.log("ERROR getting contacts", error);
    });
  }
}

export function updateState(state) {
  return {
    type: 'UPDATE_STATE',
    state: state
  };
}

export function updateContacts(contacts) {
  return (dispatch) => {
    const filteredContacts = filterContacts(contacts);

    dispatch(storeContacts(contacts));
    dispatch(filterContacts());
  }
}

export function filterContacts(contacts) {
  return (dispatch, getState) => {
    const friendState = getState().friends;
    const {all} = getState().contacts;

    if (friendState.txState === 'complete') {
      dispatch(storeFilteredContacts(filterFriends(all, friendState.all)));
    }
  }
}

const filterFriends = (contacts, friends) => {
  const emails = friends.map(friend => {
    return friend.relationships.friend.attributes.email;
  });

  return contacts.filter(contact => {
    return contact.emails.filter(email => {
      return emails.indexOf(email) > -1;
    }).length === 0;
  });
}

export function storeContacts(contacts) {
  return {
    type: 'STORE_CONTACTS',
    contacts: contacts
  }
}

export function storeFilteredContacts(contacts) {
  return {
    type: 'STORE_FILTERED_CONTACTS',
    contacts: contacts
  };
}
