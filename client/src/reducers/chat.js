import {
  GET_CONVERSATIONS,
  GET_CONVERSATION,
  SEND_NEW_MESSAGE,
  REPLY_MESSAGE,
  CHAT_ERROR
} from '../actions/types';

const initialState = {
  conversations: [],
  messages: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_CONVERSATIONS:
      return {
        ...state,
        conversations: payload,
        loading: false
      };
    case GET_CONVERSATION:
      return {
        ...state,
        messages: payload,
        loading: false
      };
    case REPLY_MESSAGE:
      return {
        ...state,
        conversation: { ...state.conversation, messages: payload },
        loading: false
      };
    case CHAT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
