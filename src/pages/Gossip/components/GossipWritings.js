import React from 'react';
import { connect } from 'dva';
import { List, Tooltip, Modal, Comment, Avatar, Button, Form, Input, Col, Row, Pagination, message } from 'antd';
import moment from 'moment';
import _ from 'lodash';
import { getFileURL } from '@/utils/transfer';

const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} 条评论`}
    itemLayout="horizontal"
    renderItem={item =>
      <Comment
        avatar={
          item.creator.avatar ? getFileURL(item.creator.avatar) : <Avatar size="large" shape="square" icon="user"/>
        }
        author={item.creator.name} content={item.content}
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
    const resetFields = this.props.form.resetFields;
    const comment = this.props.form.getFieldValue(id);
    if (!comment || !comment.trim()) {
      message.warning('请输入评论');
      return false;
    }
    this.props.dispatch({
      type: 'gossipList/ePublishComment',
      resetFields,
      payload: { gossip_id: id, content: comment, private: isPrivate },
    });
  };
  gossipWritingsPaginationChange = (page, pageSize) => {
    this.props.dispatch({
      type: 'gossipList/eGetGossipWritings',
      payload: { page, page_size: pageSize },
    });
  };

  render() {
    const { form, fetchingGossipWritings, writingsPictureDetailModalVisible, writingsPictureDetailImage, total, current, pageSize, gossipWritingsList } = this.props;
    const { getFieldDecorator } = form;
    return (
      <React.Fragment>
        <div className="gossipWritingsWrapper">
          <List size="small" itemLayout="vertical" dataSource={gossipWritingsList} loading={fetchingGossipWritings}
                renderItem={item => (
                  <List.Item
                    key={item.id}
                    // actions={[
                    //   mine.id === item.creator.id &&
                    //   <Button type="link" icon="delete" className="redButton">删帖</Button>]}
                  >
                    <List.Item.Meta
                      avatar={item.creator.avatar ?
                        <Avatar size="large" shape="square" src={getFileURL(item.creator.avatar)}/> :
                        <Avatar size="large" shape="square" icon="user"/>
                      }
                      title={item.creator.name ? item.creator.name : '匿名用户'}
                      description={
                        <Tooltip title={moment(item['created_at'] * 1000).format('YYYY-MM-DD HH:mm')}>
                          {moment(item['created_at'] * 1000).fromNow()}
                        </Tooltip>
                      }
                    />

                    {item.content}

                    <div className="gossipThumbnailWrapper">
                      {
                        _.map(item.attachments, item => {
                          return (
                            <div key={item.id} className="gossipThumbnail"
                                 style={{ backgroundImage: `url(${getFileURL(item.id)})` }}
                                 onClick={() => this.showImageDetail(item.id)}
                            />
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
        <div className="paginationWrapper">
          <Pagination showQuickJumper defaultCurrent={1} total={total} current={current} pageSize={pageSize}
                      showTotal={() => `共 ${total} 条`} onChange={this.gossipWritingsPaginationChange}/>
        </div>
        <Modal width="65vw" style={{ minWidth: '360px' }} visible={writingsPictureDetailModalVisible}
               footer={null}
               onCancel={this.cancelImageDetail}>
          <img style={{ width: '100%' }} src={writingsPictureDetailImage}/>
        </Modal>
      </React.Fragment>
    );
  }
}

const WrappedForm = Form.create({ name: 'GossipWritings' })(GossipWritings);

export default connect(({ loading, gossipList }) => ({
  fetchingGossipWritings: loading.effects['gossipList/eGetGossipWritings'],
  writingsPictureDetailModalVisible: gossipList.writingsPictureDetailModalVisible,
  writingsPictureDetailImage: gossipList.writingsPictureDetailImage,
  total: gossipList.gossipWritings.total,
  current: gossipList.gossipWritings.current,
  pageSize: gossipList.gossipWritings.pageSize,
  gossipWritingsList: gossipList.gossipWritings.list,
}))(WrappedForm);
