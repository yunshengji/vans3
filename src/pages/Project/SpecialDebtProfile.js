import React from 'react';
import { Link, withRouter } from 'umi';
import { connect } from 'dva';
import {
  Spin,
  Col,
  InputNumber,
  Form,
  DatePicker,
  Input,
  Row,
  Select,
  Button,
  Icon,
  Upload,
  List,
  Breadcrumb,
} from 'antd';
import moment from 'moment';
import { getFileURL } from '@/utils/transfer';
import styles from './SpecialDebtProfile.less';


class SpecialDebtProfile extends React.Component {
  componentDidMount() {
    this.props.dispatch({ type: 'editSpecialDebt/eGetUsers', payload: {} });
    const { id } = this.props.match.params;
    this.props.dispatch({ type: 'editSpecialDebt/eGetSpecialDebt', id });
  }

  // deleteUploadedFile = (item) => {
  //   const { uploadedSummarizeFile } = this.props;
  //   let payload = [];
  //   uploadedSummarizeFile.forEach(value => {
  //     if (value.id !== item.id) {
  //       payload.push(value);
  //     }
  //   });
  //   this.props.dispatch({ type: 'editSpecialDebt/rUpdateState', payload: { uploadedSummarizeFile: payload } });
  // };

  render() {
    const {
      form: { getFieldDecorator, getFieldValue, setFieldsValue },
      submittingCreatedProcess, submittingUpdatedProcess, loadingProcess,
      usersList, editSpecialDebt, uploadedSummarizeFile,
    } = this.props;
    const routes = [{ breadcrumbName: '专项债项目', path: '/specialDebt' }, { breadcrumbName: '项目详情' }];
    return (
      <React.Fragment>
        <div className="headerWrapperWithCreate">
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
          <Spin
            spinning={Boolean(submittingCreatedProcess) || Boolean(loadingProcess) || Boolean(submittingUpdatedProcess)}>
            <Form layout="horizontal">
              <h3>基础信息</h3>
              <Row gutter={[80]}>
                <Col xl={8} md={12} sm={24}>
                  <div className={styles.itemContainer}>
                    <p>项目名称：</p>
                    <p>{editSpecialDebt.origin && editSpecialDebt.origin.name}</p>
                  </div>
                </Col>
                <Col xl={8} md={12} sm={24}>
                  <div className={styles.itemContainer}>
                    <p>项目类型：</p>
                    <p>{editSpecialDebt['category']}</p>
                  </div>
                </Col>
              </Row>
              <Row gutter={[150]}>
                <Col xl={6} md={12} sm={24}>
                  <Form.Item label="所属地区">
                    {getFieldDecorator('location', { initialValue: editSpecialDebt['location'] })(
                      <Input placeholder="请输入"/>,
                    )}
                  </Form.Item>
                </Col>
                <Col xl={6} md={12} sm={24}>
                  <Form.Item label="所属行业">
                    {getFieldDecorator('industry', { initialValue: editSpecialDebt['industry'] })(
                      <Input placeholder="请输入"/>,
                    )}
                  </Form.Item>
                </Col>
                <Col xl={6} md={12} sm={24}>
                  <Form.Item label="行业主管部门">
                    {getFieldDecorator('manager_department', { initialValue: editSpecialDebt['manager_department'] })(
                      <Input placeholder="请输入"/>,
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[150]}>
                <Col xl={6} md={12} sm={24}>
                  <Form.Item label="项目业主">
                    {getFieldDecorator('client', { initialValue: editSpecialDebt['client'] })(
                      <Input placeholder="请输入"/>,
                    )}
                  </Form.Item>
                </Col>
                <Col xl={6} md={12} sm={24}>
                  <Form.Item label="签约主体">
                    {getFieldDecorator('signatory', { initialValue: editSpecialDebt['signatory'] })(
                      <Input placeholder="请输入"/>,
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[150]}>
                <Col xl={6} md={12} sm={24}>
                  <Form.Item label="总投资（万元）">
                    {getFieldDecorator('invest', { initialValue: editSpecialDebt['invest'] })(
                      <InputNumber min={0} style={{ width: '100%' }}/>,
                    )}
                  </Form.Item>
                </Col>
                <Col xl={6} md={12} sm={24}>
                  <Form.Item label="发债额度（万元）">
                    {getFieldDecorator('debt_cash', { initialValue: editSpecialDebt['debt_cash'] })(
                      <InputNumber min={0} style={{ width: '100%' }}/>,
                    )}
                  </Form.Item>
                </Col>
                <Col xl={6} md={12} sm={24}>
                  <Form.Item label="合同金额（万元）">
                    {getFieldDecorator('cash', { initialValue: editSpecialDebt['cash'] })(
                      <InputNumber min={0} style={{ width: '100%' }}/>,
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[150]}>
                <Col xl={6} md={12} sm={24}>
                  <Form.Item label="项目计划周期">
                    {getFieldDecorator('period', { initialValue: editSpecialDebt['period'] })(
                      <DatePicker.RangePicker placeholder="请输入"/>,
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[150]}>
                <Col xl={12} md={12} sm={24}>
                  <Form.Item label="付款条件">
                    {getFieldDecorator('pay_terms', { initialValue: editSpecialDebt['pay_terms'] })(
                      <Input.TextArea placeholder="请输入" autoSize={{ minRows: 4, maxRows: 4 }}/>,
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <h3>发债信息</h3>
              <Row gutter={[150]}>
                <Col xl={12} md={12} sm={24}>
                  <Button type="dashed" block onClick={this.addPublishDebtFormItem}>
                    <Icon type="plus"/> 增加
                  </Button>
                </Col>
              </Row>
              <Row gutter={[150]}>
                <Col xl={6} md={12} sm={24}>
                  <Form.Item label="发债总额（万元）">
                    {getFieldDecorator('debt_total', { initialValue: editSpecialDebt['debt_total'] })(
                      <InputNumber min={0} style={{ width: '100%' }}/>,
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[150]}>
                <Col xl={12} md={12} sm={24}>
                  <Form.Item label="发债备注">
                    {getFieldDecorator('debt_remark', { initialValue: editSpecialDebt['debt_remark'] })(
                      <Input.TextArea placeholder="请输入" autoSize={{ minRows: 4, maxRows: 4 }}/>,
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <h3>营销信息</h3>
              <Row gutter={[150]}>
                <Col xl={6} md={12} sm={24}>
                  <Form.Item label="营销人员">
                    {getFieldDecorator('menber_a', { initialValue: editSpecialDebt['menber_a'] })(
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
                <Col xl={6} md={12} sm={24}>
                  <Form.Item label="项目分级">
                    {getFieldDecorator('level', { initialValue: editSpecialDebt['level'] })(
                      <Input placeholder="请输入"/>,
                    )}
                  </Form.Item>
                </Col>
                <Col xl={6} md={12} sm={24}>
                  <Form.Item label="甲方联系人">
                    {getFieldDecorator('contact_up', { initialValue: editSpecialDebt['contact_up'] })(
                      <Input placeholder="请输入"/>,
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[150]}>
                <Col xl={12} md={12} sm={24}>
                  <Form.Item label="情况备注">
                    {getFieldDecorator('remark_situation', { initialValue: editSpecialDebt['remark_situation'] })(
                      <Input.TextArea placeholder="请输入" autoSize={{ minRows: 4, maxRows: 4 }}/>,
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <h3>执行信息</h3>
              <Row gutter={[150]}>
                <Col xl={6} md={12} sm={24}>
                  <Form.Item label="项目负责人">
                    {getFieldDecorator('menber_b', { initialValue: editSpecialDebt['menber_b'] })(
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
                <Col xl={6} md={12} sm={24}>
                  <Form.Item label="客服">
                    {getFieldDecorator('menber_c', { initialValue: editSpecialDebt['menber_c'] })(
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
                <Col xl={6} md={12} sm={24}>
                  <Form.Item label="编制人员">
                    {getFieldDecorator('menber_d', { initialValue: editSpecialDebt['menber_d'] })(
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
              <Row gutter={[150]}>
                <Col xl={6} md={12} sm={24}>
                  <Form.Item label="开始时间">
                    {getFieldDecorator('start', { initialValue: editSpecialDebt['start'] && moment(editSpecialDebt['start'] * 1000) })(
                      <DatePicker style={{ width: '100%' }}/>,
                    )}
                  </Form.Item>
                </Col>
                <Col xl={6} md={12} sm={24}>
                  <Form.Item label="审核成员">
                    {getFieldDecorator('menber_e', { initialValue: editSpecialDebt['menber_e'] })(
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
              <h3>备注</h3>
              <Row gutter={[150]}>
                <Col xl={12} md={12} sm={24}>
                  <Form.Item>
                    {getFieldDecorator('remark', { initialValue: editSpecialDebt['remark'] })(
                      <Input.TextArea placeholder="请输入" autoSize={{ minRows: 4, maxRows: 4 }}/>,
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <h3>外包信息</h3>
              <Row gutter={[150]}>
                <Col xl={12} md={12} sm={24}>
                  <Button type="dashed" block onClick={this.addOutSourceFormItem}>
                    <Icon type="plus"/> 增加
                  </Button>
                </Col>
              </Row>
              <h3>汇总文件</h3>
              <h3>已有的汇总文件</h3>
              <Row gutter={[150]}>
                <Col xl={12} md={12} sm={24}>
                  <List itemLayout="horizontal" dataSource={uploadedSummarizeFile}
                        renderItem={(item, index) => (
                          <List.Item
                            key={item.id}
                            // actions={[
                            //   <Button type="link" icon="delete" className="redButton" onClick={() => {
                            //     this.deleteUploadedFile(item);
                            //   }}>
                            //     删除
                            //   </Button>,
                            // ]}
                          >
                            <a href={getFileURL(item.id)} target="_blank">{item['file_name_local']}</a>
                          </List.Item>
                        )}
                  />
                </Col>
              </Row>
              <Row>
                <Button type="primary" onClick={this.submit}>提交</Button>
              </Row>
            </Form>
          </Spin>
        </div>
      </React.Fragment>
    );
  }
}

const WrappedForm = Form.create({ name: 'EditSpecialDebtInfo' })(SpecialDebtProfile);

export default withRouter(connect(({ loading, common, editSpecialDebt }) => ({
  submittingCreatedProcess: loading.effects['editSpecialDebt/eCreateEasyProcess'],
  submittingUpdatedProcess: loading.effects['editSpecialDebt/eUpdateEasyProcess'],
  loadingProcess: loading.effects['editSpecialDebt/eGetEasyProcess'],
  usersList: editSpecialDebt.usersList,
  editSpecialDebt: editSpecialDebt.editSpecialDebt,
  uploadedSummarizeFile: editSpecialDebt.uploadedSummarizeFile,
}))(WrappedForm));
