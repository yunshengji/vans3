import React from 'react';
import { connect } from 'dva';
import { Spin, Col, Form, DatePicker, Input, Row, Select, Button, InputNumber } from 'antd';
import moment from 'moment';
import { limitDecimals } from '@/utils/transfer';
import {
  TABLE_FOR_MAKING_PROJECT_SERVICE_TEAMS,
  TABLE_FOR_MAKING_PROJECT_SERVICE_LEVEL,
  TABLE_FOR_MAKING_PROJECT_SERVICE_DEMANDS,
} from '../../../../config/constant';

class EditTableService extends React.Component {
  componentDidMount() {
    const { editOrigin } = this.props;
    this.props.dispatch({
      type: 'editApprovalProject/eGetServiceTable',
      payload: { origin_id: editOrigin['id'] },
    });
    this.props.dispatch({ type: 'editApprovalProject/eGetUsers' });
  }

  submit = () => {
    const { editOrigin, editService } = this.props;
    if (Object.keys(editService).length === 0) {
      this.props.form.validateFields((err, values) => {
        if (!err) {
          if (values['pay_time']) {
            values['pay_time'] = moment(values['pay_time']).valueOf() / 1000;
          }
          values['origin_id'] = editOrigin['id'];
          this.props.dispatch({
            type: 'editApprovalProject/eCreateServiceTable',
            payload: { ...values },
          });
        }
      });
    } else {
      this.props.form.validateFields((err, values) => {
        if (!err) {
          if (values['pay_time']) {
            values['pay_time'] = moment(values['pay_time']).valueOf() / 1000;
          }
          this.props.dispatch({
            type: 'editApprovalProject/eUpdateServiceTable',
            id: editService['id'],
            payload: { ...values },
          });
        }
      });
    }
  };

