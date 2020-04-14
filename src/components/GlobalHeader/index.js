import React from 'react';
import { Link, router } from 'umi';
import { connect } from 'dva';
import { Avatar, Dropdown, Menu, Icon, Spin } from 'antd';
import Cookies from 'js-cookie';
import styles from './index.less';

class GlobalHeader extends React.Component {
  state = {
    loading: false,
  };
  logout = () => {
    Cookies.remove('token');
    this.setState(() => ({ loading: true }));
    setTimeout(() => {
      router.push('/Login');
    }, 800);
  };

  render() {
    const { nickname, avatar } = this.props;
    const menu = (
      <Menu>
        <Menu.Item>
          <Link to="/Me/Center">
            <Icon type="user"/>
            <span className={styles.item}>个人中心</span>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/Me/Setting">
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
      <div className={styles.root}>
        <Spin size="large" tip="正在处理注销..." spinning={this.state.loading} className={styles.loading}/>
        <Dropdown overlay={menu}>
          <div className={styles.dropdown}>
            <Avatar src={avatar}/>
            <span>{nickname}</span>
          </div>
        </Dropdown>
      </div>
    );
  }
}

export default connect(({ Global }) => ({
  nickname: Global.nickname,
  avatar: Global.avatar,
}))(GlobalHeader);
