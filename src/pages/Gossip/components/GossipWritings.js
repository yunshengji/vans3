import React from 'react';
import { connect } from 'dva';
import { List, Tooltip, Modal, Comment, Avatar, Button, Form, Input, Col, Row, message } from 'antd';
import moment from 'moment';
import { getFileURL } from '@/utils/transfer';

const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    // header={`${comments.length} 条评论`}
    itemLayout="horizontal"
    renderItem={item =>
      <Comment avatar={getFileURL(item.creator.avatar)} author={item.creator.name} content={item.content}
               datetime={
                 <Tooltip title={moment(item['created_at'] * 1000).format('YYYY-MM-DD HH:mm')}>
                   <span>{moment(item['created_at'] * 1000).fromNow()}</span>
                 </Tooltip>
               }
      />
    }
  />
);


class GossipWritings extends React.Component {
  componentDidMount() {
    const { dispatch, current, pageSize } = this.props;
    dispatch({
      type: 'gossipList/eGetGossipWritings',
      payload: { page: current, page_size: pageSize },
    });
  }

  showImageDetail = (imageId) => {
    this.props.dispatch({
      type: 'gossipList/rUpdateState',
      payload: { writingsPictureDetailModalVisible: true, writingsPictureDetailImage: getFileURL(imageId) },
    });
  };
  cancelImageDetail = () => {
    this.props.dispatch({
      type: 'gossipList/rUpdateState',
      payload: { writingsPictureDetailModalVisible: false },
    });
  };
  publishComment = (id, isPrivate) => {
    const comment = this.props.form.getFieldValue(id);
    if (!comment || !comment.trim()) {
      message.warning('请输入评论');
      return false;
    }
    this.props.dispatch({
      type: 'gossipList/ePublishComment',
      payload: { gossip_id: id, content: comment },
    });
    this.props.form.resetFields();
  };

  render() {
    const { dispatch, form, mine, writingsPictureDetailModalVisible, writingsPictureDetailImage, total, current, pageSize, gossipWritingsList } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div className="contentWrapper">
        <div className="gossipWritingsWrapper">
          <List size="small" itemLayout="vertical" dataSource={gossipWritingsList}
                renderItem={item => (
                  <List.Item
                    key={item.id}
                    // actions={[
                    //   mine.id === item.creator.id &&
                    //   <Button type="link" icon="delete" className="redButton">删帖</Button>]}
                  >

                    <List.Item.Meta
                      avatar={item.creator ?
                        <Avatar size="large" shape="square" src={getFileURL(item.creator.avatar)}/> :
                        <Avatar size="large" shape="square" icon="user"/>}
                      title={item.creator ? item.creator.name : '匿名用户'}
                      description={
                        <Tooltip title={moment(item['created_at'] * 1000).format('YYYY-MM-DD HH:mm')}>
                          {moment(item['created_at'] * 1000).fromNow()}
                        </Tooltip>
                      }
                    />

                    {item.content}

                    <div className="gossipThumbnailWrapper">
                      {
                        item.attachment_ids.map((item) => {
                          return (
                            <div key={item} className="gossipThumbnail"
                                 style={{ backgroundImage: `url(${getFileURL(item)})` }}
                                 onClick={() => {
                                   this.showImageDetail(item);
                                 }}/>
                          );
                        })
                      }
                    </div>

                    <Comment content={
                      <React.Fragment>
                        {item.comments.length > 0 && <CommentList comments={item.comments}/>}
                        <Row gutter={[10]}>
                          <Col span={16}>
                            {getFieldDecorator(`${item.id}`, {})(
                              <TextArea autoSize={{ minRows: 1, maxRows: 4 }} placeholder="写下你的评论 ... "/>,
                            )}
                          </Col>
                          <Col span={8}>
                            <Button.Group>
                              <Button type="dashed" onClick={() => {
                                this.publishComment(item.id, true);
                              }}>
                                匿名
                              </Button>
                              <Button type="primary" onClick={() => {
                                this.publishComment(item.id, false);
                              }}>
                                实名
                              </Button>
                            </Button.Group>
                          </Col>
                        </Row>
                      </React.Fragment>
                    }
                    />

                  </List.Item>
                )}/>
        </div>
        <Modal width="30vw" visible={writingsPictureDetailModalVisible} footer={null}
               onCancel={this.cancelImageDetail}>
          <img style={{ width: '100%' }} src={writingsPictureDetailImage}/>
        </Modal>
      </div>
    );
  }
}

const WrappedForm = Form.create({ name: 'gossipList' })(GossipWritings);

export default connect(({ loading, common, gossipList }) => ({
  mine: common.mine,
  writingsPictureDetailModalVisible: gossipList.writingsPictureDetailModalVisible,
  writingsPictureDetailImage: gossipList.writingsPictureDetailImage,
  total: gossipList.gossipWritings.total,
  current: gossipList.gossipWritings.current,
  pageSize: gossipList.gossipWritings.pageSize,
  gossipWritingsList: gossipList.gossipWritings.list,
}))(WrappedForm);
