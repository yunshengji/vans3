import React from 'react';
import { Link } from 'umi';
import { connect } from 'dva';
import { Breadcrumb, Button, Col, Form, Input, Modal, Row, Select } from 'antd';
import styles from './ListHeader.less';

const { Option } = Select;

class ListHeader extends React.Component {
  showCustomersModal = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'contactsList/rUpdateState',
      payload: {
        customersModalVisible: true,
      },
    });
  };
  handleCustomerModalOk = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'contactsList/rUpdateState',
      payload: {
        customersModalVisible: false,
      },
    });
  };
  handleCustomerModalCancel = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'contactsList/rUpdateState',
      payload: {
        customersModalVisible: false,
      },
    });
  };
  showContractorsModal = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'contactsList/rUpdateState',
      payload: {
        contractorsModalVisible: true,
      },
    });
  };
  handleContractorModalOk = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'contactsList/rUpdateState',
      payload: {
        contractorsModalVisible: false,
      },
    });
  };
  handleContractorModalCancel = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'contactsList/rUpdateState',
      payload: {
        contractorsModalVisible: false,
      },
    });
  };

  render() {
    const { activeKey, customersModalVisible, contractorsModalVisible } = this.props;
    const routesCustomers = [
      { path: '/projects', breadcrumbName: '项目库' },
      { breadcrumbName: '客户列表' },
    ];
    const routesContractors = [
      { path: '/projects', breadcrumbName: '项目库' },
      { breadcrumbName: '合作伙伴列表' },
    ];
    const routes = activeKey === 'customers' ? routesCustomers : routesContractors;
    return (
      <div className={styles.root}>
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
        {activeKey === 'customers' ?
          <Button size="small" type="primary" onClick={this.showCustomersModal}>
            新建客户
          </Button>
          :
          <Button size="small" type="primary" onClick={this.showContractorsModal}>
            新建合作伙伴
          </Button>
        }
        <Modal title="新建客户" visible={customersModalVisible} onOk={this.handleCustomerModalOk}
               onCancel={this.handleCustomerModalCancel}>
          <Form layout="horizontal" labelCol={{ xs: 4 }} wrapperCol={{ xs: 18 }}>
            <Row gutter={[80]}>
              <Col>
                <Form.Item label="姓名">
                  <Input placeholder="请输入"/>
                </Form.Item>
              </Col>
              <Col>
                <Form.Item label="性别">
                  <Select placeholder="请选择">
                    <Option key="a">男</Option>
                    <Option key="b">女</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col>
                <Form.Item label="公司">
                  <Input placeholder="请输入"/>
                </Form.Item>
              </Col>
              <Col>
                <Form.Item label="部门">
                  <Input placeholder="请输入"/>
                </Form.Item>
              </Col>
              <Col>
                <Form.Item label="职务">
                  <Input placeholder="请输入"/>
                </Form.Item>
              </Col>
              <Col>
                <Form.Item label="手机号码">
                  <Input placeholder="请输入"/>
                </Form.Item>
              </Col>
              <Col>
                <Form.Item label="邮箱">
                  <Input placeholder="请输入"/>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
        <Modal title="新建合作伙伴" visible={contractorsModalVisible} onOk={this.handleContractorModalOk}
               onCancel={this.handleContractorModalCancel}>
          <Form layout="horizontal" labelCol={{ xs: 4 }} wrapperCol={{ xs: 18 }}>
            <Row gutter={[80]}>
              <Col>
                <Form.Item label="姓名">
                  <Input placeholder="请输入"/>
                </Form.Item>
              </Col>
              <Col>
                <Form.Item label="性别">
                  <Select placeholder="请选择">
                    <Option key="a">男</Option>
                    <Option key="b">女</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col>
                <Form.Item label="公司">
                  <Input placeholder="请输入"/>
                </Form.Item>
              </Col>
              <Col>
                <Form.Item label="部门">
                  <Input placeholder="请输入"/>
                </Form.Item>
              </Col>
              <Col>
                <Form.Item label="职务">
                  <Input placeholder="请输入"/>
                </Form.Item>
              </Col>
              <Col>
                <Form.Item label="手机号码">
                  <Input placeholder="请输入"/>
                </Form.Item>
              </Col>
              <Col>
                <Form.Item label="邮箱">
                  <Input placeholder="请输入"/>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default connect(({ loading, contactsList }) => ({
  activeKey: contactsList.activeKey,
  customersModalVisible: contactsList.customersModalVisible,
  contractorsModalVisible: contactsList.contractorsModalVisible,
}))(ListHeader);

