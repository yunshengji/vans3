import React from 'react';
import { connect } from 'dva';
import { List, Modal } from 'antd';
import { SPECIAL_DEBT_FILE_TYPE } from '../../../../config/constant';
import { getFileURL } from '@/utils/transfer';


class EditSpecialHistory extends React.Component {

  hideHistoryModal = () => {
    this.props.dispatch({ type: 'editSpecialDebt/rUpdateState', payload: { historyVisible: false } });
  };

  render() {
    const { historyVisible, historyIndex, editSpecialDebt } = this.props;
    const dataSource = editSpecialDebt[historyIndex] ? editSpecialDebt[historyIndex] : [];
    return (
      <Modal title="上传项目相关文件" visible={historyVisible}
             onOk={this.hideHistoryModal}
             onCancel={this.hideHistoryModal}>
        <List itemLayout="horizontal" dataSource={dataSource}
              renderItem={(item, index) => (
                <List.Item
                  key={item.id}
                  // actions={[
                  //   <Button type="link" icon="delete" className="redButton" onClick={() => {
                  //     this.deleteUploadedFile(item);
                  //   }}>
                  //     删除
                  //   </Button>,
                  // ]}
                >
                  <a href={getFileURL(item.id)} target="_blank">{item['file_name_local']}</a>
                </List.Item>
              )}
        />
      </Modal>
    );
  }
}

export default connect(({ loading, editSpecialDebt }) => ({
  historyVisible: editSpecialDebt.historyVisible,
  historyIndex: editSpecialDebt.historyIndex,
  editSpecialDebt: editSpecialDebt.editSpecialDebt,
}))(EditSpecialHistory);

