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
            (mine.department.name === '营销部' || mine.department.name === '运营部' || mine.level > 2) &&
            <a href={`/approvalProject/edit/${id}`}>
              <Button icon="edit">
                编辑
              </Button>
            </a>
          }
        </div>
        <Spin
          spinning={Boolean(loadingOrigin) || Boolean(loadingRecord) || Boolean(loadingExecute) || Boolean(loadingService)}>
          <div className="contentWrapper">
            <Row type="flex" justify="end">
              <Button type="link" icon="cloud-download" onClick={() => this.exportResult(id)}>
                导出立项审批 Excel 表格
              </Button>
            </Row>
            <h3>基础信息</h3>
            <Row gutter={[80]}>
              <Col xl={8} md={12} sm={24}>
                <div className={styles.itemContainer}>
                  <p>项目序号：</p>
                  <p>{profileOrigin['num']}</p>
                </div>
              </Col>
              <Col xl={8} md={12} sm={24}>
                <div className={styles.itemContainer}>
                  <p>签约时间：</p>
                  <p>{profileOrigin['sign_date'] && moment(profileOrigin['sign_date'] * 1000).format('YYYY-MM-DD')}</p>
                </div>
              </Col>
              <Col xl={8} md={12} sm={24}>
                <div className={styles.itemContainer}>
                  <p>实施机构：</p>
                  <p>{profileOrigin['act_org']}</p>
                </div>
              </Col>
              <Col sm={24}>
                <div className={styles.itemContainer}>
                  <p>项目名称：</p>
                  <p>{profileOrigin['name']}</p>
                </div>
              </Col>
              <Col xl={8} md={12} sm={24}>
                <div className={styles.itemContainer}>
                  <p>项目状态：</p>
                  <p>
                    {profileOrigin['status'] === '执行中' && <Tag color="blue">执行中</Tag>}
                    {profileOrigin['status'] === '已废弃' && <Tag color="orange">已废弃</Tag>}
                    {profileOrigin['status'] === '已完结' && <Tag color="green">已完结</Tag>}
                  </p>
                </div>
              </Col>
            </Row>
            <h3>项目概况</h3>
            <Row gutter={[80]}>
              <Col xl={8} md={12} sm={24}>
                <div className={styles.itemContainer}>
                  <p>项目类别：</p>
                  <p>{profileOrigin['category']}</p>
                </div>
              </Col>
              <Col xl={8} md={12} sm={24}>
                <div className={styles.itemContainer}>
                  <p>项目金额：</p>
                  <p>{profileOrigin['cash']} {profileOrigin['cash'] && '万元'}</p>
                </div>
              </Col>
              <Col xl={8} md={12} sm={24}>
                <div className={styles.itemContainer}>
                  <p>项目组成员：</p>
                  <p>{_.join(_.map(profileOrigin['members'], 'name'), '、')}</p>
                </div>
              </Col>
              <Col sm={24}>
                <div className={styles.itemContainer}>
                  <p>金额明细：</p>
                  <p>{profileOrigin['cash_detail']}</p>
                </div>
              </Col>
              <Col sm={24}>
                <div className={styles.itemContainer}>
                  <p>投标资料：</p>
                  <p>{profileOrigin['bid_info']}</p>
                </div>
              </Col>
              <Col sm={24}>
                <div className={styles.itemContainer}>
                  <p>收款情况：</p>
                  <p>{profileOrigin['receipt_status']}</p>
                </div>
              </Col>
              {
                mine.level > 1 &&
                <Col sm={24}>
                  <div className={styles.itemContainer}>
                    <p>销售费用：</p>
                    <p>{profileOrigin['sales_fee']}</p>
                  </div>
                </Col>
              }
              <Col sm={24}>
                <div className={styles.itemContainer}>
                  <p>实施费用：</p>
                  <p>{profileOrigin['act_fee']}</p>
                </div>
              </Col>
              <Col sm={24}>
                <div className={styles.itemContainer}>
                  <p>外包公司：</p>
                  <div>
                    {_.map(profileOrigin['origin_outer'], item => (
                      <p>{item.company_name} {item.price}万元 {item.contact}</p>
                    ))}
                  </div>
                </div>
              </Col>
              <Col sm={24}>
                <div className={styles.itemContainer}>
                  <p>备注：</p>
                  <p>{profileOrigin['memo']}</p>
                </div>
              </Col>
            </Row>
            <Row gutter={[80]}>
              <Col xl={8} md={12} sm={24}>
                <div className={styles.itemContainer}>
                  <p>股东确认：</p>
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
                        <Icon type="check"/>确认
                      </Button>
                    </Col>
                  }
                </div>
              </Col>
            </Row>
            {
              (mine.level > 1 || _.find(profileOrigin['members'], { id: mine.id })) &&
              <React.Fragment>
                <h3>合同</h3>
                <Row gutter={[80]}>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.itemContainer}>
                      <p>合同金额：</p>
                      {
                        profileContract['cash'] &&
                        <p>{profileContract['cash']} 元</p>
                      }
                    </div>
                  </Col>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.itemContainer}>
                      <p>差旅费：</p>
                      {
                        profileContract['travel_cash'] &&
                        <p>profileContract['travel_cash'] 元</p>
                      }
                    </div>
                  </Col>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.itemContainer}>
                      <p>结算情况：</p>
                      <p>{profileContract['settlement']}</p>
                    </div>
                  </Col>
                </Row>
                <Row gutter={[80]}>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.itemContainer}>
                      <p>合同文件：</p>
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
              </React.Fragment>
            }
            {
              mine.department.name === '营销部' &&
              <React.Fragment>
                <h3>备案表</h3>
                <Row gutter={[80]}>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.itemContainer}>
                      <p>备案编号：</p>
                      <p>{profileRecord['number']}</p>
                    </div>
                  </Col>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.itemContainer}>
                      <p>团队名称：</p>
                      <p>{profileRecord['team']}</p>
                    </div>
                  </Col>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.largeItemContainer}>
                      <p>业务主管单位对接领导级别：</p>
                      <p>{profileRecord['leader_level']}</p>
                    </div>
                  </Col>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.itemContainer}>
                      <p>项目备案时间：</p>
                      <p>{profileRecord['created'] && moment(profileRecord['created'] * 1000).format('YYYY-MM-DD')}</p>
                    </div>
                  </Col>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.itemContainer}>
                      <p>拟配合专业人员：</p>
                      <p>{profileRecord['prepared_Professional']}</p>
                    </div>
                  </Col>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.largeItemContainer}>
                      <p>预期需求方工作完成时间截点：</p>
                      <p>{profileRecord['expect_time'] && moment(profileRecord['expect_time'] * 1000).format('YYYY-MM-DD')}</p>
                    </div>
                  </Col>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.itemContainer}>
                      <p>项目来源：</p>
                      <p>{profileRecord['location']}</p>
                    </div>
                  </Col>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.itemContainer}>
                      <p>项目描述：</p>
                      <p>{profileRecord['description']}</p>
                    </div>
                  </Col>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.largeItemContainer}>
                      <p>其他需要说明的事项：</p>
                      <p>{profileRecord['remarks']}</p>
                    </div>
                  </Col>
                </Row>
                <h3>营销实施情况表</h3>
                <Row gutter={[80]}>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.largeItemContainer}>
                      <p>营销季度报编号：</p>
                      <p>{profileExecute['number']}</p>
                    </div>
                  </Col>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.largeItemContainer}>
                      <p>团队名称：</p>
                      <p>{profileExecute['team']}</p>
                    </div>
                  </Col>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.largeItemContainer}>
                      <p>业务主管单位对接领导级别：</p>
                      <p>{profileExecute['leader_level']}</p>
                    </div>
                  </Col>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.largeItemContainer}>
                      <p>项目来源：</p>
                      <p>{profileExecute['location']}</p>
                    </div>
                  </Col>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.largeItemContainer}>
                      <p>项目描述：</p>
                      <p>{profileExecute['description']}</p>
                    </div>
                  </Col>
                  <Col span={24} style={{ marginBottom: '2em' }}/>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.largeItemContainer}>
                      <p>与项目单位签署合同：</p>
                      <p>
                        {profileExecute['contract_status'] === true && '是'}
                        {profileExecute['contract_status'] === false && '否'}
                      </p>
                    </div>
                  </Col>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.largeItemContainer}>
                      <p>已安排专业人员完成任务：</p>
                      <p>
                        {profileExecute['staff'] === true && '是'}
                        {profileExecute['staff'] === false && '否'}
                      </p>
                    </div>
                  </Col>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.itemContainer}>
                      <p>已经签署合同名称：</p>
                      <div>
                        {_.map(profileExecute['sign_contract'], item => {
                          return <p key={item.id}>{item.name}</p>;
                        })}
                      </div>
                    </div>
                  </Col>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.largeItemContainer}>
                      <p>未签署合同原因：</p>
                      <p>{profileExecute['not_sign_reason']}</p>
                    </div>
                  </Col>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.largeItemContainer}>
                      <p>后续跟踪计划：</p>
                      <p>{profileExecute['after_plan']}</p>
                    </div>
                  </Col>
                  <Col span={24} style={{ marginBottom: '2em' }}/>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.largeItemContainer}>
                      <p>财务部统计招待费用：</p>
                      <p>{profileExecute['entertain_cash_accountant']} {profileExecute['entertain_cash_accountant'] && '元'}</p>
                    </div>
                  </Col>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.largeItemContainer}>
                      <p>营销部门统计差旅费用：</p>
                      <p>{profileExecute['travel_cash_sell']} {profileExecute['travel_cash_sell'] && '元'}</p>
                    </div>
                  </Col>
                  <Col span={24}/>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.largeItemContainer}>
                      <p>营销部门统计招待费用：</p>
                      <p>{profileExecute['entertain_cash_sell']} {profileExecute['entertain_cash_sell'] && '元'}</p>
                    </div>
                  </Col>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.largeItemContainer}>
                      <p>财务部统计差旅费用：</p>
                      <p>{profileExecute['travel_cash_accountant']} {profileExecute['travel_cash_accountant'] && '元'}</p>
                    </div>
                  </Col>
                  <Col span={24} style={{ marginBottom: '2em' }}/>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.largeItemContainer}>
                      <p>其他需要说明的事项：</p>
                      <p>{profileExecute['remarks']}</p>
                    </div>
                  </Col>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.largeItemContainer}>
                      <p>实施情况表季度报填报时间：</p>
                      <p>{profileExecute['created'] && moment(profileExecute['created'] * 1000).format('YYYY-MM-DD')}</p>
                    </div>
                  </Col>
                </Row>
                <h3>跟踪服务表</h3>
                <Row gutter={[80]}>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.largeItemContainer}>
                      <p>项目跟踪服务年报编号：</p>
                      <p>{profileService['number']}</p>
                    </div>
                  </Col>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.largeItemContainer}>
                      <p>团队名称：</p>
                      <p>{profileService['team']}</p>
                    </div>
                  </Col>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.largeItemContainer}>
                      <p>业务主管单位对接领导级别：</p>
                      <p>{profileService['leader_level']}</p>
                    </div>
                  </Col>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.largeItemContainer}>
                      <p>是否完成收款：</p>
                      <p>
                        {profileService['receipt_status'] === true && '是'}
                        {profileService['receipt_status'] === false && '否'}
                      </p>
                    </div>
                  </Col>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.largeItemContainer}>
                      <p>未收款拟收回时间：</p>
                      <p>{profileService['pay_time'] && moment(profileService['pay_time'] * 1000).format('YYYY-MM-DD')}</p>
                    </div>
                  </Col>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.largeItemContainer}>
                      <p>该项目可能滋生服务需求描述：</p>
                      <p>{profileService['requirement']}</p>
                    </div>
                  </Col>
                  <Col span={24} style={{ marginBottom: '2em' }}/>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.largeItemContainer}>
                      <p>拟对接领导级别：</p>
                      <p>{profileService['prepared_leader_level']}</p>
                    </div>
                  </Col>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.largeItemContainer}>
                      <p>拟安排跟踪服务营销人员：</p>
                      <p>{_.join(profileService['prepared_marketers'], '、')}</p>
                    </div>
                  </Col>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.largeItemContainer}>
                      <p>拟安排跟踪服务专业人员：</p>
                      <p>{_.join(profileService['prepared_Professionals'], '、')}</p>
                    </div>
                  </Col>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.largeItemContainer}>
                      <p>项目来源：</p>
                      <p>{profileService['location']}</p>
                    </div>
                  </Col>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.largeItemContainer}>
                      <p>已经实施项目合同：</p>
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
                      <p>后续跟踪计划：</p>
                      <p>{profileService['after_plan']}</p>
                    </div>
                  </Col>
                  <Col xl={8} md={12} sm={24}>
                    <div className={styles.largeItemContainer}>
                      <p>其他需要说明的事项：</p>
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
