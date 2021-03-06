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
    console.log(editService)
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
              <Form.Item label="??????????????????????????????">
                {getFieldDecorator('number', { initialValue: editService['number'] })(
                  <InputNumber min={1} formatter={limitDecimals} parser={limitDecimals} style={{ width: '100%' }}/>,
                )}
              </Form.Item>
            </Col>
            <Col xl={6} md={12} sm={24}>
              <Form.Item label="????????????">
                {getFieldDecorator('team', { initialValue: editService['team'] })(
                  <Select placeholder="?????????" allowClear={true}>
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
              <Form.Item label="????????????????????????????????????" placeholder="?????????">
                {getFieldDecorator('leader_level', { initialValue: editService['leader_level'] })(
                  <Select placeholder="?????????" allowClear={true}>
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
              <Form.Item label="??????????????????">
                {getFieldDecorator('receipt_status', { initialValue: editService['receipt_status'] })(
                  <Select placeholder="?????????" allowClear={true}>
                    <Select.Option key="true" value={true}>???</Select.Option>
                    <Select.Option key="false" value={false}>???</Select.Option>
                  </Select>,
                )}
              </Form.Item>
            </Col>
            <Col xl={6} md={12} sm={24}>
              <Form.Item label="???????????????">
                {getFieldDecorator('not_paid_reason', { initialValue: editService['not_paid_reason'] })(
                  <Input.TextArea placeholder="?????????" autoSize={{ minRows: 1 }}/>,
                )}
              </Form.Item>
            </Col>
            <Col xl={6} md={12} sm={24}>
              <Form.Item label="????????????????????????">
                {getFieldDecorator('pay_time', { initialValue: editService['pay_time'] && moment(editService['pay_time'] * 1000) })(
                  <DatePicker style={{ width: '100%' }}/>,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[150]}>
            <Col xl={6} md={12} sm={24}>
              <Form.Item label="????????????????????????????????????????????????">
                {getFieldDecorator('requirement', { initialValue: editService['requirement'] })(
                  <Select placeholder="?????????" allowClear={true}>
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
              <Form.Item label="?????????????????????">
                {getFieldDecorator('prepared_leader_level', { initialValue: editService['prepared_leader_level'] })(
                  <Select placeholder="?????????" allowClear={true}>
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
              <Form.Item label="?????????????????????????????????????????????">
                {getFieldDecorator('prepared_marketers', { initialValue: editService['prepared_marketers'] })(
                  <Select mode="tags" placeholder="?????????" allowClear={true}>
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
              <Form.Item label="?????????????????????????????????????????????">
                {getFieldDecorator('prepared_Professionals', { initialValue: editService['prepared_Professionals'] })(
                  <Select mode="tags" placeholder="?????????" allowClear={true}>
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
              <Form.Item label="????????????">
                {getFieldDecorator('location', { initialValue: editService['location'] })(
                  <Input placeholder="???????????????????????????????????????"/>,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[150]}>
            <Col xl={18} md={12} sm={24}>
              <Form.Item label="????????????????????????">
                {getFieldDecorator('act_contract', { initialValue: editService['act_contract'] })(
                  <Select placeholder="?????????" mode="multiple" allowClear={true}>
                    {contracts.map((item, index) => {
                      return (
                        <Select.Option key={item.id} value={item.id}>
                          {item.name}
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
              <Form.Item label="??????????????????">
                {getFieldDecorator('after_plan', { initialValue: editService['after_plan'] })(
                  <Input.TextArea placeholder="?????????" autoSize={{ minRows: 4 }}/>,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[150]}>
            <Col xl={18} md={12} sm={24}>
              <Form.Item label="???????????????????????????">
                {getFieldDecorator('remarks', { initialValue: editService['remarks'] })(
                  <Input.TextArea placeholder="?????????" autoSize={{ minRows: 4 }}/>,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Button type="primary" onClick={this.submit}>??????</Button>
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
