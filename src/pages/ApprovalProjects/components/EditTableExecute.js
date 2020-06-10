import React from 'react';
import { connect } from 'dva';
import { Spin, Col, Form, DatePicker, Input, Row, Select, Button, InputNumber } from 'antd';
import { limitDecimals } from '@/utils/transfer';
import {
  TABLE_FOR_MAKING_PROJECT_EXECUTE_TEAMS,
  TABLE_FOR_MAKING_PROJECT_EXECUTE_LEVEL,
} from '../../../../config/constant';
import moment from 'moment';

class EditTableExecute extends React.Component {
  componentDidMount() {
    const { editOrigin } = this.props;
    this.props.dispatch({
      type: 'editApprovalProject/eGetExecuteTable',
      payload: { origin_id: editOrigin['id'] },
    });
  }

  submit = () => {
    const { editOrigin, editExecute } = this.props;
    if (Object.keys(editExecute).length === 0) {
      this.props.form.validateFields((err, values) => {
        if (!err) {
          if (values['created']) {
            values['created'] = moment(values['created']).valueOf() / 1000;
          }
          values['origin_id'] = editOrigin['id'];
          this.props.dispatch({
            type: 'editApprovalProject/eCreateExecuteTable',
            payload: { ...values },
          });
        }
      });
    } else {
      this.props.form.validateFields((err, values) => {
        if (!err) {
          if (values['created']) {
            values['created'] = moment(values['created']).valueOf() / 1000;
          }
          this.props.dispatch({
            type: 'editApprovalProject/eUpdateExecuteTable',
            id: editExecute['id'],
            payload: { ...values },
          });
        }
      });
    }
  };

