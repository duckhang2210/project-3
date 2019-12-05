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

//Get specific conversation by Id
export const getConversation = id => async dispatch => {
  try {
    const res = await axios.get(`/api/chat/${id}`);

    dispatch({
      type: GET_CONVERSATION,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CHAT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Reply message
export const replyMessage = (conversationId, formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(
      `/api/chat/${conversationId}`,
      formData,
      config
    );

    dispatch({
      type: REPLY_MESSAGE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CHAT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
