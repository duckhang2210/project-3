import axios from 'axios';
import {
  GET_CONVERSATIONS,
  GET_CONVERSATION,
  SEND_NEW_MESSAGE,
  REPLY_MESSAGE,
  CHAT_ERROR
} from './types';

//Get all conversations
export const getConversations = () => async dispatch => {
  try {
    const res = await axios.get('/api/chat');

    dispatch({
      type: GET_CONVERSATIONS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CHAT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
