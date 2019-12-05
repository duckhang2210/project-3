import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ChatItem from './ChatItem';
import { getConversation } from '../../actions/chat';

const Conversation = ({
  getConversation,
  conversation: { messages, loading },
  match
}) => {
  useEffect(() => {
    getConversation(match.params.id);
  }, [getConversation, match.params.id]);

  return loading || messages === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='comments'>
        {messages.map(message => (
          <ChatItem
            key={message._id}
            message={message}
            messageId={message._id}
          />
        ))}
      </div>
    </Fragment>
  );
};

Conversation.propTypes = {
  getConversation: PropTypes.func.isRequired,
  conversation: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  conversation: state.conversation
});

export default connect(mapStateToProps, { getConversation })(Conversation);
