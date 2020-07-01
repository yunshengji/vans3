import React from 'react';
import { connect } from 'dva';
import { Modal, Row, Col, Rate, Tag } from 'antd';

class ExpertProfile extends React.Component {

  hideExpertProfile = () => {
    this.props.dispatch({
      type: 'experts/rUpdateState',
      payload: { expertProfileVisible: false },
    });
  };

  render() {
    const { expertProfileVisible, expertProfile } = this.props;
    const { num, name, card, procurement_num, procurement_category, law_num, law_category, level, profession, unit, phone_inner, remarks, alive } = expertProfile;
    return (
      <Modal title="专家信息" width={550} visible={expertProfileVisible} onCancel={this.hideExpertProfile} footer={null}>
        <Row gutter={[10]}>
          <Col xs={8} className="textRight"><p>序号：</p></Col>
          <Col xs={15}><p>{num}</p></Col>
        </Row>
        <Row gutter={[10]}>
          <Col xs={8} className="textRight"><p>姓名：</p></Col>
          <Col xs={15}><p>{name}</p></Col>
        </Row>
        <Row gutter={[10]}>
          <Col xs={8} className="textRight"><p>身份证：</p></Col>
          <Col xs={15}><p>{card}</p></Col>
        </Row>
        <Row gutter={[10]}>
          <Col xs={8} className="textRight"><p>政府采购专家证号：</p></Col>
          <Col xs={15}><p>{procurement_num}</p></Col>
        </Row>
        <Row gutter={[10]}>
          <Col xs={8} className="textRight"><p>政府采购评审专业类别：</p></Col>
          <Col xs={15}><p>{procurement_category}</p></Col>
        </Row>
        <Row gutter={[10]}>
          <Col xs={8} className="textRight"><p>四川省评标专家证号：</p></Col>
          <Col xs={15}><p>{law_num}</p></Col>
        </Row>
        <Row gutter={[10]}>
          <Col xs={8} className="textRight"><p>四川省评标专家评审类别：</p></Col>
          <Col xs={15}><p>{law_category}</p></Col>
        </Row>
        <Row gutter={[10]}>
          <Col xs={8} className="textRight"><p>职称级别：</p></Col>
          <Col xs={15}><p>{level}</p></Col>
        </Row>
        <Row gutter={[10]}>
          <Col xs={8} className="textRight"><p>职称专业：</p></Col>
          <Col xs={15}><p>{profession}</p></Col>
        </Row>
        <Row gutter={[10]}>
          <Col xs={8} className="textRight"><p>工作单位：</p></Col>
          <Col xs={15}><p>{unit}</p></Col>
        </Row>
        <Row gutter={[10]}>
          <Col xs={8} className="textRight"><p>联系电话：</p></Col>
          <Col xs={15}><p style={{ whiteSpace: 'pre' }}>{phone_inner}</p></Col>
        </Row>
        <Row gutter={[10]}>
          <Col xs={8} className="textRight"><p>备注：</p></Col>
          <Col xs={15}><p>{remarks}</p></Col>
        </Row>
        <Row gutter={[10]}>
          <Col xs={8} className="textRight"><p>状态：</p></Col>
          <Col xs={15}><p>{alive ? <Tag color="green">正常</Tag> : <Tag color="orange">不可用</Tag>}</p></Col>
        </Row>
      </Modal>
    );
  }
}

export default connect(({ loading, experts }) => ({
  expertProfileVisible: experts.expertProfileVisible,
  expertProfile: experts.expertProfile,
}))(ExpertProfile);
