import React from 'react';
import { withRouter } from 'umi';
import { connect } from 'dva';
import { Spin, Col, InputNumber, Form, DatePicker, Input, Row, Select, Button } from 'antd';
import moment from 'moment';
import { limitDecimals } from '@/utils/transfer';
import { TABLE_FOR_MAKING_PROJECT_CATEGORIES } from '../../../../config/constant';

class EditTableOrigin extends React.Component {
  componentDidMount() {
    this.props.dispatch({ type: 'editApprovalProject/eGetUsers', payload: {} });
    this.props.dispatch({ type: 'editApprovalProject/eGetContracts', payload: {} });
    const { path, params } = this.props.match;
    const isEditing = path === '/approvalProject/edit/:id';
    if (isEditing) {
      const { id } = params;
      this.props.dispatch({ type: 'editApprovalProject/eGetOriginTable', id });
    }
  }

  submit = () => {
    const { path, params } = this.props.match;
    const isEditing = path === '/approvalProject/edit/:id';
    if (isEditing) {
      const { id } = params;
      this.props.form.validateFields((err, values) => {
        if (!err) {
          if (values['sign_date']) {
            values['sign_date'] = moment(values['sign_date']).valueOf() / 1000;
          }
          this.props.dispatch({ type: 'editApprovalProject/eUpdateOriginTable', id, payload: { ...values } });
        }
      });
    } else {
      this.props.form.validateFields((err, values) => {
        if (!err) {
          if (values['sign_date']) {
            values['sign_date'] = moment(values['sign_date']).valueOf() / 1000;
          }
          this.props.dispatch({ type: 'editApprovalProject/eCreateOriginTable', payload: { ...values } });
        }
      });
    }
  };
  submitConfirm = () => {
    const { confirm_list } = this.props.form.getFieldsValue();
    const { params: { id } } = this.props.match;
    this.props.dispatch({ type: 'editApprovalProject/eUpdateOriginConfirms', id, payload: { confirm_list } });
  };

