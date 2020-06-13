import React from 'react';
import { Drawer } from 'antd';
import { connect } from 'dva';
import BasicMenu from '@/layouts/BasicMenu';

class BasicSideDrawer extends React.Component {
  onClose = () => {
    this.props.dispatch({ type: 'common/rUpdateState', payload: { drawerMenuVisible: false } });
  };

  render() {
    const { drawerMenuVisible } = this.props;
    return (
      <Drawer placement="left" closable={false} width="12rem" visible={drawerMenuVisible} onClose={this.onClose}
              className="basicSideDrawer">
        <div className="basicSideDrawerWrapper">
          <a target="_blank" href="http://www.cdwmzx.cn/">
            <img src="/system-name.svg" alt="万铭"/>
          </a>
          <BasicMenu/>
        </div>
      </Drawer>
    );
  }
}

export default connect(({ common }) => ({
  drawerMenuVisible: common.drawerMenuVisible,
}))(BasicSideDrawer);
