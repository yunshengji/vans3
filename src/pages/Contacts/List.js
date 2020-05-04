import React from 'react';
import { Link } from 'umi';
import { connect } from 'dva';
import { Breadcrumb, Button, Tabs } from 'antd';
import Customers from '@/pages/Contacts/components/Customers';
import CreateCustomerModal from '@/pages/Contacts/components/CreateCustomerModal';
import Contractors from '@/pages/Contacts/components/Contractors';

const { TabPane } = Tabs;

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
      payload: { createCustomerModalVisible: true },
    });
  };

  render() {
    const { activeKey } = this.props;
    const routes = activeKey === 'customers' ? [{ breadcrumbName: '客户列表' }] : [{ breadcrumbName: '合作伙伴列表' }];
    return (
      <div>
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
            <Button size="small" type="primary" onClick={this.showCreateCustomerModal}>
              新建客户
            </Button>
            :
            <Button size="small" type="primary" onClick={this.showCreateContractorModal}>
              新建合作伙伴
            </Button>
          }
          <CreateCustomerModal/>
        </div>
        <div className="contentWrapper">
          <Tabs activeKey={activeKey} onChange={this.changeTab}>
            <TabPane tab="客户" key="customers">
              <Customers/>
            </TabPane>
            <TabPane tab="合作伙伴" key="contractors">
              <Contractors/>
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default connect(({ loading, contactsList }) => ({
  activeKey: contactsList.activeKey,
}))(ContactsList);
