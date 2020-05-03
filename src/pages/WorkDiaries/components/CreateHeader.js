import React from 'react';
import { Link } from 'umi';
import { Breadcrumb } from 'antd';

class CreateHeader extends React.Component {

  render() {
    const routes = [
      { breadcrumbName: '工作日志', path: '/workDiaries' },
      { breadcrumbName: '新建日志' },
    ];
    return (
      <div className="headerWrapper">
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

export default CreateHeader;
