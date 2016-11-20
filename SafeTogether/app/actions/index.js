import * as AuthActions from './auth';
import * as ContactActions from './contacts';
import * as FriendActions from './friends';
import * as UserActions from './user';

export const ActionCreators = Object.assign({},
  AuthActions,
  ContactActions,
  FriendActions,
  UserActions
);
