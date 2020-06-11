import React from 'react';
import { connect } from 'dva';
import { Row, Col, Button, Empty } from 'antd';
import EditEasyProcess from '@/pages/ApprovalProjects/components/EditEasyProcess';
import EditPurchaseProcess from '@/pages/ApprovalProjects/components/EditPurchaseProcess';

class ChooseProcess extends React.Component {
  componentDidMount() {
    const { editOrigin: { id, process } } = this.props;
    this.props.dispatch({ type: 'editApprovalProject/rUpdateState', payload: { process } });
    if (process === '简易流程') {
      this.props.dispatch({ type: 'editApprovalProject/eGetEasyProcess', id });
    }
    if (process === '采购流程') {
      this.props.dispatch({ type: 'editApprovalProject/eGetPurchaseProcess', id });
    }
  }

  chooseProcess = (process) => {
    this.props.dispatch({ type: 'editApprovalProject/rUpdateState', payload: { process } });
  };

  render() {
    const { process } = this.props;
    return (
      <React.Fragment>
        {
          process === '流程未定' &&
          <React.Fragment>
            <Row type="flex" justify="center">
              <Empty
                imageStyle={{ height: 300 }}
                description="暂无项目流程，你可以"/>
            </Row>
            <Row gutter={[80]} type="flex" justify="center" style={{ marginTop: '4rem' }}>
              <Col>
                <Button type="primary" ghost onClick={() => {
                  this.chooseProcess('采购流程');
                }}>新建采购流程</Button>
              </Col>
              <Col>
                <Button type="primary" ghost onClick={() => {
                  this.chooseProcess('简易流程');
                }}>新建简易流程</Button>
              </Col>
            </Row>
          </React.Fragment>
        }
        {
          process === '简易流程' &&
          <EditEasyProcess/>
        }
        {
          process === '采购流程' &&
          <EditPurchaseProcess/>
        }
      </React.Fragment>
    );
  }
}

export default connect(({ loading, common, editApprovalProject }) => ({
  editOrigin: editApprovalProject.editOrigin,
  process: editApprovalProject.process,
}))(ChooseProcess);
