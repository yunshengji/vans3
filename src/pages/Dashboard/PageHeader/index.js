import React from 'react';
import { Typography, Breadcrumb } from 'antd';
import { Link } from 'umi';
import styles from './index.less';

const { Paragraph, Title } = Typography;

class CustomPageHeader extends React.Component {

  render() {
    const routes = [
      { path: '/', breadcrumbName: '一级导航' },
      { path: '/second', breadcrumbName: '🎧导航' },
      { breadcrumbName: '三级导航' },
    ];
    return (
      <div className={styles.root}>
        <Breadcrumb className={styles.breadcrumb}>
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
        <Title level={4}>主标题</Title>
        <Paragraph>
          描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述
        </Paragraph>
        <Paragraph>
          描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述
          描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述
        </Paragraph>
      </div>
    );
  }
}

export default CustomPageHeader;
