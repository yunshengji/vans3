import React from 'react';
import { Link } from 'umi';
import { Result, Button } from 'antd';

export default class Page404 extends React.Component {
  state = {
    from: null,
  };

  componentDidMount() {
    const query = new URLSearchParams(window.location.search);
    const from = query.get('from');
    this.setState(() => ({ from }));
  }

  render() {
    return (
      <Result
        status="403"
        title="Forbidden"
        subTitle="权限不足，拒绝授权访问!"
        extra={
          <Button type="primary">
            <Link to={this.state.from ? this.state.from : '/dashboard'}>
              返回
            </Link>
          </Button>
        }
      />
    );
  }

}
