import { GET_USER } from '../constants/actionTypes';

export const getUser = ( username, role ) => {
  return {
    type: GET_USER,
    payload: {
        username,
        role
    }
  }
};