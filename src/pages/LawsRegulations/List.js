import React from 'react';
import { Link } from 'umi';
import { connect } from 'dva';
import { Button, Table, Pagination, Breadcrumb, Tag } from 'antd';

const { Column } = Table;

class LawsRegulationsList extends React.Component {

  render() {
    const { fetchingUsers, routes, level, total, current, pageSize, usersList } = this.props;
    return (
      <React.Fragment>
        xx
      </React.Fragment>
    );
  }
}

export default connect(({ loading, basicLayout, lawsRegulationsList }) => ({
}))(LawsRegulationsList);
