import React from 'react';
import { Link, router } from 'umi';
import { connect } from 'dva';
import { Avatar, Dropdown, Menu, Icon, Spin, Layout, Badge } from 'antd';
import Cookies from 'js-cookie';
import { getFileURL } from '@/utils/transfer';
import styles from './BasicHeader.less';

const { Header } = Layout;

class BasicHeader extends React.Component {
  controlDrawerMenuVisible = (drawerMenuVisible) => {
    this.props.dispatch({
      type: 'common/rUpdateState',
      payload: { drawerMenuVisible },
    });
  };
  logout = () => {
    Cookies.remove('token');
    this.props.dispatch({
      type: 'common/rUpdateState',
      payload: { isLogOuting: true },
    });
    setTimeout(() => {
      this.props.dispatch({
        type: 'common/rUpdateState',
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
        <div className={styles.rightWrapper}>
          <Badge dot>
            <Icon type="bell" theme="filled" style={{ color: '#FFF', fontSize: '20px' }}/>
          </Badge>
          {
            (avatar) ?
              <Dropdown overlay={menu}>
                <div className={styles.dropdown}>
                  <Avatar src={getFileURL(avatar)}/>
                  <Icon type="caret-down" style={{ marginLeft: '.5em', color: '#FFF', fontSize: '12px' }}/>
                </div>
              </Dropdown>
              :
              <Spin/>
          }
        </div>
      </Header>
    );
  }
}

export default connect(({ common }) => ({
  drawerMenuVisible: common.drawerMenuVisible,
  isLogOuting: common.isLogOuting,
  avatar: common.mine.avatar,
}))(BasicHeader);
