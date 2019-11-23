import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import { getPostByUserId } from '../../actions/post';

const PostsById = ({
  getPostByUserId,
  post: { posts, loading },
  auth,
  profile: { profile }
}) => {
  //console.log(profile.user._id);
  useEffect(() => {
    getPostByUserId(profile.user._id);
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
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getPostByUserId })(PostsById);
