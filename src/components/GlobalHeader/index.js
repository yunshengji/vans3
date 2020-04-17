import React from 'react';
import { Link, router } from 'umi';
import { connect } from 'dva';
import { Avatar, Dropdown, Menu, Icon, Spin, Button, Layout } from 'antd';
import Cookies from 'js-cookie';
import styles from './index.less';

const { Header } = Layout;

class GlobalHeader extends React.Component {
  state = {
    loading: false,
  };
  controlDrawerMenuVisible = (drawerMenuVisible) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/rUpdateState',
      payload: { drawerMenuVisible },
    });
  };
  logout = () => {
    Cookies.remove('token');
    this.setState(() => ({ loading: true }));
    setTimeout(() => {
      router.push('/login');
    }, 1200);
  };

  render() {
    const { drawerMenuVisible, avatar } = this.props;
    const menu = (
      <Menu>
        <Menu.Item>
          <Link to="/me/setting">
            <Icon type="setting"/>
            <span className={styles.item}>个人设置</span>
          </Link>
        </Menu.Item>
        <Menu.Divider/>
        <Menu.Item>
          <div onClick={this.logout}>
            <Icon type="logout"/>
            <span className={styles.item}>退出登录</span>
          </div>
        </Menu.Item>
      </Menu>
    );
    return (
      <Header className={styles.header}>
        <div className={styles.wrapper}>
          <Spin size="large" tip="正在退出登录 ..." spinning={true} className={styles.loading}
                style={{ display: this.state.loading ? 'flex' : 'none' }}/>
          <div className={styles.leftWrapper}>
            <img src="/system-icon.svg" alt="万铭"/>
            <span className={styles.controlDrawerMenu}>
              {drawerMenuVisible ?
                <Icon type="menu-fold" style={{ color: '#FFF' }}
                      onClick={this.controlDrawerMenuVisible.bind(this, false)}/>
                :
                <Icon type="menu-unfold" style={{ color: '#FFF' }}
                      onClick={this.controlDrawerMenuVisible.bind(this, true)}/>
              }
            </span>
          </div>
          <span className={styles.rightWrapperBigScreen} onClick={this.logout}>
              退出登录
          </span>
          <div className={styles.rightWrapperSmallScreen}>
            {
              (avatar) ?
                <Dropdown overlay={menu}>
                  <div className={styles.dropdown}>
                    <Avatar src={avatar}/>
                  </div>
                </Dropdown>
                :
                <Spin/>
            }
          </div>
        </div>
      </Header>
    );
  }
}

export default connect(({ global }) => ({
  drawerMenuVisible: global.drawerMenuVisible,
  avatar: global.avatar,
}))(GlobalHeader);
