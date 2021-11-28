import React from 'react';
import { connect } from 'dva';
import styles from './ValidateLayout.less';

class ValidateLayout extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isMobile: true };
  }

  componentDidMount() {
    const isMobile = function() {
      let info = navigator.userAgent;
      let agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPod', 'iPad'];
      for (let i = 0; i < agents.length; i++) {
        if (info.indexOf(agents[i]) >= 0) return true;
      }
      return false;
    }();
    this.setState({ isMobile });
  }

  render() {
    return (
      <div className={styles.root}>
        {
          !this.state.isMobile &&
          <video autoPlay="autoplay" muted preload="auto" className={styles.video}>
            <source src="https://wanmingcrm.oss-cn-shanghai.aliyuncs.com/static/staffs.mp4" type="video/mp4"/>
          </video>
        }

        <div className={styles.content}>
          <div className={styles.imageWrapper}>
            <img src="/system-welcome.png" alt=""/>
            <div className={styles.beian}>
            <a className={styles.abeian} href="https://beian.miit.gov.cn/">备案号：蜀ICP备18004889号-2</a>
            </div>
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
