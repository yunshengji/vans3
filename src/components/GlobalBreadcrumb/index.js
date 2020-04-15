import React from 'react';
import { Link } from 'umi';
import { Breadcrumb } from 'antd';
import styles from './index.less';

class GlobalBreadcrumb extends React.Component {

  render() {
    const { breadcrumbs, title } = this.props;
    return (
      <div className={styles.root}>
        <Breadcrumb>
          {breadcrumbs.map((item, index) => {
            const { path, name } = item;
            if (path) {
              return (
                <Breadcrumb.Item key={index}>
                  <Link to={path}>{name}</Link>
                </Breadcrumb.Item>
              );
            } else {
              return (
                <Breadcrumb.Item key={index}>
                  <span>{name}</span>
                </Breadcrumb.Item>
              );
            }
          })}
        </Breadcrumb>
        <h2>{title}</h2>
        <React.Fragment>
          {this.props.children}
        </React.Fragment>
      </div>
    );
  }
}

export default GlobalBreadcrumb;
