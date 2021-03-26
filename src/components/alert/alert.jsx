import React from 'react';
import { Alert } from 'antd';
import PropTypes from 'prop-types';

const Message = ({ type, message, description }) => {
  const alertStyle = {
    width: '100%',
    textAlign: 'center',
  };

  return <Alert description={description} message={message} type={type} style={alertStyle} />;
};

Message.propTypes = {
  description: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Message;
