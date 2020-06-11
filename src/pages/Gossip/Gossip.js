import React from 'react';
import { Link } from 'umi';
import { connect } from 'dva';
import { Breadcrumb } from 'antd';
import WriteGossip from '@/pages/Gossip/components/WriteGossip';
import GossipWritings from '@/pages/Gossip/components/GossipWritings';

class Gossip extends React.Component {
  render() {
    const { routes } = this.props;
    return (
      <React.Fragment>
        <div className="headerWrapper">
          <Breadcrumb>
            {routes.map((item, index) => {
              const { path, breadcrumbName } = item;
              if (path) {
                return (
                  <Breadcrumb.Item key={index}>
                    <Link to={path}>{breadcrumbName}</Link>
                  </Breadcrumb.Item>
                );
              } else {
                return (
                  <Breadcrumb.Item key={index}>
                    <span>{breadcrumbName}</span>
                  </Breadcrumb.Item>
                );
              }
            })}
          </Breadcrumb>
        </div>
        <div className="contentWrapper">
          <WriteGossip/>
          <GossipWritings/>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(({ loading, common, gossipList }) => ({
  routes: gossipList.routes,
}))(Gossip);
