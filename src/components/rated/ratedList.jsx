import React from 'react';
import { Layout } from 'antd';

import { GuestSessionIdConsumer } from '../../context/guest-session-id-context';
import ViewRatedList from './view-rated-list';

const { Content } = Layout;

const RatedList = () => {
  return (
    <GuestSessionIdConsumer>
      {(guestSessionId) => {
        return (
          <Content className="content">
            <ViewRatedList guestSessionId={guestSessionId} />;
          </Content>
        );
      }}
    </GuestSessionIdConsumer>
  );
};

export default RatedList;
