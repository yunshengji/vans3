import React from 'react';
import { connect } from 'dva';
import { Spin, Col, Form, Input, Row, Icon, Button, InputNumber, Select, Upload, List } from 'antd';
import moment from 'moment';
import { getFileURL } from '@/utils/transfer';

let companyAppliedId = 0;
let companyOuterId = 0;
let depositId = 0;

class EditPurchaseProcess extends React.Component {

  componentDidMount() {
    const { editOrigin } = this.props;
    if (editOrigin['process'] !== '流程未定') {
      this.props.dispatch({
        type: 'editApprovalProject/eGetPurchaseProcess',
        id: editOrigin['id'],
      });
    }
  }

  addCompanyAppliedFormItem = () => {
    const companyAppliedKeys = this.props.form.getFieldValue('companyAppliedKeys');
    const nextKeys = companyAppliedKeys.concat(companyAppliedId++);
    this.props.form.setFieldsValue({
      companyAppliedKeys: nextKeys,
    });
  };
  removeCompanyAppliedFormItem = k => {
    const companyAppliedKeys = this.props.form.getFieldValue('companyAppliedKeys');
    if (companyAppliedKeys.length === 0) {
      return;
    }

    this.props.form.setFieldsValue({
      companyAppliedKeys: companyAppliedKeys.filter(key => key !== k),
    });
  };
  addCompanyOuterFormItem = () => {
    const companyOuterKeys = this.props.form.getFieldValue('companyOuterKeys');
    const nextKeys = companyOuterKeys.concat(companyOuterId++);
    this.props.form.setFieldsValue({
      companyOuterKeys: nextKeys,
    });
  };
  removeCompanyOuterFormItem = k => {
    const companyOuterKeys = this.props.form.getFieldValue('companyOuterKeys');
    if (companyOuterKeys.length === 0) {
      return;
    }

    this.props.form.setFieldsValue({
      companyOuterKeys: companyOuterKeys.filter(key => key !== k),
    });
  };
  addDepositFormItem = () => {
    const depositKeys = this.props.form.getFieldValue('depositKeys');
    const nextKeys = depositKeys.concat(depositId++);
    this.props.form.setFieldsValue({
      depositKeys: nextKeys,
    });
  };
  removeDepositFormItem = k => {
    const depositKeys = this.props.form.getFieldValue('depositKeys');
    if (depositKeys.length === 0) {
      return;
    }

    this.props.form.setFieldsValue({
      depositKeys: depositKeys.filter(key => key !== k),
    });
  };
  deleteUploadedFile = (type, item) => {
    const { uploadedPurchaseBaseFiles, uploadedPurchaseFormalFiles, uploadedPurchaseBidWinFiles } = this.props;
    if (type === 'uploadedPurchaseBaseFiles') {
      let payload = [];
      uploadedPurchaseBaseFiles.forEach(value => {
        if (value.id !== item.id) {
          payload.push(value);
        }
      });
      this.props.dispatch({ type: 'editApprovalProject/rUpdateUploadedPurchaseBaseFile', payload });
    }
    if (type === 'uploadedPurchaseFormalFiles') {
      let payload = [];
      uploadedPurchaseFormalFiles.forEach(value => {
        if (value.id !== item.id) {
          payload.push(value);
        }
      });
      this.props.dispatch({ type: 'editApprovalProject/rUpdateUploadedPurchaseFormalFile', payload });
    }
    if (type === 'uploadedPurchaseBidWinFiles') {
      let payload = [];
      uploadedPurchaseBidWinFiles.forEach(value => {
        if (value.id !== item.id) {
          payload.push(value);
        }
      });
      this.props.dispatch({ type: 'editApprovalProject/rUpdateUploadedPurchaseBidWinFile', payload });
    }
  };
  submit = () => {
    const { dispatch, form, editOrigin, editPurchaseProcess, uploadedPurchaseBaseFiles, uploadedPurchaseFormalFiles, uploadedPurchaseBidWinFiles } = this.props;
    const { id: originId, process } = editOrigin;
    const { id: processId } = editPurchaseProcess;
    console.log(this.props.form.getFieldsValue());
    if (process === '流程未定') {
      form.validateFields((err, values) => {
        if (!err) {
          const {
            companyAppliedKeys, company_applied_name, company_applied_leader_name, company_applied_leader_contact,
            companyOuterKeys, company_outer_name, company_outer_price,
            depositKeys, deposit_company_name, deposit_leader_name, deposit_leader_contact, deposit_price,
            base_files, formal_files, bid_win_files,
            company_worker_list, fee,
          } = values;
          const payload = { origin: originId };

          const company_applied = [];
          if (companyAppliedKeys.length > 0) {
            companyAppliedKeys.forEach(item => {
              company_applied.push({
                company_name: company_applied_name[item],
                leader_name: company_applied_leader_name[item],
                leader_contact: company_applied_leader_contact[item],
              });
            });
            payload.company_applied = company_applied;
          }

          const company_outer = [];
          if (companyOuterKeys.length > 0) {
            companyOuterKeys.forEach(item => {
              company_outer.push({
                company_name: company_outer_name[item],
                price: company_outer_price[item],
              });
            });
            payload.company_outer = company_outer;
          }

          const deposit_list = [];
          if (depositKeys.length > 0) {
            depositKeys.forEach(item => {
              deposit_list.push({
                company_name: deposit_company_name[item],
                leader_name: deposit_leader_name[item],
                leader_contact: deposit_leader_contact[item],
                price: deposit_price[item],
              });
            });
            payload.deposit_list = deposit_list;
          }

          if (base_files) {
            payload.base_files = base_files;
          }
          if (formal_files) {
            payload.formal_files = formal_files;
          }
          if (bid_win_files) {
            payload.bid_win_files = bid_win_files;
          }
          if (company_worker_list) {
            payload.company_worker_list = company_worker_list;
          }
          if (fee !== undefined) {
            payload.fee = fee;
          }
          dispatch({
            type: 'editApprovalProject/eCreatePurchaseProcess',
            payload,
          });
        }
      });
    } else {
      form.validateFields((err, values) => {
        if (!err) {
          const {
            companyAppliedKeys, company_applied_name, company_applied_leader_name, company_applied_leader_contact,
            companyOuterKeys, company_outer_name, company_outer_price,
            depositKeys, deposit_company_name, deposit_leader_name, deposit_leader_contact, deposit_price,
            base_files, formal_files, bid_win_files,
            company_worker_list, fee,
          } = values;
          const payload = {};

          const company_applied = [];
          if (companyAppliedKeys.length > 0) {
            companyAppliedKeys.forEach(item => {
              company_applied.push({
                company_name: company_applied_name[item],
                leader_name: company_applied_leader_name[item],
                leader_contact: company_applied_leader_contact[item],
              });
            });
            payload.company_applied = company_applied;
          }

          const company_outer = [];
          if (companyOuterKeys.length > 0) {
            companyOuterKeys.forEach(item => {
              company_outer.push({
                company_name: company_outer_name[item],
                price: company_outer_price[item],
              });
            });
            payload.company_outer = company_outer;
          }

          const deposit_list = [];
          if (depositKeys.length > 0) {
            depositKeys.forEach(item => {
              deposit_list.push({
                company_name: deposit_company_name[item],
                leader_name: deposit_leader_name[item],
                leader_contact: deposit_leader_contact[item],
                price: deposit_price[item],
              });
            });
            payload.deposit_list = deposit_list;
          }

          if (base_files) {
            payload.base_files = base_files;
          }
          if (formal_files) {
            payload.formal_files = formal_files;
          }
          if (bid_win_files) {
            payload.bid_win_files = bid_win_files;
          }
          if (company_worker_list) {
            payload.company_worker_list = company_worker_list;
          }
          if (fee !== undefined) {
            payload.fee = fee;
          }
          if (uploadedPurchaseBaseFiles.length > 0) {
            payload.uploadedPurchaseBaseFiles = uploadedPurchaseBaseFiles;
          }
          if (uploadedPurchaseFormalFiles.length > 0) {
            payload.uploadedPurchaseFormalFiles = uploadedPurchaseFormalFiles;
          }
          if (uploadedPurchaseBidWinFiles.length > 0) {
            payload.uploadedPurchaseBidWinFiles = uploadedPurchaseBidWinFiles;
          }
          dispatch({
            type: 'editApprovalProject/eUpdatePurchaseProcess',
            id: processId,
            payload,
          });
        }
      });
    }
  };

