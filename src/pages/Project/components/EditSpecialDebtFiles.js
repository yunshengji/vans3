import React from 'react';
import { connect } from 'dva';
import { Spin, Col, Form, DatePicker, Input, Row, Select, Button, InputNumber, Tag, Table, List, Modal } from 'antd';
import moment from 'moment';
import _ from 'lodash';
import EditSpecialUpload from '@/pages/Project/components/EditSpecialUpload';
import EditSpecialHistory from '@/pages/Project/components/EditSpecialHistory';

import { SPECIAL_DEBT_FILE_TYPE } from '../../../../config/constant';
import { getFileURL } from '@/utils/transfer';
import editSpecialDebt from '@/pages/Project/models/editSpecialDebt';

class EditSpecialDebtFiles extends React.Component {
  componentDidMount() {
  }

  deleteFileConfirm = (fieldName, files, deletedId) => {
    const { dispatch, editSpecialDebt } = this.props;
    const fileList = _.filter(_.map(files, 'id'), id => id !== deletedId);
    const history = _.concat([deletedId], editSpecialDebt[fieldName + '_h'] === undefined ? [] : _.map(editSpecialDebt[fieldName + '_h'], 'id'));
    console.log(history);
    Modal.confirm({
      title: '确定删除此文件',
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        dispatch({
          type: 'editSpecialDebt/eDeleteFile',
          id: editSpecialDebt['id'],
          payload: {
            [fieldName]: fileList,
            [fieldName + '_h']: history,
          },
        });
      },
    });
  };

  showHistory = (historyIndex) => {
    this.props.dispatch({ type: 'editSpecialDebt/rUpdateState', payload: { historyVisible: true, historyIndex } });
  };

  render() {
    const { editSpecialDebt } = this.props;
    return (
      <React.Fragment>
        <EditSpecialUpload/>
        <EditSpecialHistory/>
        <Table size="middle" tableLayout="fixed" showHeader={false} pagination={false}
               dataSource={SPECIAL_DEBT_FILE_TYPE} rowKey={record => record.name}
               rowClassName={(execute, index) => {
                 if (index % 2 === 1) {
                   return 'zebraHighlight';
                 }
               }}>
          <Table.Column title="类型" dataIndex="name" width={300} render={(text) => (<span>{text}</span>)}/>
          <Table.Column title="文件" dataIndex="files"
                        render={(text, record) => {
                          return editSpecialDebt[record['field']].length > 0 &&
                            <List itemLayout="horizontal" split={false} dataSource={editSpecialDebt[record['field']]}
                                  renderItem={(item, index) => (
                                    <List.Item
                                      key={item.id}
                                      actions={[<Button type="link" icon="delete" className="redButton" onClick={() => {
                                        this.deleteFileConfirm(record['field'], editSpecialDebt[record['field']], item.id);
                                      }}>删除</Button>]}
                                    >
                                      <a href={getFileURL(item.id)} target="_blank">{item['file_name_local']}</a>
                                      <span style={{ color: 'silver', marginLeft: '.5em' }}>
                                          {moment(item['created_at'] * 1000).format('YYYY-MM-DD')}
                                        </span>
                                    </List.Item>
                                  )}
                            />;
                        }
                        }/>
          <Table.Column title="历史记录" dataIndex="action" align="right" width={100}
                        render={(text, record) => (
                          <Button type="link" onClick={() => this.showHistory(record['field'] + '_h')}>
                            历史记录
                          </Button>
                        )}/>
        </Table>
      </React.Fragment>
    );
  }
}

const WrappedForm = Form.create({ name: 'EditSpecialDebtFiles' })(EditSpecialDebtFiles);

export default connect(({ loading, common, editSpecialDebt }) => ({
  editSpecialDebt: editSpecialDebt.editSpecialDebt,
}))(WrappedForm);
