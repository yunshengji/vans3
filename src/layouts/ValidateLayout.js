import React from 'react';
import { connect } from 'dva';
import styles from './ValidateLayout.less';

class ValidateLayout extends React.Component {

  componentDidMount() {
  }

  render() {
    return (
      <div className={styles.root}>
        <video autoPlay="autoplay" muted preload="auto" className={styles.video}>
          <source src="https://wanmingcrm.oss-cn-shanghai.aliyuncs.com/static/staffs.mp4" type="video/mp4"/>
        </video>
        <div className={styles.content}>
          <div className={styles.imageWrapper}>
            <img src="/system-welcome.png" alt=""/>
            <div className={styles.background}></div>
          </div>
          <div className={styles.loginWrapper}>
            <img src="/system-name-blue.png" alt="万铭星系统"/>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(({ loading }) => ({}))(ValidateLayout);
