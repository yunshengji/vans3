import React from 'react';
import { connect } from 'dva';
import { Spin, Col, Form, Input, Row, Icon, Button, InputNumber, Select, Upload, List } from 'antd';
import moment from 'moment';
import { getFileURL } from '@/utils/transfer';

let companyOuterId = 0;

class EditEasyProcess extends React.Component {

  componentDidMount() {
    const { editOrigin } = this.props;
    if(editOrigin['process'] !=='流程未定'){
      this.props.dispatch({
        type: 'editApprovalProject/eGetEasyProcess',
        id: editOrigin['id'],
      });
    }
  }

  addCompanyOuterFormItem = () => {
    const keys = this.props.form.getFieldValue('keys');
    const nextKeys = keys.concat(companyOuterId++);
    this.props.form.setFieldsValue({
      keys: nextKeys,
    });
  };
  removeCompanyOuterFormItem = k => {
    const keys = this.props.form.getFieldValue('keys');
    if (keys.length === 0) {
      return;
    }

    this.props.form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };
  deleteUploadedFile = (item) => {
    const { uploadedEasyFile } = this.props;
    let payload = [];
    uploadedEasyFile.forEach(value => {
      if (value.id !== item.id) {
        payload.push(value);
      }
    });
    this.props.dispatch({ type: 'editApprovalProject/rUpdateUploadedEasyFile', payload });
  };
  submit = () => {
    const { dispatch, form, editOrigin, editEasyProcess, uploadedEasyFile } = this.props;
    const { id: originId, process } = editOrigin;
    const { id: processId } = editEasyProcess;
    if (process === '流程未定') {
      form.validateFields((err, values) => {
        if (!err) {
          const { keys, company_worker_list, fileList } = values;
          const payload = { origin: originId };
          const company_outer = [];
          if (keys.length > 0) {
            const { company_name, price } = values;
            keys.forEach(item => {
              company_outer.push({
                company_name: company_name[item],
                price: price[item],
              });
            });
            payload.company_outer = company_outer;
          }
          if (company_worker_list) {
            payload.company_worker_list = company_worker_list;
          }
          if (fileList) {
            payload.fileList = fileList;
          }
          dispatch({
            type: 'editApprovalProject/eCreateEasyProcess',
            payload,
          });
        }
      });
    } else {
      form.validateFields((err, values) => {
        if (!err) {
          const { keys, company_worker_list, fileList } = values;
          const payload = {};
          const company_outer = [];
          if (keys.length > 0) {
            const { company_name, price } = values;
            keys.forEach(item => {
              company_outer.push({
                company_name: company_name[item],
                price: price[item],
              });
            });
            payload.company_outer = company_outer;
          }
          if (company_worker_list) {
            payload.company_worker_list = company_worker_list;
          }
          if (fileList) {
            payload.fileList = fileList;
          }
          if (uploadedEasyFile.length > 0) {
            payload.uploadedEasyFile = uploadedEasyFile;
          }
          dispatch({
            type: 'editApprovalProject/eUpdateEasyProcess',
            id: processId,
            payload,
          });
        }
      });
    }
  };

