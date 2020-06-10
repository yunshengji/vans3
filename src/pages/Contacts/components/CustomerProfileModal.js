import React from 'react';
import { connect } from 'dva';
import { Modal, Row, Col, Rate, Tag } from 'antd';

class CustomerProfileModal extends React.Component {

  hideCustomerProfileModal = () => {
    this.props.dispatch({
      type: 'contactsList/rUpdateState',
      payload: { customerProfileModalVisible: false },
    });
  };

  render() {
    const { customerProfileModalVisible, customerProfile } = this.props;
    const { name, gender, area, company, job_title, phone, wx, email, points, personality, description, creator } = customerProfile;
    return (
      <Modal title="客户名片" visible={customerProfileModalVisible}
             onCancel={this.hideCustomerProfileModal} footer={null}>
        <Row gutter={[10]}>
          <Col xs={6} className="textRight"><p>姓名：</p></Col>
          <Col xs={15}><p>{name}</p></Col>
        </Row>
        <Row gutter={[10]}>
          <Col xs={6} className="textRight"><p>性别：</p></Col>
          <Col xs={15}>
            {gender === 'male' && <p>男</p>}
            {gender === 'female' && <p>女</p>}
            {gender === 'unknown' && <p>未知</p>}
          </Col>
        </Row>
        <Row gutter={[10]}>
          <Col xs={6} className="textRight"><p>地区：</p></Col>
          <Col xs={15}><p>{area || '未知'}</p></Col>
        </Row>
        <Row gutter={[10]}>
          <Col xs={6} className="textRight"><p>公司：</p></Col>
          <Col xs={15}><p>{company || '未知'}</p></Col>
        </Row>
        <Row gutter={[10]}>
          <Col xs={6} className="textRight"><p>职务：</p></Col>
          <Col xs={15}><p>{job_title || '未知'}</p></Col>
        </Row>
        <Row gutter={[10]}>
          <Col xs={6} className="textRight"><p>客户信息：</p></Col>
          <Col xs={15}>{customerProfile['private'] ? <Tag color="green">不公开</Tag> : <Tag color="orange">公开</Tag>}</Col>
        </Row>
        <Row gutter={[10]}>
          <Col xs={6} className="textRight"><p>重点关注度：</p></Col>
          <Col xs={15}><Rate disabled count={3} value={points}/></Col>
        </Row>
        <Row gutter={[10]}>
          <Col xs={6} className="textRight"><p>创建者：</p></Col>
          <Col xs={15}><p>{creator.name}</p></Col>
        </Row>
        <Row gutter={[10]}>
          <Col xs={6} className="textRight"><p>手机号码：</p></Col>
          <Col xs={15}><p>{phone || '未知'}</p></Col>
        </Row>
        <Row gutter={[10]}>
          <Col xs={6} className="textRight"><p>微信：</p></Col>
          <Col xs={15}><p>{wx || '未知'}</p></Col>
        </Row>
        <Row gutter={[10]}>
          <Col xs={6} className="textRight"><p>邮箱：</p></Col>
          <Col xs={15}><p>{email || '未知'}</p></Col>
        </Row>
        <Row gutter={[10]}>
          <Col xs={6} className="textRight"><p>客户特点：</p></Col>
          <Col xs={15}><p>{personality || '未知'}</p></Col>
        </Row>
        <Row gutter={[10]}>
          <Col xs={6} className="textRight"><p>备注：</p></Col>
          <Col xs={15}><p>{description || '未知'}</p></Col>
        </Row>
      </Modal>
    );
  }
}

export default connect(({ loading, contactsList }) => ({
  customerProfileModalVisible: contactsList.customerProfileModalVisible,
  customerProfile: contactsList.customerProfile,
}))(CustomerProfileModal);
