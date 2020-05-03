import React from 'react';
import { Link } from 'umi';
import { connect } from 'dva';
import { Row, Col, Button, Icon, Select, Input, Form, Modal, message, Breadcrumb, DatePicker } from 'antd';

const { Option } = Select;
const { confirm } = Modal;
const { TextArea } = Input;

class CreateSpecialDebt extends React.Component {

  componentDidMount() {
    this.props.dispatch({ type: 'projectsList/eGetProjects' });
  }

  showDeleteConfirm = ({ name, principal }) => {
    confirm({
      title: '确定删除此项目',
      content: `${principal}负责的项目"${name}"`,
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        message.success('删除成功');
      },
    });
  };

  render() {
    const { breadcrumbs } = this.props;
    return (
      <React.Fragment>
        <div className="headerWrapper">
          <Breadcrumb>
            {breadcrumbs.map((item, index) => {
              const { path, breadcrumbName } = item;
              return (path ?
                  <Breadcrumb.Item key={index}>
                    <Link to={path}>{breadcrumbName}</Link>
                  </Breadcrumb.Item>
                  :
                  <Breadcrumb.Item key={index}>
                    <span>{breadcrumbName}</span>
                  </Breadcrumb.Item>
              );
            })}
          </Breadcrumb>
        </div>
        <div className="contentWrapper">
          <Form layout="horizontal">
            <h3>基本信息</h3>
            <Row gutter={[80]}>
              <Col xl={6} md={12} sm={24}>
                <Form.Item label="项目名称">
                  <Input placeholder="请输入"/>
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 3 }} md={12} sm={24}>
                <Form.Item label="项目地区">
                  <Select mode="multiple" placeholder="请选择">
                    <Option key="a">王玉成</Option>
                    <Option key="b">汪宇晨</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 3 }} md={12} sm={24}>
                <Form.Item label="投资方">
                  <Input placeholder="请输入"/>
                </Form.Item>
              </Col>
              <Col xl={6} md={12} sm={24}>
                <Form.Item label="发债额度">
                  <Input placeholder="请输入"/>
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 3 }} md={12} sm={24}>
                <Form.Item label="签约主体">
                  <Input placeholder="请输入"/>
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 3 }} md={12} sm={24}>
                <Form.Item label="合同金额">
                  <Input placeholder="请输入"/>
                </Form.Item>
              </Col>
              <Col xl={6} md={12} sm={24}>
                <Form.Item label="所属行业">
                  <Select mode="multiple" placeholder="请选择">
                    <Option key="a">水利</Option>
                    <Option key="b">高标准农田</Option>
                    <Option key="c">园区开发</Option>
                    <Option key="d">市政</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 3 }} md={12} sm={24}>
                <Form.Item label="付款条件">
                  <TextArea placeholder="请输入" allowClear rows={4}/>
                </Form.Item>
              </Col>
            </Row>
            <h3>营销信息</h3>
            <Row gutter={[80]}>
              <Col xl={6} md={12} sm={24}>
                <Form.Item label="营销人员">
                  <Input placeholder="请输入"/>
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 3 }} md={12} sm={24}>
                <Form.Item label="项目分级">
                  <Select mode="multiple" placeholder="请选择">
                    <Option key="a">一级</Option>
                    <Option key="b">二级</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 3 }} md={12} sm={24}>
                <Form.Item label="客户">
                  <Input placeholder="请输入"/>
                </Form.Item>
              </Col>
              <Col xl={8} md={12} sm={24}>
                <Form.Item label="备注">
                  <TextArea placeholder="请输入" allowClear rows={4}/>
                </Form.Item>
              </Col>
            </Row>
            <h3>执行信息</h3>
            <Row gutter={[80]}>
              <Col xl={6} md={12} sm={24}>
                <Form.Item label="项目负责人">
                  <Input placeholder="请输入"/>
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 3 }} md={12} sm={24}>
                <Form.Item label="客服">
                  <Select mode="multiple" placeholder="请选择">
                    <Option key="a">一级</Option>
                    <Option key="b">二级</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 3 }} md={12} sm={24}>
                <Form.Item label="编制人员">
                  <Input placeholder="请输入"/>
                </Form.Item>
              </Col>
              <Col xl={8} md={12} sm={24}>
                <Form.Item label="开始时间">
                  <DatePicker/>
                </Form.Item>
              </Col>
            </Row>
            <h3>外包信息</h3>
            <Row gutter={[80]}>
              <Col>
                <Row>
                  <Col xl={5} md={10} sm={24}>
                    <Button type="dashed" onClick={this.add} block>
                      <Icon type="plus"/> 添加外包信息
                    </Button>
                  </Col>
                </Row>
              </Col>
              <Col xl={6} md={12} sm={24}>
                <Form.Item label="项目负责人">
                  <Input placeholder="请输入"/>
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 3 }} md={12} sm={24}>
                <Form.Item label="客服">
                  <Select mode="multiple" placeholder="请选择">
                    <Option key="a">一级</Option>
                    <Option key="b">二级</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 3 }} md={12} sm={24}>
                <Form.Item label="编制人员">
                  <Input placeholder="请输入"/>
                </Form.Item>
              </Col>
            </Row>
            <h3>备注</h3>
            <Row gutter={[80]}>
              <Col xl={8} md={12} sm={24}>
                <Form.Item>
                  <TextArea placeholder="请输入" allowClear rows={4}/>
                </Form.Item>
              </Col>
            </Row>
            <Row type="flex" justify="center">
              <Col xl={3} sm={12} xs={24}>
                <Button type="primary" block>保存</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </React.Fragment>
    );
  }
}


export default connect(({ loading, createSpecialDebt }) => ({
  // fetchingProjectsData: loading.effects['projectsList/eGetProjects'],
  breadcrumbs: createSpecialDebt.breadcrumbs,
}))(CreateSpecialDebt);
