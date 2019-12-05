import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { replyMessage } from '../../actions/chat';

const ChatForm = ({ conversationId, replyMessage }) => {
  const [body, setBody] = useState('');

  return (
    <div className='post-form'>
      <form
        className='form my-1'
        onSubmit={e => {
          e.preventDefault();
          replyMessage(conversationId, { body });
          setBody('');
        }}
      >
        <textarea
          name='body'
          cols='30'
          rows='5'
          placeholder='Say something, do not just seen!!'
          value={body}
          onChange={e => setBody(e.target.value)}
          required
        />
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

ChatForm.propTypes = {
  replyMessage: PropTypes.func.isRequired
};

export default connect(null, { replyMessage })(ChatForm);
