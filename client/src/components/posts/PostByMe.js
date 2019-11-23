import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';
import { getPostsByMe } from '../../actions/post';

const Posts = ({ getPostsByMe, post: { posts, loading } }) => {
  useEffect(() => {
    getPostsByMe();
  }, [getPostsByMe]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <PostForm />
      <div className='posts'>
        {posts.map(post => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  getPostsByMe: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPostsByMe })(Posts);