  render() {
    const { form: { getFieldDecorator, getFieldValue, setFieldsValue }, submittingCreatedProcess, submittingUpdatedProcess, loadingProcess, usersList, editOrigin, editEasyProcess, uploadedEasyFile } = this.props;

    const uploadConfig = {
      showUploadList: true,
      multiple: true,
      beforeUpload: () => false,
      onRemove: file => {
        const fileList = getFieldValue('fileList');
        fileList.splice(fileList.indexOf(file), 1);
        setFieldsValue({ fileList });
      },
    };

    let initialValue = [];
    if (Object.keys(editEasyProcess).length > 0) {
      for (let i = 0; i < editEasyProcess.company_outer.length; i++) {
        initialValue.push(i);
        companyOuterId++;
      }
    }
    getFieldDecorator('keys', { initialValue });

    const keys = getFieldValue('keys');
    const companyOuterFormItems = keys.map((key) => (
      <Row gutter={[150]} type="flex" align="middle" key={`company_outer${key}`}>
        <Col xl={6} md={10} sm={24}>
          <Form.Item label="外包公司名称" key={`company_outer${key}`}>
            {getFieldDecorator(`company_name[${key}]`, {
              initialValue: editEasyProcess.company_outer[key] && editEasyProcess.company_outer[key].company_name,
              rules: [{ required: true, message: '请填写' }],
            })(
              <Input placeholder="请输入"/>,
            )}
          </Form.Item>
        </Col>
        <Col xl={6} md={10} sm={24}>
          <Form.Item label="价格（万元）">
            {getFieldDecorator(`price[${key}]`, {
              initialValue: editEasyProcess.company_outer[key] && editEasyProcess.company_outer[key].price,
              rules: [{ required: true, message: '请填写' }],
            })(
              <InputNumber min={0} style={{ width: '100%' }}/>,
            )}
          </Form.Item>
        </Col>
        <Col xl={6} md={4} sm={24}>
          {
            keys.length > 0 ?
              <Icon type="minus-circle-o" style={{ marginTop: '14px', fontSize: '1.5rem' }}
                    onClick={() => this.removeCompanyOuterFormItem(key)}/>
              :
              null
          }
        </Col>
      </Row>
    ));
    return (
      <Spin
        spinning={Boolean(submittingCreatedProcess) || Boolean(loadingProcess) || Boolean(submittingUpdatedProcess)}>
        <Form layout="horizontal">
          <h3>基本信息</h3>
          <Row gutter={[150]}>
            <Col xl={6} md={12} sm={24}>
              <Form.Item label="项目名称">
                <Input value={editOrigin.name} disabled/>
              </Form.Item>
            </Col>
            <Col xl={6} md={12} sm={24}>
              <Form.Item label="项目类型">
                <Input value={editOrigin.category} disabled/>
              </Form.Item>
            </Col>
            <Col xl={6} md={12} sm={24}>
              <Form.Item label="签约时间" placeholder="请输入">
                <Input value={moment(editOrigin['sign_date'] * 1000).format('YYYY-MM-DD')} disabled/>
              </Form.Item>
            </Col>
          </Row>
          <h3>分配标书（公司员工）</h3>
          <Row gutter={[150]}>
            <Col xl={12} md={12} sm={24}>
              <Form.Item>
                {getFieldDecorator('company_worker_list', { initialValue: editEasyProcess.company_worker_list })(
                  <Select mode="multiple" placeholder="请选择" allowClear={true}>
                    {usersList.map(item => {
                      return (
                        <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                      );
                    })}
                  </Select>,
                )}
              </Form.Item>
            </Col>
          </Row>
          <h3>分配标书（外包公司）</h3>
          {companyOuterFormItems}
          <Row gutter={[150]}>
            <Col xl={12} md={12} sm={24}>
              <Button type="dashed" block onClick={this.addCompanyOuterFormItem}>
                <Icon type="plus"/> 增加
              </Button>
            </Col>
          </Row>
          <h3>文件资料</h3>
          <Row gutter={[150]}>
            <Col xl={12} md={12} sm={24}>
              <Form.Item>
                {getFieldDecorator('fileList', {
                  valuePropName: 'fileList',
                  getValueFromEvent: ({ file, fileList }) => fileList,
                })(
                  <Upload {...uploadConfig}>
                    <Button block>
                      选择文件 <Icon type="cloud-upload"/>
                    </Button>
                  </Upload>,
                )}
              </Form.Item>
            </Col>
          </Row>
          {
            editOrigin.process !== '流程未定'
            &&
            <React.Fragment>
              <h3>已上传的资料</h3>
              <Row gutter={[150]}>
                <Col xl={12} md={12} sm={24}>
                  <List itemLayout="horizontal" dataSource={uploadedEasyFile}
                        renderItem={(item, index) => (
                          <List.Item
                            key={item.id}
                            actions={[<Button type="link" icon="delete" className="redButton" onClick={() => {
                              this.deleteUploadedFile(item);
                            }}>删除</Button>]}
                          >
                            <a href={getFileURL(item.id)} target="_blank">{item['file_name_local']}</a>
                          </List.Item>
                        )}
                  />
                </Col>
              </Row>
            </React.Fragment>
          }
          <Row>
            <Button type="primary" onClick={this.submit}>提交</Button>
          </Row>
        </Form>
      </Spin>
    );
  }
}

const WrappedForm = Form.create({ name: 'EditEasyProcess' })(EditEasyProcess);

export default connect(({ loading, common, editApprovalProject }) => ({
  submittingCreatedProcess: loading.effects['editApprovalProject/eCreateEasyProcess'],
  submittingUpdatedProcess: loading.effects['editApprovalProject/eUpdateEasyProcess'],
  loadingProcess: loading.effects['editApprovalProject/eGetEasyProcess'],
  usersList: editApprovalProject.usersList,
  editOrigin: editApprovalProject.editOrigin,
  editEasyProcess: editApprovalProject.editEasyProcess,
  uploadedEasyFile: editApprovalProject.uploadedEasyFile,
}))(WrappedForm);
