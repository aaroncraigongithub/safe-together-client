import * as AuthActions from './auth';
import * as LoadingActions from './loading';
import * as ContactActions from './contacts';
import * as FriendActions from './friends';

export const ActionCreators = Object.assign({},
  AuthActions,
  LoadingActions,
  ContactActions,
  FriendActions
);