  render() {
    const { form: { getFieldDecorator }, submittingCreatedOrigin, submittingEditedOrigin, loadingOrigin, loadingUsers, usersList, managersList, editOrigin, match: { path } } = this.props;
    const isEditing = path === '/approvalProject/edit/:id';
    return (
      <Spin spinning={Boolean(submittingCreatedOrigin) || Boolean(submittingEditedOrigin) || Boolean(loadingOrigin)}>
        <Form layout="horizontal">
          <h3>基础信息</h3>
          <Row gutter={[100]}>
            <Col xl={16} md={24} sm={24}>
              <Row gutter={[80]}>
                <Col xl={16} md={12} sm={24}>
                  <Form.Item label="项目名称">
                    {getFieldDecorator('name', {
                      initialValue: editOrigin['name'],
                      rules: [{ required: true, message: '请输入项目名称' }],
                    })(
                      <Input.TextArea placeholder="请输入" autoSize={{ minRows: 1, maxRows: 4 }}/>,
                    )}
                  </Form.Item>
                </Col>
                <Col xl={8} md={12} sm={24}>
                  <Form.Item label="序号" placeholder="请输入">
                    {getFieldDecorator('num', { initialValue: editOrigin['num'] })(
                      <InputNumber min={1} formatter={limitDecimals} parser={limitDecimals} style={{ width: '100%' }}/>,
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[80]}>
                <Col xl={8} md={12} sm={24}>
                  <Form.Item label="签约时间">
                    {getFieldDecorator('sign_date', { initialValue: editOrigin['sign_date'] && moment(editOrigin['sign_date'] * 1000) })(
                      <DatePicker style={{ width: '100%' }}/>,
                    )}
                  </Form.Item>
                </Col>
                <Col xl={8} md={12} sm={24}>
                  <Form.Item label="实施机构">
                    {getFieldDecorator('act_org', { initialValue: editOrigin['act_org'] })(
                      <Input placeholder="请输入"/>,
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <h3>项目概况</h3>
              <Row gutter={[80]}>
                <Col xl={8} md={12} sm={24}>
                  <Form.Item label="项目类别">
                    {getFieldDecorator('category', {
                      initialValue: editOrigin['category'],
                      rules: [{ required: true, message: '请选择' }],
                    })(
                      <Select placeholder="请选择" disabled={isEditing ? true : false}>
                        {TABLE_FOR_MAKING_PROJECT_CATEGORIES.map((item, index) => {
                          return (
                            <Select.Option key={index} value={item}>{item}</Select.Option>
                          );
                        })}
                      </Select>,
                    )}
                  </Form.Item>
                </Col>
                <Col xl={8} md={12} sm={24}>
                  <Form.Item label="项目金额（万元）">
                    {getFieldDecorator('cash', { initialValue: editOrigin['cash'] })(
                      <InputNumber min={0} style={{ width: '100%' }}/>,
                    )}
                  </Form.Item>
                </Col>
                <Col xl={8} md={12} sm={24}>
                  <Spin spinning={Boolean(loadingUsers)}>
                    <Form.Item label="项目组成员">
                      {getFieldDecorator('members', { initialValue: editOrigin['members'] })(
                        <Select mode="multiple" style={{ width: '100%' }} placeholder="请选择">
                          {usersList.map(item => {
                            return (
                              <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                            );
                          })}
                        </Select>,
                      )}
                    </Form.Item>
                  </Spin>
                </Col>
              </Row>
              <Row gutter={[80]}>
                <Col xl={24} sm={24}>
                  <Form.Item label="金额明细">
                    {getFieldDecorator('cash_detail', { initialValue: editOrigin['cash_detail'] })(
                      <Input.TextArea placeholder="请输入" autoSize={{ minRows: 4 }}/>,
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[80]}>
                <Col xl={24} sm={24}>
                  <Form.Item label="投标资料">
                    {getFieldDecorator('bid_info', { initialValue: editOrigin['bid_info'] })(
                      <Input.TextArea placeholder="请输入" autoSize={{ minRows: 4 }}/>,
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[80]}>
                <Col xl={24} sm={24}>
                  <Form.Item label="收款情况">
                    {getFieldDecorator('receipt_status', { initialValue: editOrigin['receipt_status'] })(
                      <Input.TextArea placeholder="请输入" autoSize={{ minRows: 4 }}/>,
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[80]}>
                <Col xl={24} sm={24}>
                  <Form.Item label="销售费用">
                    {getFieldDecorator('sales_fee', { initialValue: editOrigin['sales_fee'] })(
                      <Input.TextArea placeholder="请输入" autoSize={{ minRows: 4 }}/>,
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[80]}>
                <Col xl={24} sm={24}>
                  <Form.Item label="实施费用">
                    {getFieldDecorator('act_fee', { initialValue: editOrigin['act_fee'] })(
                      <Input.TextArea placeholder="请输入" autoSize={{ minRows: 4 }}/>,
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[80]}>
                <Col xl={24} sm={24}>
                  <Form.Item label="备注">
                    {getFieldDecorator('memo', { initialValue: editOrigin['memo'] })(
                      <Input.TextArea placeholder="请输入" autoSize={{ minRows: 4 }}/>,
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Button type="primary" onClick={this.submit}>提交</Button>
              </Row>
            </Col>
            <Col xl={8} md={24} sm={24}>
              <Spin spinning={Boolean(loadingUsers)}>
                <Form.Item label="需要确认的股东">
                  {getFieldDecorator('confirm_list', {
                    initialValue: editOrigin['confirm_list'],
                  })(
                    <Select mode="multiple" style={{ width: '100%' }} placeholder="请选择">
                      {managersList.map(item => {
                        return (
                          <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                        );
                      })}
                    </Select>,
                  )}
                </Form.Item>
              </Spin>
              <Row>
                <Button type="primary" onClick={this.submitConfirm} disabled={isEditing ? false : true}>提交</Button>
              </Row>
            </Col>
          </Row>
        </Form>
      </Spin>
    );
  }
}

const WrappedForm = Form.create({ name: 'EditTableOrigin' })(EditTableOrigin);

export default withRouter(connect(({ loading, common, editApprovalProject }) => ({
  submittingCreatedOrigin: loading.effects['editApprovalProject/eCreateOriginTable'],
  submittingEditedOrigin: loading.effects['editApprovalProject/eUpdateOriginTable'],
  loadingOrigin: loading.effects['editApprovalProject/eGetOriginTable'],
  loadingUsers: loading.effects['editApprovalProject/eGetUsers'],
  routes: editApprovalProject.routes,
  usersList: editApprovalProject.usersList,
  managersList: editApprovalProject.managersList,
  editOrigin: editApprovalProject.editOrigin,
}))(WrappedForm));
