import React from 'react';
import { Breadcrumb, Button } from 'antd';
import { Link } from 'umi';
import styles from './PageHeader.less';

class PageHeader extends React.Component {

  render() {
    const routes = [
      { breadcrumbName: '项目库' },
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
        <Button type="primary" size="small">
          <Link to="">
            新建项目
          </Link>
        </Button>
      </div>
    );
  }
}

export default PageHeader;
