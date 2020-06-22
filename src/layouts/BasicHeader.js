import React from 'react';
import { Link, router } from 'umi';
import { connect } from 'dva';
import { Avatar, Dropdown, Menu, Icon, Spin, Layout } from 'antd';
import Cookies from 'js-cookie';
import { getFileURL } from '@/utils/transfer';
import styles from './BasicHeader.less';

class BasicHeader extends React.Component {
  controlDrawerMenuVisible = (drawerMenuVisible) => {
    this.props.dispatch({ type: 'common/rUpdateState', payload: { drawerMenuVisible } });
  };
  chooseDepartment = (department) => {
    this.props.dispatch({ type: 'common/rUpdateState', payload: { chooseDepartment: department } });
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
    const { mine: { department }, chooseDepartment, drawerMenuVisible, avatar } = this.props;
    const computedDepartment = chooseDepartment ? chooseDepartment : department['name'];
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
          <span className={styles.welcome}>欢迎登录万铭星系统</span>
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
          <div className={styles.departments}>
            <span className={computedDepartment === '总裁部' ? styles.highlight : ''}
                  onClick={() => this.chooseDepartment('总裁部')}>
              总裁部
            </span>
            <span className={computedDepartment === '运营部' ? styles.highlight : ''}
                  onClick={() => this.chooseDepartment('运营部')}>
              运营部
            </span>
            <span className={computedDepartment === '营销部' ? styles.highlight : ''}
                  onClick={() => this.chooseDepartment('营销部')}>
              营销部
            </span>
            <span className={computedDepartment === '招投标部' ? styles.highlight : ''}
                  onClick={() => this.chooseDepartment('招投标部')}>
              招投标部
            </span>
            <span className={computedDepartment === '产品技术部' ? styles.highlight : ''}
                  onClick={() => this.chooseDepartment('产品技术部')}>
              产品技术部
            </span>
          </div>
          <div>
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
        </div>
      </Layout.Header>
    );
  }
}

export default connect(({ common }) => ({
  mine: common.mine,
  chooseDepartment: common.chooseDepartment,
  drawerMenuVisible: common.drawerMenuVisible,
  avatar: common.mine.avatar,
}))(BasicHeader);
