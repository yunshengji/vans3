import React from 'react';
import { Link, withRouter } from 'umi';
import { connect } from 'dva';
import { Spin, Col, Row, Breadcrumb, List, Button, Empty } from 'antd';
import moment from 'moment';
import { getFileURL } from '@/utils/transfer';
import styles from '@/pages/ApprovalProjects/ProfileApprovalProject.less';

class StaffProfile extends React.Component {

  componentDidMount() {
    this.props.dispatch({ type: 'staffProfile/eGetStaff' });
  }

  componentWillUnmount() {
    this.props.dispatch({ type: 'staffProfile/rUpdateState', payload: { staff: {} } });
  }

  render() {
    const { routes, loadingStaff, staff } = this.props;

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
          {
            Object.keys(staff).length > 0 ?
              <Spin spinning={Boolean(loadingStaff)}>
                <h3>基本信息</h3>
                <Row gutter={[80]}>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.itemContainer}>
                      <p>姓名：</p>
                      <p>{staff['name']}</p>
                    </div>
                  </Col>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.itemContainer}>
                      <p>部门：</p>
                      <p>{staff.department && staff.department.name}</p>
                    </div>
                  </Col>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.itemContainer}>
                      <p>自招/挂靠：</p>
                      <p>{staff.recruit}</p>
                    </div>
                  </Col>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.itemContainer}>
                      <p>职位：</p>
                      <p>{staff.position}</p>
                    </div>
                  </Col>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.itemContainer}>
                      <p>工作状态：</p>
                      <p>{staff.status}</p>
                    </div>
                  </Col>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.itemContainer}>
                      <p>联系方式：</p>
                      <p>{staff.phone}</p>
                    </div>
                  </Col>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.itemContainer}>
                      <p>身份证号：</p>
                      <p>{staff.number}</p>
                    </div>
                  </Col>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.itemContainer}>
                      <p>现住地址：</p>
                      <p>{staff.address}</p>
                    </div>
                  </Col>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.itemContainer}>
                      <p>入职时间：</p>
                      <p>{staff.entry_time && moment(staff['entry_time'] * 1000).format('YYYY-MM-DD')}</p>
                    </div>
                  </Col>
                </Row>
                <h3>薪酬福利</h3>
                <Row gutter={[80]}>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.itemContainer}>
                      <p>工资（元）：</p>
                      <p>{staff.salary}</p>
                    </div>
                  </Col>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.itemContainer}>
                      <p>社保（元）：</p>
                      <p>{staff.social_security}</p>
                    </div>
                  </Col>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.itemContainer}>
                      <p>公积金（元）：</p>
                      <p>{staff.reserved_funds}</p>
                    </div>
                  </Col>
                </Row>
                <h3>证书资料</h3>
                <Row gutter={[80]}>
                  {
                    staff.credentials_front &&
                    <Col xl={8} md={12} sm={24}>
                      <img src={getFileURL(staff.credentials_front.id)} style={{ width: '100%' }}/>
                    </Col>
                  }
                  {
                    staff.credentials_back &&
                    <Col xl={8} md={12} sm={24}>
                      <img src={getFileURL(staff.credentials_back.id)} style={{ width: '100%' }}/>
                    </Col>
                  }
                  {
                    staff.diploma &&
                    <Col xl={8} md={12} sm={24}>
                      <img src={getFileURL(staff.diploma.id)} style={{ width: '100%' }}/>
                    </Col>
                  }
                </Row>
                <Row gutter={[150]}>
                  <Col xl={12} md={12} sm={24}>
                    <List itemLayout="horizontal" bordered header="资质证书" dataSource={staff.certificate_other}
                          renderItem={(item, index) => (
                            <List.Item key={item.id}>
                              <a href={getFileURL(item.id)} target="_blank">{item['file_name_local']}</a>
                            </List.Item>
                          )}
                    />
                  </Col>
                </Row>
                <h3>劳动合同</h3>
                <Col xl={12} md={12} sm={24}>
                  <List itemLayout="horizontal" dataSource={staff.contract}
                        renderItem={(item, index) => (
                          <List.Item key={item.id}>
                            <a href={getFileURL(item.id)} target="_blank">{item['file_name_local']}</a>
                          </List.Item>
                        )}
                  />
                </Col>
              </Spin>
              :
              <Empty style={{ marginTop: '15vh' }}/>
          }
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(connect(({ loading, common, staffProfile }) => ({
  loadingStaff: loading.effects['staffProfile/eGetStaff'],
  routes: staffProfile.routes,
  staff: staffProfile.staff,
}))(StaffProfile));
