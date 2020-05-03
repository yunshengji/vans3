import React from 'react';
import { connect } from 'dva';
import { Tabs } from 'antd';
import ListHeader from '@/pages/Contacts/components/ListHeader';
import Contractors from '@/pages/Contacts/components/Contractors';
import Customers from '@/pages/Contacts/components/Customers';
import styles from './List.less';

const { TabPane } = Tabs;

class List extends React.Component {
  changeTab = (activeKey) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'contactsList/rUpdateState',
      payload: { activeKey },
    });
  };

  render() {
    const { activeKey } = this.props;
    return (
      <div className={styles.root}>
        <ListHeader/>
        <div className={styles.contentWrapper}>
          <Tabs activeKey={activeKey} onChange={this.changeTab}>
            <TabPane tab="客户" key="customers" className={styles.tabPane}>
              <Customers/>
            </TabPane>
            <TabPane tab="合作伙伴" key="contractors" className={styles.tabPane}>
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
}))(List);
