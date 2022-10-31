import axios from 'axios';

// const API = axios.create({ baseURL: 'http://ec2-3-136-160-31.us-east-2.compute.amazonaws.com/' });

const API = axios.create({ baseURL: 'http://localhost:8000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
   req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
   // req.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFyeWFAbWVybi5jb20iLCJpZCI6IjYwMmZhOTczNzQ3NzJkMjdlODg2YTMzNSIsImlhdCI6MTYxNDA4MTIyOCwiZXhwIjoxNjE0MTY3NjI4fQ.al9O6q2c8wS1hZpK0ND8oElvICeX2cCYKuu8XBOOQ4E`;
  }

  return req;
});

export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);

export const createComment = (postId, newMessage) => API.post(`/posts/${postId}/postComment`, {postId, message: newMessage});
export const updateCommentandLikes = (postId, commentId, message, likes) => API.patch(`/posts/${commentId}/postComment`, {postId, message, likes});


export const deletePostComment = (postId, commentId) => API.delete(`/posts/${postId}/comment/${commentId}`);