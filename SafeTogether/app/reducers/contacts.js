const initialState = {
  txState:  'empty',
  all:      [],
  filtered: []
};

export default function contacts(state = initialState, action) {
  switch (action.type) {
    case 'STORE_CONTACTS':
      return Object.assign({}, state, {
        all:     action.contacts,
        txState: 'complete'
      });

      break;
    case 'STORE_FILTERED_CONTACTS':
      return Object.assign({}, state, {
        filtered: action.contacts
      });

      break;
    case 'UPDATE_CONTACTS_STATE':
      return Object.assign({}, state, {
        txState: action.state
      });

      break;
    default:
      return state;
  }
}
