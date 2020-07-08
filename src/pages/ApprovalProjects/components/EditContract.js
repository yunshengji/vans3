import React from 'react';
import { connect } from 'dva';
import { Form, Select, Upload, Icon, Button, InputNumber, Input, List, Row, Col, Spin, Empty } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import { getFileURL, limitDecimals, selectYearList } from '../../../utils/transfer';
import { TABLE_FOR_MAKING_PROJECT_CATEGORIES } from '../../../../config/constant';

class EditContract extends React.Component {
  componentDidMount() {
    const { editOrigin: { id: origin } } = this.props;
    this.props.dispatch({
      type: 'editApprovalProject/eGetOriginContract',
      payload: { origin, page_size: 10000 },
    });
  }

  showContract = () => {
    this.props.dispatch({
      type: 'editApprovalProject/rUpdateState',
      payload: { contractVisible: true },
    });
  };
  deleteUploadedFile = (deletedFile) => {
    const { editContract: { attachment } } = this.props;
    this.props.dispatch({
      type: 'editApprovalProject/rUpdateContractFiles',
      payload: _.filter(attachment, value => value['id'] !== deletedFile['id']),
    });
  };
  deleteUploadedTemplateFile = (deletedFile) => {
    const { editContract: { template } } = this.props;
    this.props.dispatch({
      type: 'editApprovalProject/rUpdateTemplateFiles',
      payload: _.filter(template, value => value['id'] !== deletedFile['id']),
    });
  };
  submitContract = () => {
    const { dispatch, form, editOrigin: { id: origin }, editContract } = this.props;
    const isEditing = _.keys(editContract).length > 0;
    form.validateFields((err, values) => {
      if (!err) {
        isEditing ?
          dispatch({ type: 'editApprovalProject/eUpdateContract', form, payload: { ...values, origin } })
          :
          dispatch({ type: 'editApprovalProject/eUploadContract', form, payload: { ...values, origin } });
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator, getFieldValue, setFieldsValue },
      uploadingContract, updatingContract, loadingContract,
      editContract, contractVisible,
    } = this.props;
    const isEditing = _.keys(editContract).length > 0;
    const uploadConfig = {
      multiple: true,
      showUploadList: true,
      beforeUpload: () => false,
      onRemove: file => {
        const fileList = getFieldValue('fileList');
        fileList.splice(fileList.indexOf(file), 1);
        setFieldsValue({ fileList });
      },
    };
    const uploadTemplateConfig = {
      multiple: true,
      showUploadList: true,
      beforeUpload: () => false,
      onRemove: file => {
        const templateList = getFieldValue('templateList');
        templateList.splice(templateList.indexOf(file), 1);
        setFieldsValue({ templateList });
      },
    };
    return (
      <Spin spinning={Boolean(uploadingContract) || Boolean(updatingContract) || Boolean(loadingContract)}>
        {
          (isEditing || contractVisible) ?
            <Form layout="horizontal">
              <Row gutter={[80]}>
                {
                  isEditing &&
                  <Col xl={6} md={12} sm={24}>
                    <Form.Item label="合同编号">
                      {getFieldDecorator('number', {
                        initialValue: editContract['number'],
                      })(
                        <InputNumber min={1} formatter={limitDecimals} parser={limitDecimals} style={{ width: '100%' }}
                                     placeholder="请输入"/>,
                      )}
                    </Form.Item>
                  </Col>
                }
                {
                  isEditing &&
                  <Col xl={12} md={12} sm={24}>
                    <Form.Item label="合同名称">
                      {getFieldDecorator('name', {
                        initialValue: editContract['name'],
                      })(
                        <Input.TextArea autoSize={{ minRows: 2 }} placeholder="请输入"/>,
                      )}
                    </Form.Item>
                  </Col>
                }
              </Row>
              <Row gutter={[80]}>
                <Col xl={6} md={12} sm={24}>
                  <Form.Item label="合同金额（元）">
                    {getFieldDecorator('cash', {
                      initialValue: editContract['cash'],
                    })(
                      <InputNumber min={0} style={{ width: '100%' }}/>,
                    )}
                  </Form.Item>
                </Col>
                <Col xl={6} md={12} sm={24}>
                  <Form.Item label="结算情况">
                    {getFieldDecorator('settlement', {
                      initialValue: editContract['settlement'] || '未结算',
                      rules: [{ required: true, message: '请选择' }],
                    })(
                      <Select placeholder="请选择">
                        <Select.Option key="已结算" value="已结算">已结算</Select.Option>
                        <Select.Option key="未结算" value="未结算">未结算</Select.Option>
                      </Select>,
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[80]}>
                {
                  isEditing &&
                  <Col xl={6} md={12} sm={24}>
                    <Form.Item label="档案类型">
                      {getFieldDecorator('category', {
                        rules: [{ required: true, message: '请选择' }],
                        initialValue: editContract['category'],
                      })(
                        <Select placeholder="请选择">
                          {TABLE_FOR_MAKING_PROJECT_CATEGORIES.map((item, index) => {
                            return (
                              <Select.Option key={index} value={item}>{item}</Select.Option>
                            );
                          })}
                        </Select>,
                      )}
                    </Form.Item>
                  </Col>
                }
                {
                  isEditing &&
                  <Col xl={6} md={12} sm={24}>
                    <Form.Item label="合同年份">
                      {getFieldDecorator('time', {
                        initialValue: (editContract['time'] && moment(1000 * editContract['time']).format('YYYY')) || moment().get('year'),
                        rules: [{ required: true, message: '请选择' }],
                      })(
                        <Select>
                          {_.map(selectYearList, item => <Select.Option key={item} value={item}>{item}</Select.Option>)}
                        </Select>,
                      )}
                    </Form.Item>
                  </Col>
                }
              </Row>
              <h3>合同文件</h3>
              <Row gutter={[80]}>
                <Col xl={6} md={12} sm={24}>
                  <Form.Item>
                    {getFieldDecorator('fileList', {
                      valuePropName: 'fileList',
                      getValueFromEvent: ({ file, fileList }) => fileList,
                    })(
                      <Upload {...uploadConfig}>
                        <Button>
                          选择文件 <Icon type="cloud-upload"/>
                        </Button>
                      </Upload>,
                    )}
                  </Form.Item>
                </Col>
              </Row>
              {
                isEditing &&
                <React.Fragment>
                  <h4>已上传的合同文件</h4>
                  <Row gutter={[80]}>
                    <Col xl={12} md={12} sm={24}>
                      {
                        isEditing &&
                        <Form.Item>
                          <List itemLayout="horizontal" className="noPaddingList" size="small"
                                dataSource={editContract['attachment']}
                                renderItem={(item, index) => (
                                  <List.Item
                                    key={item.id}
                                    actions={[<Button type="link" className="redButton" onClick={() => {
                                      this.deleteUploadedFile(item);
                                    }}>删除</Button>]}
                                  >
                                    <a href={getFileURL(item.id)} target="_blank">{item['file_name_local']}</a>
                                  </List.Item>
                                )}
                          />
                        </Form.Item>
                      }
                    </Col>
                  </Row>
                </React.Fragment>
              }
              <h3>模板文件</h3>
              <Row gutter={[80]}>
                <Col xl={6} md={12} sm={24}>
                  <Form.Item label="合同模板">
                    {getFieldDecorator('templateList', {
                      valuePropName: 'fileList',
                      getValueFromEvent: ({ file, fileList }) => fileList,
                    })(
                      <Upload {...uploadTemplateConfig}>
                        <Button>
                          选择文件 <Icon type="cloud-upload"/>
                        </Button>
                      </Upload>,
                    )}
                  </Form.Item>
                </Col>
              </Row>
              {
                isEditing &&
                <React.Fragment>
                  <h4>已上传的模板文件</h4>
                  <Row gutter={[80]}>
                    <Col xl={12} md={12} sm={24}>
                      {
                        isEditing &&
                        <Form.Item>
                          <List itemLayout="horizontal" className="noPaddingList" size="small"
                                dataSource={editContract['template']}
                                renderItem={(item, index) => (
                                  <List.Item
                                    key={item.id}
                                    actions={[<Button type="link" className="redButton" onClick={() => {
                                      this.deleteUploadedTemplateFile(item);
                                    }}>删除</Button>]}
                                  >
                                    <a href={getFileURL(item.id)} target="_blank">{item['file_name_local']}</a>
                                  </List.Item>
                                )}
                          />
                        </Form.Item>
                      }
                    </Col>
                  </Row>
                </React.Fragment>
              }
              <Form.Item>
                <Button type="primary" onClick={this.submitContract}>提交</Button>
              </Form.Item>
            </Form>
            :
            <React.Fragment>
              <Row type="flex" justify="center" style={{ marginTop: '5rem' }}>
                <Empty image="/approval/contract.png" imageStyle={{ height: 200 }} description="暂无项目合同，建议您"/>
              </Row>
              <Row gutter={[80]} type="flex" justify="center" style={{ marginTop: '2rem' }}>
                <Col>
                  <Button type="primary" ghost onClick={this.showContract}>
                    新建项目合同
                  </Button>
                </Col>
              </Row>
            </React.Fragment>
        }
      </Spin>
    );
  }
}

const WrappedForm = Form.create({ name: 'UploadContractArchive' })(EditContract);

export default connect(({ loading, editApprovalProject }) => ({
  uploadingContract: loading.effects['editApprovalProject/eUploadContract'],
  updatingContract: loading.effects['editApprovalProject/eUpdateContract'],
  loadingContract: loading.effects['editApprovalProject/eGetOriginContract'],
  editOrigin: editApprovalProject.editOrigin,
  editContract: editApprovalProject.editContract,
  contractVisible: editApprovalProject.contractVisible,
}))(WrappedForm);

