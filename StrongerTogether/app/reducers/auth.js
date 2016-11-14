const initialState = {
  token: null
};

export default function auth(state = initialState, action) {
  switch(action.type) {
    case 'AUTH_TOKEN':
      return Object.assign({}, state, {
        token: action.token
      });

      break;
    case 'AUTH_FORM_EMAIL':
      return Object.assign({}, state, {
        email: action.email
      });

      break;
    case 'AUTH_FORM_PASSWORD':
      return Object.assign({}, state, {
        password: action.password
      });

      break;
    default:
      return state;
  }
}
