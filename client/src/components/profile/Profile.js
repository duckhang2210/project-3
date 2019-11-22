import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import { getProfileById } from '../../actions/profile';
import { getPostByUserId } from '../../actions/post';
import PostItem from '../posts/PostItem';

const Profile = ({
  getProfileById,
  profile: { profile, loading },
  post: { posts },
  auth,
  match
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);
  useEffect(() => {
    getPostByUserId(match.params.id);
  }, [getPostByUserId]);
  {
    if (
      auth.isAuthenticated &&
      auth.loading === false &&
      match.params.id === auth.user._id
    ) {
      return <Redirect to='/dashboard' />;
    }
    return (
      <Fragment>
        {profile === null || loading ? (
          <Spinner />
        ) : (
          <Fragment>
            <Link to='/profiles' className='btn btn-gradient'>
              Back to users
            </Link>

            <div className='profile-grid my-1'>
              <ProfileTop profile={profile} />
            </div>
            <h1 className='large text-primary'>Posts</h1>
            <div className='posts'>
              {posts.map(post => (
                <PostItem key={post._id} post={post} />
              ))}
            </div>
          </Fragment>
        )}
      </Fragment>
    );
  }
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  getPostByUserId: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  post: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  post: state.post
});

export default connect(mapStateToProps, { getProfileById, getPostByUserId })(
  Profile
);
