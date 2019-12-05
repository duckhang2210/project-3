import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';

const ConversationItem = ({
  conversation: { body, name, avatar, user, updatedAt, conversationId }
}) => (
  <div className='post bg-white p-1 my-1'>
    <div>
      <Link to={`/profile/${user}`}>
        <img className='round-img' src={avatar} alt='' />
        <h4>{name}</h4>
      </Link>
    </div>
    <Link to={`/chat/${conversationId}`}>
      <p className='my-1'>{body}</p>
      <p className='post-date'>
        Posted on <Moment format='YYYY/MM/DD HH:mm'>{updatedAt}</Moment>
      </p>
    </Link>
  </div>
);

ConversationItem.propTypes = {
  conversation: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(ConversationItem);
