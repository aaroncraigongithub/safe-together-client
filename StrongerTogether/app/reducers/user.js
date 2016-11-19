const initialState = {
  user: null
};

export default function auth(state = initialState, action) {
  switch(action.type) {
    case 'STORE_USER':
      return Object.assign({}, state, {
        user: action.user
      });

      break;
    default:
      return state;
  }
}
