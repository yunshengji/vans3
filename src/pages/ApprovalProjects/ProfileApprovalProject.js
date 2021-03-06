import React from 'react';
import { connect } from 'dva';
import { Breadcrumb, Col, Row, Tag, Icon, Spin, Button, Form, InputNumber, Select, List } from 'antd';
import { Link } from 'umi';
import moment from 'moment';
import _ from 'lodash';
import Cookies from 'js-cookie';
import { prefix } from '../../../config/api';
import { getFileURL } from '@/utils/transfer';
import styles from './ProfileApprovalProject.less';

class ProfileApprovalProject extends React.Component {
  componentDidMount() {
    const { params: { id } } = this.props.match;
    this.props.dispatch({ type: 'profileApprovalProject/eGetOriginTable', id });
    this.props.dispatch({ type: 'profileApprovalProject/eGetOriginContract', payload: { origin: id } });
    this.props.dispatch({ type: 'profileApprovalProject/eGetRecordTable', payload: { origin_id: id } });
    this.props.dispatch({ type: 'profileApprovalProject/eGetExecuteTable', payload: { origin_id: id } });
    this.props.dispatch({ type: 'profileApprovalProject/eGetServiceTable', payload: { origin_id: id } });
  }

  exportResult = (id) => {
    const token = Cookies.get('token');
    window.open(`${prefix}/origin/export/${id}?token=${token}`, '_blank');
  };
  confirmSign = () => {
    const { params: { id } } = this.props.match;
    this.props.dispatch({ type: 'profileApprovalProject/eConfirmOrigin', id, payload: {} });
  };

