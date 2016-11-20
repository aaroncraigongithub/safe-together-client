import { combineReducers } from 'redux';
import auth from './auth';
import contacts from './contacts';
import friends from './friends';
import user from './user';

export default combineReducers({
  auth,
  contacts,
  friends,
  user
});
