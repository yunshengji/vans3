import React from 'react';
import { Link, router } from 'umi';
import { connect } from 'dva';
import { Avatar, Dropdown, Menu, Icon, Spin, Layout } from 'antd';
import Cookies from 'js-cookie';
import styles from './BasicHeader.less';

const { Header } = Layout;

class BasicHeader extends React.Component {
  controlDrawerMenuVisible = (drawerMenuVisible) => {
    this.props.dispatch({
      type: 'basicLayout/rUpdateState',
      payload: { drawerMenuVisible },
    });
  };
  logout = () => {
    Cookies.remove('token');
    this.props.dispatch({
      type: 'basicLayout/rUpdateState',
      payload: { isLogOuting: true },
    });
    setTimeout(() => {
      this.props.dispatch({
        type: 'basicLayout/rUpdateState',
        payload: { isLogOuting: false },
      });
      router.push('/login');
    }, 1200);
  };

  render() {
    const { drawerMenuVisible, avatar, isLogOuting } = this.props;
    const menu = (
      <Menu>
        <Menu.Item>
          <Link to="/users/setting">
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
                style={{ display: isLogOuting ? 'flex' : 'none' }}/>
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

export default connect(({ basicLayout }) => ({
  drawerMenuVisible: basicLayout.drawerMenuVisible,
  isLogOuting: basicLayout.isLogOuting,
  avatar: basicLayout.mine.avatar,
}))(BasicHeader);
