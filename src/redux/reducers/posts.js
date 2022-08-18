import { FETCH_ALL, CREATE, FETCH_POST } from '../constants/actionTypes';

const reducer = (posts = [], action) => {
  switch (action.type) {
    case FETCH_ALL: {
      // action.payload is array of post objects retrieved from api
      // state.posts may already contain some old posts, overwrite state.posts with action.payload
      // this function (all reducer methods) returns the new state of the app
      return action.payload;
    } 
    case FETCH_POST: {
      let newPosts = [...posts];

      const postIndex = newPosts.findIndex(post => (post._id === action.payload._id));

      if (postIndex >= 0) {
        newPosts[postIndex] = action.payload;
      } else {
        // If fetched post is not found in the state, postIndex is -1
        // and can just add action.payload to end of newPosts array.
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