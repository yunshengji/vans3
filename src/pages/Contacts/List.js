import React from 'react';
import { Link } from 'umi';
import { connect } from 'dva';
import { Breadcrumb, Button, Tabs } from 'antd';
import Customers from '@/pages/Contacts/components/Customers';
import Contractors from '@/pages/Contacts/components/Contractors';
import CreateCustomerModal from '@/pages/Contacts/components/CreateCustomerModal';
import CreateContractorModal from '@/pages/Contacts/components/CreateContractorModal';
import EditCustomerModal from '@/pages/Contacts/components/EditCustomerModal';
import EditContractorModal from '@/pages/Contacts/components/EditContractorModal';

class ContactsList extends React.Component {
  changeTab = (activeKey) => {
    this.props.dispatch({
      type: 'contactsList/rUpdateState',
      payload: { activeKey },
    });
  };
  showCreateCustomerModal = () => {
    this.props.dispatch({
      type: 'contactsList/rUpdateState',
      payload: { createCustomerModalVisible: true },
    });
  };
  showCreateContractorModal = () => {
    this.props.dispatch({
      type: 'contactsList/rUpdateState',
      payload: { createContractorModalVisible: true },
    });
  };

  render() {
    const { activeKey } = this.props;
    const routes = activeKey === 'customers' ? [
        { breadcrumbName: '联系人', path: '/contacts' },
        { breadcrumbName: '客户' }]
      :
      [
        { breadcrumbName: '联系人', path: '/contacts' },
        { breadcrumbName: '合作伙伴' },
      ];
    return (
      <React.Fragment>
        <CreateCustomerModal/>
        <CreateContractorModal/>
        <EditCustomerModal/>
        <EditContractorModal/>
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
          {activeKey === 'customers' ?
            <Button icon="plus-circle" onClick={this.showCreateCustomerModal}>
              新建客户
            </Button>
            :
            <Button icon="plus-circle" onClick={this.showCreateContractorModal}>
              新建合作伙伴
            </Button>
          }
        </div>
        <div className="contentWrapper">
          <Tabs activeKey={activeKey} onChange={this.changeTab}>
            <Tabs.TabPane tab="我的客户" key="customers">
              <Customers/>
            </Tabs.TabPane>
            <Tabs.TabPane tab="合作伙伴" key="contractors">
              <Contractors/>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(({ loading, common, contactsList }) => ({
  activeKey: contactsList.activeKey,
}))(ContactsList);
