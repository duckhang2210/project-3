import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProfileTop = ({
  profile: {
    workouttypes,
    location,
    bio,
    social,
    user: { name, avatar }
  }
}) => {
  return (
    <div className='profile-top bg-light'>
      <img className='round-img my-1' src={avatar} alt='' />
      <Link to='/chat/'>
        <i className='far fa-envelope fa-2x'></i>
      </Link>
      <div className='my-1'>
        <h1>{name}</h1>
        <q>{bio}</q>
      </div>

      <i class='fas fa-heartbeat'></i>
      <p>{workouttypes.toString().replace(/,/g, ', ')}</p>
      <i className='fas fa-map-marker-alt fa-1x' />
      <p>{location && <span>{location}</span>}</p>

      <div className='icons my-1'>
        {social && social.twitter && (
          <a href={social.twitter} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-twitter fa-2x' />
          </a>
        )}
        {social && social.facebook && (
          <a href={social.facebook} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-facebook fa-2x' />
          </a>
        )}
        {social && social.youtube && (
          <a href={social.youtube} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-youtube fa-2x' />
          </a>
        )}
        {social && social.instagram && (
          <a href={social.instagram} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-instagram fa-2x' />
          </a>
        )}
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileTop;