  render() {
    const { mine, routes, profileOrigin, profileContract, profileRecord, profileExecute, profileService, loadingOrigin, loadingRecord, loadingExecute, loadingService } = this.props;
    const { params: { id } } = this.props.match;
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
          {
            (mine.department.name === '?????????' || mine.department.name === '?????????' || mine.level > 2) &&
            <a href={`/approvalProject/edit/${id}`}>
              <Button icon="edit">
                ??????
              </Button>
            </a>
          }
        </div>
        <Spin
          spinning={Boolean(loadingOrigin) || Boolean(loadingRecord) || Boolean(loadingExecute) || Boolean(loadingService)}>
          <div className="contentWrapper">
            <Row type="flex" justify="end">
              <Button type="link" icon="cloud-download" onClick={() => this.exportResult(id)}>
                ?????????????????? Excel ??????
              </Button>
            </Row>
            <h3>????????????</h3>
            <Row gutter={[80]}>
            <Col sm={24}>
                <div className={styles.itemContainer}>
                  <p>???????????????</p>
                  <p>{profileOrigin['name']}</p>
                </div>
              </Col>
              <Col xl={8} md={12} sm={24}>
                <div className={styles.itemContainer}>
                  <p>?????????????????????</p>
                  <p>{profileOrigin['project_finish_time'] && moment(profileOrigin['project_finish_time'] * 1000).format('YYYY-MM-DD   HH???')}</p>
                </div>
              </Col>
            </Row>
            <h3>????????????</h3>
            <Row gutter={[80]}>
              <Col xl={8} md={12} sm={24}>
                <div className={styles.itemContainer}>
                  <p>???????????????</p>
                  <p>{profileOrigin['category']}</p>
                </div>
              </Col>
              <Col xl={8} md={12} sm={24}>
                <div className={styles.itemContainer}>
                  <p>??????????????????</p>
                  <p>{_.join(_.map(profileOrigin['members'], 'name'), '???')}</p>
                </div>
              </Col>
              <Col sm={24}>
                <div className={styles.itemContainer}>
                  <p>?????????????????????</p>
                  <p>{profileOrigin['cash_detail']}</p>
                </div>
              </Col>
              <Col sm={24}>
                <div className={styles.itemContainer}>
                  <p>????????????????????????</p>
                  <p>{profileOrigin['team_memo']}</p>
                </div>
              </Col>
              <Col sm={24}>
                <div className={styles.itemContainer}>
                  <p>???????????????</p>
                  <p>{profileOrigin['receipt_status']}</p>
                </div>
              </Col>
              <Col sm={24}>
                <div className={styles.itemContainer}>
                  <p>???????????????</p>
                  <p>{profileOrigin['act_fee']}</p>
                </div>
              </Col>
              <Col sm={24}>
                <div className={styles.itemContainer}>
                  {
                    mine.department.name === '?????????' ?
                    <p>
                      <a style={{ fontSize: '14px' }} href={`/approvalProject/edit/${id}?key=Process`}>???????????????</a>
                    </p>
                      :
                      <p>???????????????</p>
                  }
                  <p>{profileOrigin['bid_info']}</p>
                </div>
              </Col>

              {
                mine.level > 1 &&
                <Col sm={24}>
                  <div className={styles.itemContainer}>
                    <p>???????????????</p>
                    <p>{profileOrigin['sales_fee']}</p>
                  </div>
                </Col>
              }
              <Col sm={24}>
                <div className={styles.itemContainer}>
                  <p>?????????</p>
                  <p>{profileOrigin['memo']}</p>
                </div>
              </Col>
              <Col sm={24}>
                <div className={styles.itemContainer}>
                  <p>???????????????</p>
                  <div>
                    {_.map(profileOrigin['origin_outer'], item => (
                      <p>{item.company_name} {item.price}?????? {item.contact} ???????????????{item.company_memo}</p>
                    ))}
                  </div>
                </div>
              </Col>

            </Row>
            <Row gutter={[80]}>
              <Col xl={8} md={12} sm={24}>
                <div className={styles.itemContainer}>
                  <p>???????????????</p>
                  <p>
                    {
                      _.map(profileOrigin['confirm_list'], item => {
                        return (
                          item['confirmed'] ?
                            <Tag color="green" key={item['confirm_user']['id']} style={{ marginBottom: '.5em' }}>
                              {item['confirm_user'].name} <Icon type="check-circle"/>
                            </Tag>
                            :
                            <Tag color="orange" key={item['confirm_user']['id']} style={{ marginBottom: '.5em' }}>
                              {item['confirm_user'].name} <Icon type="exclamation-circle"/>
                            </Tag>
                        );
                      })
                    }
                  </p>
                  {
                    profileOrigin['need_confirm'] &&
                    <Col xl={6} md={12} sm={24}>
                      <Button onClick={this.confirmSign}>
                        <Icon type="check"/>??????
                      </Button>
                    </Col>
                  }
                </div>
              </Col>
            </Row>
            {
              (mine.level > 1 || _.find(profileOrigin['members'], { id: mine.id })) &&
              <React.Fragment>
                <h3>??????</h3>
                <Row gutter={[80]}>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.itemContainer}>
                      <p>???????????????</p>
                      {
                        profileContract['cash'] &&
                        <p>{profileContract['cash']} ???</p>
                      }
                    </div>
                  </Col>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.itemContainer}>
                      <p>???????????????</p>
                      <p>{profileContract['settlement']}</p>
                    </div>
                  </Col>
                </Row>
                <Row gutter={[80]}>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.itemContainer}>
                      <p>???????????????</p>
                      <List itemLayout="horizontal" className="noPaddingList" size="small"
                            dataSource={profileContract['attachment']}
                            renderItem={(item, index) => (
                              <List.Item key={item.id}>
                                <a href={getFileURL(item.id)} target="_blank">{item['file_name_local']}</a>
                              </List.Item>
                            )}/>
                    </div>
                  </Col>
                </Row>
                <Row gutter={[80]}>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.itemContainer}>
                      <p>???????????????</p>
                      <List itemLayout="horizontal" className="noPaddingList" size="small"
                            dataSource={profileContract['template']}
                            renderItem={(item, index) => (
                              <List.Item key={item.id}>
                                <a href={getFileURL(item.id)} target="_blank">{item['file_name_local']}</a>
                              </List.Item>
                            )}/>
                    </div>
                  </Col>
                </Row>
              </React.Fragment>
            }
            {
              mine.department.name === '?????????' &&
              <React.Fragment>
                <h3>?????????</h3>
                <Row gutter={[80]}>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.itemContainer}>
                      <p>???????????????</p>
                      <p>{profileRecord['number']}</p>
                    </div>
                  </Col>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.itemContainer}>
                      <p>???????????????</p>
                      <p>{profileRecord['team']}</p>
                    </div>
                  </Col>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.largeItemContainer}>
                      <p>???????????????????????????????????????</p>
                      <p>{profileRecord['leader_level']}</p>
                    </div>
                  </Col>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.itemContainer}>
                      <p>?????????????????????</p>
                      <p>{profileRecord['created'] && moment(profileRecord['created'] * 1000).format('YYYY-MM-DD')}</p>
                    </div>
                  </Col>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.itemContainer}>
                      <p>????????????????????????</p>
                      <p>{profileRecord['prepared_Professional']}</p>
                    </div>
                  </Col>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.largeItemContainer}>
                      <p>??????????????????????????????????????????</p>
                      <p>{profileRecord['expect_time'] && moment(profileRecord['expect_time'] * 1000).format('YYYY-MM-DD')}</p>
                    </div>
                  </Col>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.itemContainer}>
                      <p>???????????????</p>
                      <p>{profileRecord['location']}</p>
                    </div>
                  </Col>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.itemContainer}>
                      <p>???????????????</p>
                      <p>{profileRecord['description']}</p>
                    </div>
                  </Col>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.largeItemContainer}>
                      <p>??????????????????????????????</p>
                      <p>{profileRecord['remarks']}</p>
                    </div>
                  </Col>
                </Row>
                <h3>?????????????????????</h3>
                <Row gutter={[80]}>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.largeItemContainer}>
                      <p>????????????????????????</p>
                      <p>{profileExecute['number']}</p>
                    </div>
                  </Col>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.largeItemContainer}>
                      <p>???????????????</p>
                      <p>{profileExecute['team']}</p>
                    </div>
                  </Col>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.largeItemContainer}>
                      <p>???????????????????????????????????????</p>
                      <p>{profileExecute['leader_level']}</p>
                    </div>
                  </Col>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.largeItemContainer}>
                      <p>???????????????</p>
                      <p>{profileExecute['location']}</p>
                    </div>
                  </Col>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.largeItemContainer}>
                      <p>???????????????</p>
                      <p>{profileExecute['description']}</p>
                    </div>
                  </Col>
                  <Col span={24} style={{ marginBottom: '2em' }}/>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.largeItemContainer}>
                      <p>??????????????????????????????</p>
                      <p>
                        {profileExecute['contract_status'] === true && '???'}
                        {profileExecute['contract_status'] === false && '???'}
                      </p>
                    </div>
                  </Col>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.largeItemContainer}>
                      <p>????????????????????????????????????</p>
                      <p>
                        {profileExecute['staff'] === true && '???'}
                        {profileExecute['staff'] === false && '???'}
                      </p>
                    </div>
                  </Col>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.itemContainer}>
                      <p>???????????????????????????</p>
                      <div>
                        {_.map(profileExecute['sign_contract'], item => {
                          return <p key={item.id}>{item.name}</p>;
                        })}
                      </div>
                    </div>
                  </Col>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.largeItemContainer}>
                      <p>????????????????????????</p>
                      <p>{profileExecute['not_sign_reason']}</p>
                    </div>
                  </Col>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.largeItemContainer}>
                      <p>?????????????????????</p>
                      <p>{profileExecute['after_plan']}</p>
                    </div>
                  </Col>
                  <Col span={24} style={{ marginBottom: '2em' }}/>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.largeItemContainer}>
                      <p>??????????????????????????????</p>
                      <p>{profileExecute['entertain_cash_accountant']} {profileExecute['entertain_cash_accountant'] && '???'}</p>
                    </div>
                  </Col>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.largeItemContainer}>
                      <p>?????????????????????????????????</p>
                      <p>{profileExecute['travel_cash_sell']} {profileExecute['travel_cash_sell'] && '???'}</p>
                    </div>
                  </Col>
                  <Col span={24}/>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.largeItemContainer}>
                      <p>?????????????????????????????????</p>
                      <p>{profileExecute['entertain_cash_sell']} {profileExecute['entertain_cash_sell'] && '???'}</p>
                    </div>
                  </Col>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.largeItemContainer}>
                      <p>??????????????????????????????</p>
                      <p>{profileExecute['travel_cash_accountant']} {profileExecute['travel_cash_accountant'] && '???'}</p>
                    </div>
                  </Col>
                  <Col span={24} style={{ marginBottom: '2em' }}/>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.largeItemContainer}>
                      <p>??????????????????????????????</p>
                      <p>{profileExecute['remarks']}</p>
                    </div>
                  </Col>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.largeItemContainer}>
                      <p>???????????????????????????????????????</p>
                      <p>{profileExecute['created'] && moment(profileExecute['created'] * 1000).format('YYYY-MM-DD')}</p>
                    </div>
                  </Col>
                </Row>
                <h3>???????????????</h3>
                <Row gutter={[80]}>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.largeItemContainer}>
                      <p>?????????????????????????????????</p>
                      <p>{profileService['number']}</p>
                    </div>
                  </Col>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.largeItemContainer}>
                      <p>???????????????</p>
                      <p>{profileService['team']}</p>
                    </div>
                  </Col>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.largeItemContainer}>
                      <p>???????????????????????????????????????</p>
                      <p>{profileService['leader_level']}</p>
                    </div>
                  </Col>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.largeItemContainer}>
                      <p>?????????????????????</p>
                      <p>
                        {profileService['receipt_status'] === true && '???'}
                        {profileService['receipt_status'] === false && '???'}
                      </p>
                    </div>
                  </Col>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.largeItemContainer}>
                      <p>???????????????????????????</p>
                      <p>{profileService['pay_time'] && moment(profileService['pay_time'] * 1000).format('YYYY-MM-DD')}</p>
                    </div>
                  </Col>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.largeItemContainer}>
                      <p>??????????????????????????????????????????</p>
                      <p>{profileService['requirement']}</p>
                    </div>
                  </Col>
                  <Col span={24} style={{ marginBottom: '2em' }}/>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.largeItemContainer}>
                      <p>????????????????????????</p>
                      <p>{profileService['prepared_leader_level']}</p>
                    </div>
                  </Col>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.largeItemContainer}>
                      <p>????????????????????????????????????</p>
                      <p>{_.join(profileService['prepared_marketers'], '???')}</p>
                    </div>
                  </Col>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.largeItemContainer}>
                      <p>????????????????????????????????????</p>
                      <p>{_.join(profileService['prepared_Professionals'], '???')}</p>
                    </div>
                  </Col>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.largeItemContainer}>
                      <p>???????????????</p>
                      <p>{profileService['location']}</p>
                    </div>
                  </Col>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.largeItemContainer}>
                      <p>???????????????????????????</p>
                      <div>
                        {_.map(profileService['act_contract'], item => {
                          return <p key={item.id}>{item.name}</p>;
                        })}
                      </div>
                    </div>
                  </Col>

                  <Col span={24} style={{ marginBottom: '2em' }}/>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.largeItemContainer}>
                      <p>?????????????????????</p>
                      <p>{profileService['after_plan']}</p>
                    </div>
                  </Col>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.largeItemContainer}>
                      <p>??????????????????????????????</p>
                      <p>{profileService['remarks']}</p>
                    </div>
                  </Col>
                </Row>
              </React.Fragment>
            }
          </div>
        </Spin>
      </React.Fragment>);
  }
}

export default connect(({ loading, common, profileApprovalProject }) => ({
  loadingOrigin: loading.effects['profileApprovalProject/eGetOriginTable'],
  loadingRecord: loading.effects['profileApprovalProject/eGetRecordTable'],
  loadingService: loading.effects['profileApprovalProject/eGetServiceTable'],
  loadingExecute: loading.effects['profileApprovalProject/eGetExecuteTable'],
  routes: profileApprovalProject.routes,
  mine: common.mine,
  profileOrigin: profileApprovalProject.profileOrigin,
  profileContract: profileApprovalProject.profileContract,
  profileRecord: profileApprovalProject.profileRecord,
  profileExecute: profileApprovalProject.profileExecute,
  profileService: profileApprovalProject.profileService,
}))(ProfileApprovalProject);
