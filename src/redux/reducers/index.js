import { combineReducers } from 'redux';

import posts from './posts.js';
import user from './user.js';

export const reducers = combineReducers({ 
    posts,
    user
});