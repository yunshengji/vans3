import React from 'react';
import { connect } from 'dva';
import { Spin, Col, Form, DatePicker, Input, Row, Select, Button, InputNumber } from 'antd';
import moment from 'moment';
import { limitDecimals } from '@/utils/transfer';
import {
  TABLE_FOR_MAKING_PROJECT_RECORD_TEAMS,
  TABLE_FOR_MAKING_PROJECT_RECORD_LEVEL,
} from '../../../../config/constant';

class EditTableRecord extends React.Component {
  componentDidMount() {
    const { editOrigin } = this.props;
    this.props.dispatch({
      type: 'editApprovalProject/eGetRecordTable',
      payload: { origin_id: editOrigin['id'] },
    });
  }

  submit = () => {
    const { editOrigin, editRecord } = this.props;
    if (Object.keys(editRecord).length === 0) {
      this.props.form.validateFields((err, values) => {
        if (!err) {
          if (values['created']) {
            values['created'] = moment(values['created']).valueOf() / 1000;
          }
          if (values['expect_time']) {
            values['expect_time'] = moment(values['expect_time']).valueOf() / 1000;
          }
          values['origin_id'] = editOrigin['id'];
          this.props.dispatch({
            type: 'editApprovalProject/eCreateRecordTable',
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
          if (values['expect_time']) {
            values['expect_time'] = moment(values['expect_time']).valueOf() / 1000;
          }
          this.props.dispatch({
            type: 'editApprovalProject/eUpdateRecordTable',
            id: editRecord['id'],
            payload: { ...values },
          });
        }
      });
    }
  };

  render() {
    const { form: { getFieldDecorator }, submittingCreatedRecord, submittingEditedRecord, loadingRecord, editRecord } = this.props;
    return (
      <Spin spinning={Boolean(submittingCreatedRecord) || Boolean(submittingEditedRecord) || Boolean(loadingRecord)}>
        <Form layout="horizontal">
          <Row gutter={[150]}>
            <Col xl={6} md={12} sm={24}>
              <Form.Item label="??????????????????">
                {getFieldDecorator('number', { initialValue: editRecord['number'] })(
                  <InputNumber min={1} formatter={limitDecimals} parser={limitDecimals} style={{ width: '100%' }}/>,
                )}
              </Form.Item>
            </Col>
            <Col xl={6} md={12} sm={24}>
              <Form.Item label="????????????">
                {getFieldDecorator('team', { initialValue: editRecord['team'] })(
                  <Select placeholder="?????????" allowClear={true}>
                    {TABLE_FOR_MAKING_PROJECT_RECORD_TEAMS.map((item, index) => {
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
                {getFieldDecorator('leader_level', { initialValue: editRecord['leader_level'] })(
                  <Select placeholder="?????????" allowClear={true}>
                    {TABLE_FOR_MAKING_PROJECT_RECORD_LEVEL.map((item, index) => {
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
                {getFieldDecorator('created', { initialValue: editRecord['created'] && moment(editRecord['created'] * 1000) })(
                  <DatePicker style={{ width: '100%' }}/>,
                )}
              </Form.Item>
            </Col>
            <Col xl={6} md={12} sm={24}>
              <Form.Item label="???????????????????????????">
                {getFieldDecorator('prepared_Professional', { initialValue: editRecord['prepared_Professional'] })(
                  <Input placeholder="?????????"/>,
                )}
              </Form.Item>
            </Col>
            <Col xl={6} md={12} sm={24}>
              <Form.Item label="??????????????????????????????????????????">
                {getFieldDecorator('expect_time', { initialValue: editRecord['expect_time'] && moment(editRecord['expect_time'] * 1000) })(
                  <DatePicker style={{ width: '100%' }}/>,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[150]}>
            <Col xl={18} md={12} sm={24}>
              <Form.Item label="????????????">
                {getFieldDecorator('location', { initialValue: editRecord['location'] })(
                  <Input placeholder="???????????????????????????????????????"/>,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[150]}>
            <Col xl={18} md={12} sm={24}>
              <Form.Item label="????????????">
                {getFieldDecorator('description', { initialValue: editRecord['description'] })(
                  <Input.TextArea placeholder="?????????" autoSize={{ minRows: 4 }}/>,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[150]}>
            <Col xl={18} md={12} sm={24}>
              <Form.Item label="???????????????????????????">
                {getFieldDecorator('remarks', { initialValue: editRecord['remarks'] })(
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

const WrappedForm = Form.create({ name: 'EditTableRecord' })(EditTableRecord);

export default connect(({ loading, common, editApprovalProject }) => ({
  submittingCreatedRecord: loading.effects['editApprovalProject/eCreateRecordTable'],
  submittingEditedRecord: loading.effects['editApprovalProject/eUpdateRecordTable'],
  loadingRecord: loading.effects['editApprovalProject/eGetRecordTable'],
  editOrigin: editApprovalProject.editOrigin,
  editRecord: editApprovalProject.editRecord,
}))(WrappedForm);
