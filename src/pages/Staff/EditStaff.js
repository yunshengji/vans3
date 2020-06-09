import React from 'react';
import { Link, withRouter } from 'umi';
import { connect } from 'dva';
import {
  Spin, Col, Form, Input, Row, Icon, Button, InputNumber, Select, DatePicker, Upload, message, List,
  Breadcrumb,
} from 'antd';
import _ from 'lodash';
import moment from 'moment';
import { getFileURL } from '@/utils/transfer';

class EditStaff extends React.Component {

  componentDidMount() {
    this.props.dispatch({ type: 'editStaff/eGetDepartments' });
    const { match: { path, params } } = this.props;
    if (path === '/staff/edit/:id') {
      this.props.dispatch({
        type: 'editStaff/eGetStaff',
        id: params['id'],
      });
    }
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'editStaff/rUpdateState',
      payload: {
        staff: {},
        uploadIDCardFrontFile: null,
        uploadIDCardFrontPreview: null,
        uploadIDCardBackFile: null,
        uploadIDCardBackPreview: null,
        uploadDiplomaFile: null,
        uploadDiplomaPreview: null,
        uploadedContractFiles: [],
      },
    });
  }

  deleteUploadedFile = (item) => {
    const { uploadedContractFiles } = this.props;
    this.props.dispatch({
      type: 'editStaff/rUpdateState',
      payload: {
        uploadedContractFiles: _.filter(uploadedContractFiles, (value) => value.id !== item.id),
      },
    });
  };
  submit = () => {
    const { dispatch, form, match: { path, params } } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        if (path === '/staff/edit') {
          dispatch({ type: 'editStaff/eCreateStaff', payload: { ...values } });
        }
        if (path === '/staff/edit/:id') {
          const { id } = params;
          dispatch({ type: 'editStaff/eUpdateStaff', id, form, payload: { ...values } });
        }
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator, getFieldValue, setFieldsValue }, match: { path }, dispatch, routes,
      loadingDepartments, loadingStaff, submittingCreatedStaff, submittingUpdatedStaff,
      departments, staff, uploadIDCardFrontPreview, uploadIDCardBackPreview, uploadDiplomaPreview, uploadedContractFiles,
    } = this.props;

    const generateUploadConfig = (fileName, filePreviewName) => {
      return {
        showUploadList: false,
        multiple: false,
        beforeUpload: file => {
          const reader = new FileReader();
          const isImage = file.type === 'image/gif' || file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/svg';
          if (!isImage) {
            message.warn('图片只能是 PNG JPG JPEG SVG GIF 格式!');
            return false;
          }
          reader.readAsDataURL(file);
          reader.onload = e => {
            dispatch({
              type: 'editStaff/rUpdateState',
              payload: {
                [fileName]: file,
                [filePreviewName]: e.target.result,
              },
            });
          };
          return false;
        },
      };
    };
    const uploadIDCardFront = generateUploadConfig('uploadIDCardFrontFile', 'uploadIDCardFrontPreview');
    const uploadIDCardBack = generateUploadConfig('uploadIDCardBackFile', 'uploadIDCardBackPreview');
    const uploadDiploma = generateUploadConfig('uploadDiplomaFile', 'uploadDiplomaPreview');
    const uploadContracts = {
      showUploadList: true,
      multiple: true,
      beforeUpload: () => false,
      onRemove: file => {
        const contract = getFieldValue('contract');
        contract.splice(contract.indexOf(file), 1);
        setFieldsValue({ contract });
      },
    };

    return (
      <React.Fragment>
        <div className='headerWrapper'>
          <Breadcrumb>
            {routes.map((item, index) => {
              const { path, breadcrumbName } = item;
              if (path) {
                return (
                  <Breadcrumb.Item key={index}>
                    <Link to={path}>{breadcrumbName}</Link>
                  </Breadcrumb.Item>
                );
              } else {
                return (
                  <Breadcrumb.Item key={index}>
                    <span>{breadcrumbName}</span>
                  </Breadcrumb.Item>
                );
              }
            })}
          </Breadcrumb>
        </div>
        <div className="contentWrapper">
          <Spin spinning={Boolean(loadingStaff)}>
            <Form layout="horizontal">
              <h3>基本信息</h3>
              <Row gutter={[150]}>
                <Col xl={6} md={12} sm={24}>
                  <Form.Item label="姓名">
                    {getFieldDecorator('name', {
                      initialValue: staff.name,
                      rules: [{ required: true, message: '请填写姓名' }],
                    })(
                      <Input placeholder="请输入"/>,
                    )}
                  </Form.Item>
                </Col>
                <Col xl={6} md={12} sm={24}>
                  <Spin spinning={Boolean(loadingDepartments)}>
                    <Form.Item label="部门">
                      {getFieldDecorator('department', { initialValue: staff.department })(
                        <Select placeholder="请选择" allowClear={true}>
                          {departments.map(item => {
                            return (
                              <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                            );
                          })}
                        </Select>,
                      )}
                    </Form.Item>
                  </Spin>
                </Col>
                <Col xl={6} md={12} sm={24}>
                  <Form.Item label="自招/挂靠">
                    {getFieldDecorator('recruit', { initialValue: staff['recruit'] })(
                      <Select placeholder="请选择" allowClear={true}>
                        <Select.Option key="自招" value="自招">自招</Select.Option>
                        <Select.Option key="挂靠" value="挂靠">挂靠</Select.Option>
                      </Select>,
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[150]}>
                <Col xl={6} md={12} sm={24}>
                  <Form.Item label="职位">
                    {getFieldDecorator('position', { initialValue: staff.position })(
                      <Input placeholder="请输入"/>,
                    )}
                  </Form.Item>
                </Col>
                <Col xl={6} md={12} sm={24}>
                  <Form.Item label="工作状态">
                    {getFieldDecorator('status', { initialValue: staff.status })(
                      <Select placeholder="请选择" allowClear={true}>
                        <Select.Option key="在职" value="在职">在职</Select.Option>
                        <Select.Option key="已离职" value="已离职">已离职</Select.Option>
                      </Select>,
                    )}
                  </Form.Item>
                </Col>
                <Col xl={6} md={12} sm={24}>
                  <Form.Item label="联系方式">
                    {getFieldDecorator('phone', { initialValue: staff.phone })(
                      <Input placeholder="请输入"/>,
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[150]}>
                <Col xl={6} md={12} sm={24}>
                  <Form.Item label="身份证号">
                    {getFieldDecorator('number', { initialValue: staff.number })(
                      <Input placeholder="请输入"/>,
                    )}
                  </Form.Item>
                </Col>
                <Col xl={6} md={12} sm={24}>
                  <Form.Item label="现住地址">
                    {getFieldDecorator('address', { initialValue: staff.address })(
                      <Input placeholder="请输入"/>,
                    )}
                  </Form.Item>
                </Col>
                <Col xl={6} md={12} sm={24}>
                  <Form.Item label="入职时间">
                    {getFieldDecorator('entry_time', { initialValue: staff['entry_time'] && moment(staff['entry_time'] * 1000) })(
                      <DatePicker style={{ width: '100%' }}/>,
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <h3>薪酬福利</h3>
              <Row gutter={[150]}>
                <Col xl={6} md={12} sm={24}>
                  <Form.Item label="工资（元）">
                    {getFieldDecorator('salary', { initialValue: staff['salary'] })(
                      <InputNumber min={0} style={{ width: '100%' }}/>,
                    )}
                  </Form.Item>
                </Col>
                <Col xl={6} md={12} sm={24}>
                  <Form.Item label="社保（元）">
                    {getFieldDecorator('social_security', { initialValue: staff['social_security'] })(
                      <InputNumber min={0} style={{ width: '100%' }}/>,
                    )}
                  </Form.Item>
                </Col>
                <Col xl={6} md={12} sm={24}>
                  <Form.Item label="公积金（元）">
                    {getFieldDecorator('reserved_funds', { initialValue: staff['reserved_funds'] })(
                      <InputNumber min={0} style={{ width: '100%' }}/>,
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <h3>证书资料</h3>
              <Row gutter={[150]}>
                <Col xl={6} md={12} sm={24}>
                  <Form.Item label="身份证正面">
                    <Upload.Dragger {...uploadIDCardFront}>
                      {
                        uploadIDCardFrontPreview &&
                        <img src={uploadIDCardFrontPreview} style={{ width: '100%' }}/>
                      }
                      {
                        !uploadIDCardFrontPreview && staff['credentials_front'] &&
                        <img src={getFileURL(staff['credentials_front']['id'])} style={{ width: '100%' }}/>
                      }
                      {
                        !uploadIDCardFrontPreview && !staff['credentials_front'] &&
                        <div style={{ padding: '3em 0' }}>
                          <p className="ant-upload-drag-icon">
                            <img src="/staff/身份证-正.svg" style={{ width: '30%' }}/>
                          </p>
                          <p>点击或拖动图片上传</p>
                        </div>
                      }
                    </Upload.Dragger>
                  </Form.Item>
                </Col>
                <Col xl={6} md={12} sm={24}>
                  <Form.Item label="身份证背面">
                    <Upload.Dragger {...uploadIDCardBack}>
                      {
                        uploadIDCardBackPreview &&
                        <img src={uploadIDCardBackPreview} style={{ width: '100%' }}/>
                      }
                      {
                        !uploadIDCardBackPreview && staff['credentials_back'] &&
                        <img src={getFileURL(staff['credentials_back']['id'])} style={{ width: '100%' }}/>
                      }
                      {
                        !uploadIDCardBackPreview && !staff['credentials_back'] &&
                        <div style={{ padding: '3em 0' }}>
                          <p className="ant-upload-drag-icon">
                            <img src="/staff/身份证-反.svg" style={{ width: '30%' }}/>
                          </p>
                          <p>点击或拖动图片上传</p>
                        </div>
                      }
                    </Upload.Dragger>
                  </Form.Item>
                </Col>
                <Col xl={6} md={12} sm={24}>
                  <Form.Item label="毕业证书">
                    <Upload.Dragger {...uploadDiploma}>
                      {
                        uploadDiplomaPreview &&
                        <img src={uploadDiplomaPreview} style={{ width: '100%' }}/>
                      }
                      {
                        !uploadDiplomaPreview && staff['diploma'] &&
                        <img src={getFileURL(staff['diploma']['id'])} style={{ width: '100%' }}/>
                      }
                      {
                        !uploadDiplomaPreview && !staff['diploma'] &&
                        <div style={{ padding: '3em 0' }}>
                          <p className="ant-upload-drag-icon">
                            <img src="/staff/证书.svg" style={{ width: '30%' }}/>
                          </p>
                          <p>点击或拖动图片上传</p>
                        </div>
                      }
                    </Upload.Dragger>
                  </Form.Item>
                </Col>
              </Row>
              <h3>劳动合同</h3>
              <Row gutter={[150]}>
                <Col xl={12} md={12} sm={24}>
                  <Form.Item>
                    {getFieldDecorator('contract', {
                      valuePropName: 'fileList',
                      getValueFromEvent: ({ file, fileList }) => fileList,
                    })(
                      <Upload {...uploadContracts}>
                        <Button block>
                          选择文件 <Icon type="cloud-upload"/>
                        </Button>
                      </Upload>,
                    )}
                  </Form.Item>
                </Col>
              </Row>
              {
                path === '/staff/edit/:id'
                &&
                <React.Fragment>
                  <h4>已上传的劳动合同</h4>
                  <Row gutter={[150]}>
                    <Col xl={12} md={12} sm={24}>
                      <List itemLayout="horizontal" dataSource={uploadedContractFiles}
                            renderItem={(item, index) => (
                              <List.Item
                                key={item.id}
                                actions={[
                                  <Button type="link" icon="delete" className="redButton"
                                          onClick={() => this.deleteUploadedFile(item)}>
                                    删除
                                  </Button>]}
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
                <Button type="primary" onClick={this.submit} loading={submittingCreatedStaff || submittingUpdatedStaff}>
                  提交
                </Button>
              </Row>
            </Form>
          </Spin>
        </div>
      </React.Fragment>
    );
  }
}

const WrappedForm = Form.create({ name: 'EditStaff' })(EditStaff);

export default withRouter(connect(({ loading, common, editStaff }) => ({
  loadingDepartments: loading.effects['editStaff/eGetDepartments'],
  submittingCreatedStaff: loading.effects['editStaff/eCreateStaff'],
  submittingUpdatedStaff: loading.effects['editStaff/eUpdateStaff'],
  loadingStaff: loading.effects['editStaff/eGetStaff'],
  routes: editStaff.routes,
  departments: editStaff.departments,
  staff: editStaff.staff,
  uploadIDCardFrontPreview: editStaff.uploadIDCardFrontPreview,
  uploadIDCardBackPreview: editStaff.uploadIDCardBackPreview,
  uploadDiplomaPreview: editStaff.uploadDiplomaPreview,
  uploadedContractFiles: editStaff.uploadedContractFiles,
}))(WrappedForm));
