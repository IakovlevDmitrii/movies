import React from 'react';
import { GuestSessionIdConsumer } from '../guest-session-id-context';

const withGuestSessionId = (Wrapped) => {
  return (props) => {
    return (
      <GuestSessionIdConsumer>
        {(guestSessionId) => {
          return <Wrapped {...props} guestSessionId={guestSessionId} />;
        }}
      </GuestSessionIdConsumer>
    );
  };
};

export default withGuestSessionId;
