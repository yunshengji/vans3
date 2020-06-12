const _ = require('lodash');
const Cookies = require('js-cookie');
const { prefix } = require('../../config/api');

const getFileURL = id => {
  const token = Cookies.get('token');
  return id && `${prefix}/download/${id}?token=${token}`;
};

// 禁止 InputNumber 组件接收小数
const limitDecimals = value => {
  if (typeof value === 'string') {
    return value.replace(/^(0+)|[^\d]+/g, '');
  } else if (typeof value === 'number') {
    return value;
  }
};

// 完整列表展示在 Select 组件时仅获取 id 列表
const getIdsFromWholeList = list => {
  let transferList = [];
  list.forEach(item => {
    transferList.push(item.id);
  });
  return transferList;
};

// 获取参与确认股东中的 id 列表
const getIdsFromManagerList = list => {
  let transferList = [];
  list.forEach(item => {
    transferList.push(item['confirm_user'].id);
  });
  return transferList;
};

const selectYearList = (start = 2000, end = 2030) => {
  const yearsList = [];
  for (let i = start; i <= end; i++) {
    yearsList.push(i);
  }
  return yearsList;
};

module.exports = {
  getFileURL,
  limitDecimals,
  getIdsFromWholeList,
  getIdsFromManagerList,
  selectYearList: selectYearList(),
};
