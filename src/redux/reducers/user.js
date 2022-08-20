import { GET_USER } from '../constants/actionTypes';

const initialState = {
  user: 'guest',
  role: 'guest',
}
const reducer = (user = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...user,
        user: action.payload.username,
        role: action.payload.role 
      };
    default:
      return {
        ...user
      };
  }
};

export default reducer;