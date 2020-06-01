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
              <Form.Item label="项目备案编号">
                {getFieldDecorator('number', { initialValue: editRecord['number'] })(
                  <InputNumber min={1} formatter={limitDecimals} parser={limitDecimals} style={{ width: '100%' }}/>,
                )}
              </Form.Item>
            </Col>
            <Col xl={6} md={12} sm={24}>
              <Form.Item label="团队名称">
                {getFieldDecorator('team', { initialValue: editRecord['team'] })(
                  <Select placeholder="请选择" allowClear={true}>
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
              <Form.Item label="业务主管单位对接领导级别" placeholder="请输入">
                {getFieldDecorator('leader_level', { initialValue: editRecord['leader_level'] })(
                  <Select placeholder="请选择" allowClear={true}>
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
              <Form.Item label="项目备案时间">
                {getFieldDecorator('created', { initialValue: editRecord['created'] && moment(editRecord['created'] * 1000) })(
                  <DatePicker style={{ width: '100%' }}/>,
                )}
              </Form.Item>
            </Col>
            <Col xl={6} md={12} sm={24}>
              <Form.Item label="拟配合专业人员姓名">
                {getFieldDecorator('prepared_Professional', { initialValue: editRecord['prepared_Professional'] })(
                  <Input placeholder="请输入"/>,
                )}
              </Form.Item>
            </Col>
            <Col xl={6} md={12} sm={24}>
              <Form.Item label="预期需求方工作完成时间截止点">
                {getFieldDecorator('expect_time', { initialValue: editRecord['expect_time'] && moment(editRecord['expect_time'] * 1000) })(
                  <DatePicker style={{ width: '100%' }}/>,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[150]}>
            <Col xl={18} md={12} sm={24}>
              <Form.Item label="项目来源">
                {getFieldDecorator('location', { initialValue: editRecord['location'] })(
                  <Input placeholder="请输入省、市、县、部门名称"/>,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[150]}>
            <Col xl={18} md={12} sm={24}>
              <Form.Item label="项目描述">
                {getFieldDecorator('description', { initialValue: editRecord['description'] })(
                  <Input.TextArea placeholder="请输入" autoSize={{ minRows: 4 }}/>,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[150]}>
            <Col xl={18} md={12} sm={24}>
              <Form.Item label="其他需要说明的事项">
                {getFieldDecorator('remarks', { initialValue: editRecord['remarks'] })(
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

const WrappedForm = Form.create({ name: 'EditTableRecord' })(EditTableRecord);

export default connect(({ loading, common, editApprovalProject }) => ({
  submittingCreatedRecord: loading.effects['editApprovalProject/eCreateRecordTable'],
  submittingEditedRecord: loading.effects['editApprovalProject/eUpdateRecordTable'],
  loadingRecord: loading.effects['editApprovalProject/eGetRecordTable'],
  editOrigin: editApprovalProject.editOrigin,
  editRecord: editApprovalProject.editRecord,
}))(WrappedForm);
