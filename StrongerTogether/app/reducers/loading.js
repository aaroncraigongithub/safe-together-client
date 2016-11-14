const initialState = {
  isLoading: false
};

export default function loading(state = initialState, action) {
  switch(action.type) {
    case 'LOADING':
      return Object.assign({}, state, {
        isLoading: action.loading
      });

      break;
    default:
      return state;
  }
}
