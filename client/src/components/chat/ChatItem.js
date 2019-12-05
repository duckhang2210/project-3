import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';

const ChatItem = ({ message: { name, avatar, body, updatedAt } }) => (
  <div className='post bg-white p-1 my-1'>
    <div>
      <img className='round-img' src={avatar} alt='' />
      <h4>{name}</h4>
    </div>
    <p className='my-1'>{body}</p>
    <p className='post-date'>
      Posted on <Moment format='YYYY/MM/DD HH:mm'>{updatedAt}</Moment>
    </p>
  </div>
);

ChatItem.propTypes = {
  message: PropTypes.object.isRequired
};

export default connect(null)(ChatItem);
