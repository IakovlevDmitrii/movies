import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'antd';

const Tabs = ({ onTabChange, selectedTab }) => {
  const menuItems = [
    { tab: 'search', label: 'Search' },
    { tab: 'rated', label: 'Rated' },
  ];

  const onTabsClick = (event) => {
    const newTab = event.key;

    if (selectedTab !== newTab) {
      onTabChange(newTab);
    }
  };

  const menuStyle = {
    position: 'sticky',
    top: 0,
    backgroundColor: '#ffffff',
    zIndex: 1100,
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: 20,
    borderBottom: 0,
    fontSize: '1rem',
  };

  const menuItemStyle = {
    margin: 0,
    padding: '0 12px',
  };

  const items = menuItems.map((item) => {
    const { tab, label } = item;

    return (
      <Menu.Item key={tab} style={menuItemStyle}>
        {label}
      </Menu.Item>
    );
  });

  return (
    <Menu onClick={onTabsClick} selectedKeys={[selectedTab]} mode="horizontal" style={menuStyle}>
      {items}
    </Menu>
  );
};

Tabs.propTypes = {
  onTabChange: PropTypes.func.isRequired,
  selectedTab: PropTypes.string.isRequired,
};

export default Tabs;
