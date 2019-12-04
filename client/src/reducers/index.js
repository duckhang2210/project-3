import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';
import conversation from './chat';

export default combineReducers({
  alert,
  auth,
  profile,
  post,
  conversation
});
