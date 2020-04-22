import React from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'umi';
import styles from './index.less';

class PageHeader extends React.Component {

  render() {
    const routes = [
      { path: '/dashboard', breadcrumbName: '工作台' },
    ];
    return (
      <div className={styles.root}>
        <Breadcrumb>
          {routes.map((item, index) => {
            const { path, breadcrumbName } = item;
            if (path) {
              return (
                <Breadcrumb.Item key={index}>
                  <Link to={path}>{breadcrumbName}</Link>
                </Breadcrumb.Item>
              );
            } else {
              return (
                <Breadcrumb.Item key={index}>
                  <span>{breadcrumbName}</span>
                </Breadcrumb.Item>
              );
            }
          })}
        </Breadcrumb>
      </div>
    );
  }
}

export default PageHeader;
