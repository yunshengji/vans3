import React from 'react';
import { Link, router } from 'umi';
import { connect } from 'dva';
import { Avatar, Dropdown, Menu, Icon, Spin, Layout, Badge } from 'antd';
import Cookies from 'js-cookie';
import { getFileURL } from '@/utils/transfer';
import styles from './BasicHeader.less';
import MessageGray from '../../public/menu/MessageGray.svg';

class BasicHeader extends React.Component {
  controlDrawerMenuVisible = (drawerMenuVisible) => {
    this.props.dispatch({ type: 'common/rUpdateState', payload: { drawerMenuVisible } });
  };
  logout = () => {
    Cookies.remove('token');
    this.props.dispatch({ type: 'common/rUpdateState', payload: { isLogOuting: true } });
    setTimeout(() => {
      this.props.dispatch({ type: 'common/rUpdateState', payload: { isLogOuting: false } });
      router.push('/login');
    }, 1200);
  };

  render() {
    const { drawerMenuVisible, avatar } = this.props;
    const menu = (
      <Menu>
        <Menu.Item>
          <Link to="/users/setting">
            <Icon type="setting"/>
            <span className={styles.dropdownItem}>个人设置</span>
          </Link>
        </Menu.Item>
        <Menu.Divider/>
        <Menu.Item>
          <div onClick={this.logout}>
            <Icon type="logout"/>
            <span className={styles.dropdownItem}>退出登录</span>
          </div>
        </Menu.Item>
      </Menu>
    );
    return (
      <Layout.Header className={styles.header}>
        <div className={styles.leftWrapper}>
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
            <Icon component={MessageGray} style={{ fontSize: '18px' }}/>
          </Badge>
          {
            (avatar) ?
              <Dropdown overlay={menu}>
                <div className={styles.dropdown}>
                  <Avatar src={getFileURL(avatar)}/>
                  <Icon type="caret-down" className={styles.icon}/>
                </div>
              </Dropdown>
              :
              <Spin/>
          }
        </div>
      </Layout.Header>
    );
  }
}

export default connect(({ common }) => ({
  drawerMenuVisible: common.drawerMenuVisible,
  avatar: common.mine.avatar,
}))(BasicHeader);
