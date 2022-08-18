import axios from 'axios';

export const fetchPosts = () => axios.get(`${process.env.REACT_APP_GET_POSTS_URL}`);
export const fetchPost = (postId) => axios.get(`${process.env.REACT_APP_GET_POST_URL}/${postId}`);
export const createPost = (newPost) => axios.post(`${process.env.REACT_APP_GET_POST_URL}`, newPost);
