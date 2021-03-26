import React from 'react';
import PropTypes from 'prop-types';

import Rating from '../rating';
import withGuestSessionId from '../../../context/with-guest-session-id';

const Rate = ({ guestSessionId, id, rating }) => {
  return <Rating guestSessionId={guestSessionId} id={id} rating={rating} />;
};

Rate.propTypes = {
  guestSessionId: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
};

export default withGuestSessionId(Rate);
