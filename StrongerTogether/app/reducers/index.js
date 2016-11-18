import { combineReducers } from 'redux';
import auth from './auth';
import loading from './loading';
import contacts from './contacts';
import friends from './friends';

export default combineReducers({
  auth,
  loading,
  contacts,
  friends
});
