import React from 'react';
import { Spin } from 'antd';

class RouteLoading extends React.Component {
  render() {
    return (
      <div style={{ width: '100%', marginTop: '2em', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Spin size="large"/>
      </div>
    );
  }
}

export default RouteLoading;
