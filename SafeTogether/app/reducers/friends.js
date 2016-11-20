const initialState = {
  txState:   'empty',
  all:       [],
  confirmed: []
};

export default function friends(state = initialState, action) {
  switch (action.type) {
    case 'STORE_FRIENDS':
      return Object.assign({}, state, {
        all:     action.friends,
        txState: 'complete'
      });

      break;
    case 'STORE_CONFIRMED_FRIENDS':
      return Object.assign({}, state, {
        confirmed: action.friends
      });

      break;
    case 'UPDATE_FRIENDS_STATE':
      return Object.assign({}, state, {
        txState: action.state
      });

      break;
    default:
      return state;
  }
}
