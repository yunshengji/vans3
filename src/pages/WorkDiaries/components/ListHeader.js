import React from 'react';
import { Breadcrumb, Button } from 'antd';
import { Link } from 'umi';

class ListHeader extends React.Component {

  render() {
    const routes = [{ breadcrumbName: '工作日志' }];
    return (
      <div className="headerWrapperWithCreate">
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
        <Link to="/workDiaries/create">
          <Button size="small" type="link">
            新建日志
          </Button>
        </Link>
      </div>
    );
  }
}

export default ListHeader;