  render() {
    const { form: { getFieldDecorator }, submittingCreatedExecute, submittingEditedExecute, loadingExecute, editExecute, contracts } = this.props;
    return (
      <Spin spinning={Boolean(submittingCreatedExecute) || Boolean(submittingEditedExecute) || Boolean(loadingExecute)}>
        <Form layout="horizontal">
          <Row gutter={[150]}>
            <Col xl={6} md={12} sm={24}>
              <Form.Item label="项目营销季度报编号">
                {getFieldDecorator('number', { initialValue: editExecute['number'] })(
                  <InputNumber min={1} formatter={limitDecimals} parser={limitDecimals} style={{ width: '100%' }}/>,
                )}
              </Form.Item>
            </Col>
            <Col xl={6} md={12} sm={24}>
              <Form.Item label="团队名称">
                {getFieldDecorator('team', { initialValue: editExecute['team'] })(
                  <Select placeholder="请选择" allowClear={true}>
                    {TABLE_FOR_MAKING_PROJECT_EXECUTE_TEAMS.map((item, index) => {
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
                {getFieldDecorator('leader_level', { initialValue: editExecute['leader_level'] })(
                  <Select placeholder="请选择" allowClear={true}>
                    {TABLE_FOR_MAKING_PROJECT_EXECUTE_LEVEL.map((item, index) => {
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
            <Col xl={18} md={12} sm={24}>
              <Form.Item label="项目来源">
                {getFieldDecorator('location', { initialValue: editExecute['location'] })(
                  <Input placeholder="请输入省、市、县、部门名称"/>,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[150]}>
            <Col xl={18} md={12} sm={24}>
              <Form.Item label="项目描述">
                {getFieldDecorator('description', { initialValue: editExecute['description'] })(
                  <Input.TextArea placeholder="请输入" autoSize={{ minRows: 4 }}/>,
                )}
              </Form.Item>
            </Col>
          </Row>
          <h4>项目营销情况</h4>
          <Row gutter={[150]}>
            <Col xl={6} md={12} sm={24}>
              <Form.Item label="与项目单位签署合同">
                {getFieldDecorator('contract_status', { initialValue: editExecute['contract_status'] })(
                  <Select placeholder="请选择" allowClear={true}>
                    <Select.Option key="true" value={true}>是</Select.Option>
                    <Select.Option key="false" value={false}>否</Select.Option>
                  </Select>,
                )}
              </Form.Item>
            </Col>
            <Col xl={6} md={12} sm={24}>
              <Form.Item label="已经安排专业人员完成工作任务">
                {getFieldDecorator('staff', { initialValue: editExecute['staff'] })(
                  <Select placeholder="请选择" allowClear={true}>
                    <Select.Option key="true" value={true}>是</Select.Option>
                    <Select.Option key="false" value={false}>否</Select.Option>
                  </Select>,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[150]}>
            <Col xl={18} md={12} sm={24}>
              <Form.Item label="已经签署合同名称">
                {getFieldDecorator('sign_contract', { initialValue: editExecute['sign_contract'] })(
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
              <Form.Item label="未签署合同原因">
                {getFieldDecorator('not_sign_reason', { initialValue: editExecute['not_sign_reason'] })(
                  <Input.TextArea placeholder="请输入" autoSize={{ minRows: 4 }}/>,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[150]}>
            <Col xl={18} md={12} sm={24}>
              <Form.Item label="后续跟踪计划">
                {getFieldDecorator('after_plan', { initialValue: editExecute['after_plan'] })(
                  <Input.TextArea placeholder="请输入" autoSize={{ minRows: 4 }}/>,
                )}
              </Form.Item>
            </Col>
          </Row>
          <h4>招待费用</h4>
          <Row gutter={[150]}>
            <Col xl={6} md={12} sm={24}>
              <Form.Item label="营销部门统计数据（元）">
                {getFieldDecorator('entertain_cash_sell', { initialValue: editExecute['entertain_cash_sell'] })(
                  <InputNumber min={0} style={{ width: '100%' }}/>,
                )}
              </Form.Item>
            </Col>
            <Col xl={6} md={12} sm={24}>
              <Form.Item label="财务部统计数据（元）">
                {getFieldDecorator('entertain_cash_accountant', { initialValue: editExecute['entertain_cash_accountant'] })(
                  <InputNumber min={0} style={{ width: '100%' }}/>,
                )}
              </Form.Item>
            </Col>
          </Row>
          <h4>差旅费用</h4>
          <Row gutter={[150]}>
            <Col xl={6} md={12} sm={24}>
              <Form.Item label="营销部门统计数据（元）">
                {getFieldDecorator('travel_cash_sell', { initialValue: editExecute['travel_cash_sell'] })(
                  <InputNumber min={0} style={{ width: '100%' }}/>,
                )}
              </Form.Item>
            </Col>
            <Col xl={6} md={12} sm={24}>
              <Form.Item label="财务部统计数据（元）">
                {getFieldDecorator('travel_cash_accountant', { initialValue: editExecute['travel_cash_accountant'] })(
                  <InputNumber min={0} style={{ width: '100%' }}/>,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[150]}>
            <Col xl={18} md={12} sm={24}>
              <Form.Item label="其他需要说明的事项">
                {getFieldDecorator('remarks', { initialValue: editExecute['remarks'] })(
                  <Input.TextArea placeholder="请输入" autoSize={{ minRows: 4 }}/>,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[150]}>
            <Col xl={6} md={12} sm={24}>
              <Form.Item label="营销实施情况表季度报填报时间">
                {getFieldDecorator('created', { initialValue: editExecute['created'] && moment(editExecute['created'] * 1000) })(
                  <DatePicker style={{ width: '100%' }}/>,
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

const WrappedForm = Form.create({ name: 'EditTableExecute' })(EditTableExecute);

export default connect(({ loading, common, editApprovalProject }) => ({
  submittingCreatedExecute: loading.effects['editApprovalProject/eCreateExecuteTable'],
  submittingEditedExecute: loading.effects['editApprovalProject/eUpdateExecuteTable'],
  loadingExecute: loading.effects['editApprovalProject/eGetExecuteTable'],
  usersList: editApprovalProject.usersList,
  contracts: editApprovalProject.contracts,
  editOrigin: editApprovalProject.editOrigin,
  editExecute: editApprovalProject.editExecute,
}))(WrappedForm);
