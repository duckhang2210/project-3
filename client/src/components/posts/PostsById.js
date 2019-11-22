import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import { getPostByUserId } from '../../actions/post';

const PostsById = ({
  getPostByUserId,
  post: { posts, loading },
  auth,
  match
}) => {
  useEffect(() => {
    getPostByUserId(auth.user._id);
  }, [getPostByUserId]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Posts</h1>
      <div className='posts'>
        {posts.map(post => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </Fragment>
  );
};

PostsById.propTypes = {
  getPostByUserId: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth
});

export default connect(mapStateToProps, { getPostByUserId })(PostsById);