  render() {
    const { form: { getFieldDecorator, getFieldValue, setFieldsValue }, submittingCreatedProcess, submittingUpdatedProcess, loadingProcess, usersList, editOrigin, editPurchaseProcess, uploadedPurchaseBaseFiles, uploadedPurchaseFormalFiles, uploadedPurchaseBidWinFiles } = this.props;

    const baseFilesUploadConfig = {
      showUploadList: true,
      multiple: true,
      beforeUpload: () => false,
      onRemove: file => {
        const base_files = getFieldValue('base_files');
        base_files.splice(base_files.indexOf(file), 1);
        setFieldsValue({ base_files });
      },
    };
    const formalFilesUploadConfig = {
      showUploadList: true,
      multiple: true,
      beforeUpload: () => false,
      onRemove: file => {
        const formal_files = getFieldValue('formal_files');
        formal_files.splice(formal_files.indexOf(file), 1);
        setFieldsValue({ formal_files });
      },
    };
    const bidWinFilesUploadConfig = {
      showUploadList: true,
      multiple: true,
      beforeUpload: () => false,
      onRemove: file => {
        const bid_win_files = getFieldValue('bid_win_files');
        bid_win_files.splice(bid_win_files.indexOf(file), 1);
        setFieldsValue({ bid_win_files });
      },
    };

    let companyAppliedInitial = [];
    if (Object.keys(editPurchaseProcess).length > 0) {
      for (let i = 0; i < editPurchaseProcess['company_applied'].length; i++) {
        companyAppliedInitial.push(i);
        companyAppliedId++;
      }
    }
    getFieldDecorator('companyAppliedKeys', { initialValue: companyAppliedInitial });
    const companyAppliedKeys = getFieldValue('companyAppliedKeys');
    const companyAppliedFormItems = companyAppliedKeys.map((key) => (
      <Row gutter={[150]} type="flex" align="middle" key={`company_applied${key}`}>
        <Col xl={6} md={10} sm={24}>
          <Form.Item label="报名公司">
            {getFieldDecorator(`company_applied_name[${key}]`, {
              initialValue: editPurchaseProcess['company_applied'] && editPurchaseProcess['company_applied'][key] && editPurchaseProcess['company_applied'][key].company_name,
              rules: [{ required: true, message: '请填写' }],
            })(
              <Input placeholder="请输入"/>,
            )}
          </Form.Item>
        </Col>
        <Col xl={6} md={10} sm={24}>
          <Form.Item label="授权人姓名">
            {getFieldDecorator(`company_applied_leader_name[${key}]`, {
              initialValue: editPurchaseProcess['company_applied'] && editPurchaseProcess['company_applied'][key] && editPurchaseProcess['company_applied'][key]['leader_name'],
            })(
              <Input placeholder="请输入"/>,
            )}
          </Form.Item>
        </Col>
        <Col xl={6} md={10} sm={24}>
          <Form.Item label="联系方式">
            {getFieldDecorator(`company_applied_leader_contact[${key}]`, {
              initialValue: editPurchaseProcess['company_applied'] && editPurchaseProcess['company_applied'][key] && editPurchaseProcess['company_applied'][key]['leader_contact'],
            })(
              <Input placeholder="请输入"/>,
            )}
          </Form.Item>
        </Col>
        <Col xl={6} md={4} sm={24}>
          {
            companyAppliedKeys.length > 0 ?
              <Icon type="minus-circle-o" style={{ marginTop: '14px', fontSize: '1.25rem' }}
                    onClick={() => this.removeCompanyAppliedFormItem(key)}/>
              :
              null
          }
        </Col>
      </Row>
    ));

    let companyOuterInitial = [];
    if (Object.keys(editPurchaseProcess).length > 0) {
      for (let i = 0; i < editPurchaseProcess.company_outer.length; i++) {
        companyOuterInitial.push(i);
        companyOuterId++;
      }
    }
    getFieldDecorator('companyOuterKeys', { initialValue: companyOuterInitial });
    const companyOuterKeys = getFieldValue('companyOuterKeys');
    const companyOuterFormItems = companyOuterKeys.map((key) => (
      <Row gutter={[150]} type="flex" align="middle" key={`company_outer${key}`}>
        <Col xl={6} md={10} sm={24}>
          <Form.Item label="公司名称">
            {getFieldDecorator(`company_outer_name[${key}]`, {
              initialValue: editPurchaseProcess.company_outer && editPurchaseProcess.company_outer[key] && editPurchaseProcess.company_outer[key].company_name,
              rules: [{ required: true, message: '请填写' }],
            })(
              <Input placeholder="请输入"/>,
            )}
          </Form.Item>
        </Col>
        <Col xl={6} md={10} sm={24}>
          <Form.Item label="价格（元）">
            {getFieldDecorator(`company_outer_price[${key}]`, {
              initialValue: editPurchaseProcess.company_outer && editPurchaseProcess.company_outer[key] && editPurchaseProcess.company_outer[key].price,
            })(
              <InputNumber min={0} style={{ width: '100%' }}/>,
            )}
          </Form.Item>
        </Col>
        <Col xl={6} md={4} sm={24}>
          {
            companyOuterKeys.length > 0 ?
              <Icon type="minus-circle-o" style={{ marginTop: '14px', fontSize: '1.25rem' }}
                    onClick={() => this.removeCompanyOuterFormItem(key)}/>
              :
              null
          }
        </Col>
      </Row>
    ));

    let depositInitial = [];
    if (Object.keys(editPurchaseProcess).length > 0) {
      for (let i = 0; i < editPurchaseProcess['deposit_list'].length; i++) {
        depositInitial.push(i);
        depositId++;
      }
    }
    getFieldDecorator('depositKeys', { initialValue: depositInitial });
    const depositKeys = getFieldValue('depositKeys');
    const depositFormItems = depositKeys.map((key) => (
      <React.Fragment key={`deposit${key}`}>
        <Row gutter={[150]} type="flex" align="middle">
          <Col xl={6} md={10} sm={24}>
            <Form.Item label="公司名称">
              {getFieldDecorator(`deposit_company_name[${key}]`, {
                initialValue: editPurchaseProcess['deposit_list'] && editPurchaseProcess['deposit_list'][key] && editPurchaseProcess['deposit_list'][key].company_name,
                rules: [{ required: true, message: '请填写' }],
              })(
                <Input placeholder="请输入"/>,
              )}
            </Form.Item>
          </Col>
          <Col xl={6} md={10} sm={24}>
            <Form.Item label="联系人">
              {getFieldDecorator(`deposit_leader_name[${key}]`, {
                initialValue: editPurchaseProcess['deposit_list'] && editPurchaseProcess['deposit_list'][key] && editPurchaseProcess['deposit_list'][key]['leader_name'],
              })(
                <Input placeholder="请输入"/>,
              )}
            </Form.Item>
          </Col>
          <Col xl={6} md={10} sm={24}>
            <Form.Item label="联系方式">
              {getFieldDecorator(`deposit_leader_contact[${key}]`, {
                initialValue: editPurchaseProcess['deposit_list'] && editPurchaseProcess['deposit_list'][key] && editPurchaseProcess['deposit_list'][key]['leader_contact'],
              })(
                <Input placeholder="请输入"/>,
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[150]} type="flex" align="middle">
          <Col xl={6} md={10} sm={24}>
            <Form.Item label="保证金额（元）">
              {getFieldDecorator(`deposit_price[${key}]`, {
                initialValue: editPurchaseProcess['deposit_list'] && editPurchaseProcess['deposit_list'][key] && editPurchaseProcess['deposit_list'][key].price,
              })(
                <InputNumber min={0} style={{ width: '100%' }}/>,
              )}
            </Form.Item>
          </Col>
          <Col xl={6} md={4} sm={24}>
            {
              depositKeys.length > 0 ?
                <Icon type="minus-circle-o" style={{ marginTop: '14px', fontSize: '1.25rem' }}
                      onClick={() => this.removeDepositFormItem(key)}/>
                :
                null
            }
          </Col>
        </Row>
      </React.Fragment>
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

          <h3>报名公司</h3>
          {companyAppliedFormItems}
          <Row gutter={[150]}>
            <Col xl={18} md={18} sm={24}>
              <Button type="dashed" block onClick={this.addCompanyAppliedFormItem}>
                <Icon type="plus"/> 增加
              </Button>
            </Col>
          </Row>

          <h3>分配标书（内部员工）</h3>
          <Row gutter={[150]}>
            <Col xl={12} md={12} sm={24}>
              <Form.Item>
                {getFieldDecorator('company_worker_list', { initialValue: editPurchaseProcess.company_worker_list })(
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

          <h3>分配标书(外包公司)</h3>
          {companyOuterFormItems}
          <Row gutter={[150]}>
            <Col xl={18} md={18} sm={24}>
              <Button type="dashed" block onClick={this.addCompanyOuterFormItem}>
                <Icon type="plus"/> 增加
              </Button>
            </Col>
          </Row>

          <h3>记录保证金</h3>
          {depositFormItems}
          <Row gutter={[150]}>
            <Col xl={18} md={18} sm={24}>
              <Button type="dashed" block onClick={this.addDepositFormItem}>
                <Icon type="plus"/> 增加
              </Button>
            </Col>
          </Row>
          <h3>代理费</h3>
          <Row>
            <Col xl={6} md={10} sm={24}>
              <Form.Item label="缴纳代理费（元）">
                {getFieldDecorator('fee', {
                  initialValue: editPurchaseProcess['fee'],
                  rules: [{ required: true, message: '请填写' }],
                })(
                  <InputNumber min={0} style={{ width: '100%' }}/>,
                )}
              </Form.Item>
            </Col>
          </Row>

          <h3>基础招标文件</h3>
          <Row gutter={[150]}>
            <Col xl={12} md={12} sm={24}>
              <Form.Item>
                {getFieldDecorator('base_files', {
                  valuePropName: 'fileList',
                  getValueFromEvent: ({ file, fileList }) => fileList,
                })(
                  <Upload {...baseFilesUploadConfig}>
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
              <h4>已上传的基础招标文件</h4>
              <Row gutter={[150]}>
                <Col xl={12} md={12} sm={24}>
                  <List itemLayout="horizontal" dataSource={uploadedPurchaseBaseFiles}
                        renderItem={(item, index) => (
                          <List.Item
                            key={item.id}
                            actions={[<Button type="link" icon="delete" className="redButton" onClick={() => {
                              this.deleteUploadedFile('purchaseBaseFiles', item);
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

          <h3>正式招标文件</h3>
          <Row gutter={[150]}>
            <Col xl={12} md={12} sm={24}>
              <Form.Item>
                {getFieldDecorator('formal_files', {
                  valuePropName: 'fileList',
                  getValueFromEvent: ({ file, fileList }) => fileList,
                })(
                  <Upload {...formalFilesUploadConfig}>
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
              <h4>已上传的正式招标文件</h4>
              <Row gutter={[150]}>
                <Col xl={12} md={12} sm={24}>
                  <List itemLayout="horizontal" dataSource={uploadedPurchaseFormalFiles}
                        renderItem={(item, index) => (
                          <List.Item
                            key={item.id}
                            actions={[<Button type="link" icon="delete" className="redButton" onClick={() => {
                              this.deleteUploadedFile('uploadedPurchaseFormalFiles', item);
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

          <h3>中标通知书</h3>
          <Row gutter={[150]}>
            <Col xl={12} md={12} sm={24}>
              <Form.Item>
                {getFieldDecorator('bid_win_files', {
                  valuePropName: 'fileList',
                  getValueFromEvent: ({ file, fileList }) => fileList,
                })(
                  <Upload {...bidWinFilesUploadConfig}>
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
              <h4>已上传的中标通知书</h4>
              <Row gutter={[150]}>
                <Col xl={12} md={12} sm={24}>
                  <List itemLayout="horizontal" dataSource={uploadedPurchaseBidWinFiles}
                        renderItem={(item, index) => (
                          <List.Item
                            key={item.id}
                            actions={[<Button type="link" icon="delete" className="redButton" onClick={() => {
                              this.deleteUploadedFile('uploadedPurchaseBidWinFiles', item);
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

const WrappedForm = Form.create({ name: 'EditPurchaseProcess' })(EditPurchaseProcess);

export default connect(({ loading, common, editApprovalProject }) => ({
  submittingCreatedProcess: loading.effects['editApprovalProject/eCreatePurchaseProcess'],
  submittingUpdatedProcess: loading.effects['editApprovalProject/eUpdateEasyProcess'],
  loadingProcess: loading.effects['editApprovalProject/eGetEasyProcess'],
  usersList: editApprovalProject.usersList,
  editOrigin: editApprovalProject.editOrigin,
  editPurchaseProcess: editApprovalProject.editPurchaseProcess,
  uploadedPurchaseBaseFiles: editApprovalProject.uploadedPurchaseBaseFiles,
  uploadedPurchaseFormalFiles: editApprovalProject.uploadedPurchaseFormalFiles,
  uploadedPurchaseBidWinFiles: editApprovalProject.uploadedPurchaseBidWinFiles,
}))(WrappedForm);
