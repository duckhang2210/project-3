import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ConversationItem from './ConversationItem';
import { getConversations } from '../../actions/chat';

const Conversations = ({
  getConversations,
  conversation: { conversations, loading }
}) => {
  useEffect(() => {
    getConversations();
  }, [getConversations]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='text-primary'>Conversation</h1>

      <div className='posts'>
        {conversations.map(conversation => (
          <ConversationItem
            key={conversation._id}
            conversation={conversation}
          />
        ))}
      </div>
    </Fragment>
  );
};

Conversations.propTypes = {
  getConversations: PropTypes.func.isRequired,
  conversation: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  conversation: state.conversation
});

export default connect(mapStateToProps, { getConversations })(Conversations);
