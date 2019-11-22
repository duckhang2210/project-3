import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    workouttypes,
    location
  }
}) => {
  return (
    <div className='profile bg-light'>
      <img src={avatar} alt='' className='round-img' />
      <div>
        <h2>{name}</h2>

        {workouttypes.length && (
          <p>
            <i class='fas fa-heartbeat'></i>{' '}
            <span>{workouttypes.toString().replace(/,/g, ', ')}</span>
          </p>
        )}

        {location && (
          <p>
            <i class='fas fa-map-marker-alt'></i> <span>{location}</span>
          </p>
        )}
      </div>
      <div>
        <Link to={`/profile/${_id}`} className='btn btn-primary'>
          View <span className='hide-sm'>Profile</span>
        </Link>
      </div>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
