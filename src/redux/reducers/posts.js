import { FETCH_ALL, CREATE, FETCH_POST } from '../constants/actionTypes';

const reducer = (posts = [], action) => {
  switch (action.type) {
    case FETCH_ALL: {
      return action.payload.reverse();
    } 
    case FETCH_POST: {
      let newPosts = [...posts];
      const postIndex = newPosts.findIndex(post => (post._id === action.payload._id));
      if (postIndex >= 0) {
        newPosts[postIndex] = action.payload;
      } else {
        newPosts.push(action.payload);
      }
      return newPosts;
    }
    case CREATE: {
      return [...posts, action.payload];
    }
    default:
      return posts;
  }
};

export default reducer;