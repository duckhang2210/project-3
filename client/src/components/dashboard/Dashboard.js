import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import PostForm from '../posts/PostForm';
import ProfileTop from '../profile/ProfileTop';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import PostsById from '../posts/PostsById';

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
  post: { posts }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          <ProfileTop profile={profile} />
          <div className='my-2'>
            <button className='btn btn-danger' onClick={() => deleteAccount()}>
              <i className='fas fa-user-minus'></i> Delete my account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>Let setup your profile so other people can know more about you</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </Fragment>
      )}
      <PostForm />
      <div className='posts'>
        <PostsById></PostsById>
      </div>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  post: state.post
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  deleteAccount
})(Dashboard);