  render() {
    const { form: { getFieldDecorator }, submittingCreatedService, submittingEditedService, loadingService, usersList, contracts, editService } = this.props;
    return (
      <Spin spinning={Boolean(submittingCreatedService) || Boolean(submittingEditedService) || Boolean(loadingService)}>
        <Form layout="horizontal">
          <Row gutter={[150]}>
            <Col xl={6} md={12} sm={24}>
              <Form.Item label="项目跟踪服务年报编号">
                {getFieldDecorator('number', { initialValue: editService['number'] })(
                  <InputNumber min={1} formatter={limitDecimals} parser={limitDecimals} style={{ width: '100%' }}/>,
                )}
              </Form.Item>
            </Col>
            <Col xl={6} md={12} sm={24}>
              <Form.Item label="团队名称">
                {getFieldDecorator('team', { initialValue: editService['team'] })(
                  <Select placeholder="请选择" allowClear={true}>
                    {TABLE_FOR_MAKING_PROJECT_SERVICE_TEAMS.map((item, index) => {
                      return (
                        <Select.Option key={index} value={item}>{item}</Select.Option>
                      );
                    })}
                  </Select>,
                )}
              </Form.Item>
            </Col>
            <Col xl={6} md={12} sm={24}>
              <Form.Item label="业务主管单位对接领导级别" placeholder="请输入">
                {getFieldDecorator('leader_level', { initialValue: editService['leader_level'] })(
                  <Select placeholder="请选择" allowClear={true}>
                    {TABLE_FOR_MAKING_PROJECT_SERVICE_LEVEL.map((item, index) => {
                      return (
                        <Select.Option key={index} value={item}>{item}</Select.Option>
                      );
                    })}
                  </Select>,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[150]}>
            <Col xl={6} md={12} sm={24}>
              <Form.Item label="是否完成收款">
                {getFieldDecorator('receipt_status', { initialValue: editService['receipt_status'] })(
                  <Select placeholder="请选择" allowClear={true}>
                    <Select.Option key="true" value={true}>是</Select.Option>
                    <Select.Option key="false" value={false}>否</Select.Option>
                  </Select>,
                )}
              </Form.Item>
            </Col>
            <Col xl={6} md={12} sm={24}>
              <Form.Item label="未收款原因">
                {getFieldDecorator('not_paid_reason', { initialValue: editService['not_paid_reason'] })(
                  <Input.TextArea placeholder="请输入" autoSize={{ minRows: 1 }}/>,
                )}
              </Form.Item>
            </Col>
            <Col xl={6} md={12} sm={24}>
              <Form.Item label="未收款拟收回时间">
                {getFieldDecorator('pay_time', { initialValue: editService['pay_time'] && moment(editService['pay_time'] * 1000) })(
                  <DatePicker style={{ width: '100%' }}/>,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[150]}>
            <Col xl={6} md={12} sm={24}>
              <Form.Item label="与该项目联系可能滋生服务需求描述">
                {getFieldDecorator('requirement', { initialValue: editService['requirement'] })(
                  <Select placeholder="请选择" allowClear={true}>
                    {TABLE_FOR_MAKING_PROJECT_SERVICE_DEMANDS.map((item, index) => {
                      return (
                        <Select.Option key={index} value={item}>{item}</Select.Option>
                      );
                    })}
                  </Select>,
                )}
              </Form.Item>
            </Col>
            <Col xl={6} md={12} sm={24}>
              <Form.Item label="拟对接领导级别">
                {getFieldDecorator('prepared_leader_level', { initialValue: editService['prepared_leader_level'] })(
                  <Select placeholder="请选择" allowClear={true}>
                    {TABLE_FOR_MAKING_PROJECT_SERVICE_LEVEL.map((item, index) => {
                      return (
                        <Select.Option key={index} value={item}>{item}</Select.Option>
                      );
                    })}
                  </Select>,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[150]}>
            <Col xl={6} md={12} sm={24}>
              <Form.Item label="拟安排跟踪服务人员（营销人员）">
                {getFieldDecorator('prepared_marketers', { initialValue: editService['prepared_marketers'] })(
                  <Select mode="tags" placeholder="请选择" allowClear={true}>
                    {usersList.map(item => {
                      return (
                        <Select.Option key={item.id} value={item.name}>{item.name}</Select.Option>
                      );
                    })}
                  </Select>,
                )}
              </Form.Item>
            </Col>
            <Col xl={6} md={12} sm={24}>
              <Form.Item label="拟安排跟踪服务人员（专业人员）">
                {getFieldDecorator('prepared_Professionals', { initialValue: editService['prepared_Professionals'] })(
                  <Select mode="tags" placeholder="请选择" allowClear={true}>
                    {usersList.map(item => {
                      return (
                        <Select.Option key={item.id} value={item.name}>{item.name}</Select.Option>
                      );
                    })}
                  </Select>,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[150]}>
            <Col xl={18} md={12} sm={24}>
              <Form.Item label="项目来源">
                {getFieldDecorator('location', { initialValue: editService['location'] })(
                  <Input placeholder="请输入省、市、县、部门名称"/>,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[150]}>
            <Col xl={18} md={12} sm={24}>
              <Form.Item label="已经实施项目合同">
                {getFieldDecorator('act_contract', { initialValue: editService['act_contract'] })(
                  <Select placeholder="请选择" mode="multiple" allowClear={true}>
                    {contracts.map((item, index) => {
                      return (
                        <Select.Option key={item.id} value={item.id}>
                          {item.attachment['file_name_local']}
                        </Select.Option>
                      );
                    })}
                  </Select>,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[150]}>
            <Col xl={18} md={12} sm={24}>
              <Form.Item label="后续跟踪计划">
                {getFieldDecorator('after_plan', { initialValue: editService['after_plan'] })(
                  <Input.TextArea placeholder="请输入" autoSize={{ minRows: 4 }}/>,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[150]}>
            <Col xl={18} md={12} sm={24}>
              <Form.Item label="其他需要说明的事项">
                {getFieldDecorator('remarks', { initialValue: editService['remarks'] })(
                  <Input.TextArea placeholder="请输入" autoSize={{ minRows: 4 }}/>,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Button type="primary" onClick={this.submit}>提交</Button>
          </Row>
        </Form>
      </Spin>
    );
  }
}

const WrappedForm = Form.create({ name: 'EditTableService' })(EditTableService);

export default connect(({ loading, common, editApprovalProject }) => ({
  submittingCreatedService: loading.effects['editApprovalProject/eCreateServiceTable'],
  submittingEditedService: loading.effects['editApprovalProject/eUpdateServiceTable'],
  loadingService: loading.effects['editApprovalProject/eGetServiceTable'],
  usersList: editApprovalProject.usersList,
  contracts: editApprovalProject.contracts,
  editOrigin: editApprovalProject.editOrigin,
  editService: editApprovalProject.editService,
}))(WrappedForm);
